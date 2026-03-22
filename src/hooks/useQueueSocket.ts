import { useEffect, useRef, useMemo } from "react";
import { io, Socket } from "socket.io-client";
import { useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/store/auth-store";
import { QueuePatient, QueueState, SessionStatus, BreakStatus } from "@/hooks/api/useGetDoctorQueue";

interface UseQueueSocketProps {
    clinicId?: string;
    doctorId?: string;
    date?: string;
}

export function useQueueSocket({ clinicId, doctorId, date }: UseQueueSocketProps) {
    const queryClient = useQueryClient();
    const token = useAuthStore((state) => state.token);
    const socketRef = useRef<Socket | null>(null);

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
    const serverUrl = useMemo(() => {
        try {
            return new URL(baseUrl).origin;
        } catch (e) {
            console.error("Invalid NEXT_PUBLIC_BASE_URL:", baseUrl);
            return baseUrl;
        }
    }, [baseUrl]);

    // 1. Connection Management - Single connection for the life of the token/serverUrl
    useEffect(() => {
        if (!token || !serverUrl) return;

        const socket = io(serverUrl, {
            auth: { token },
            transports: ["websocket"],
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000,
        });

        socketRef.current = socket;

        socket.on("connect_error", (error) => {
            console.error("Queue Socket connection error:", error.message);
        });

        return () => {
            if (socket) {
                socket.off();
                socket.disconnect();
            }
            socketRef.current = null;
        };
    }, [token, serverUrl]);

    // 2. Room & Listener Management - Updates when parameters change, without reconnecting
    useEffect(() => {
        const socket = socketRef.current;
        if (!socket || !clinicId || !doctorId || !date) return;

        const roomName = `queue-clinic-${clinicId}-doctor-${doctorId}-${date}`;

        const onQueueUpdate = (payload: any) => {
            let newQueue: QueuePatient[] = [];
            if (Array.isArray(payload)) {
                newQueue = payload;
            } else if (payload && typeof payload === "object") {
                if (Array.isArray(payload.queue)) {
                    newQueue = payload.queue;
                } else if (Object.keys(payload).length === 0) {
                    newQueue = [];
                } else {
                    console.error("Received unexpected object format for queue_update:", payload);
                    return;
                }
            } else {
                console.error("Received unexpected payload type for queue_update:", typeof payload);
                return;
            }

            queryClient.setQueryData<QueueState>(
                ["doctor-queue", clinicId, doctorId, date],
                (oldData) => {
                    if (!oldData) return oldData;
                    return { ...oldData, queue: newQueue };
                }
            );
        };

        const onBreakUpdate = (breakStatus: BreakStatus) => {
            queryClient.setQueryData<QueueState>(
                ["doctor-queue", clinicId, doctorId, date],
                (oldData) => {
                    if (!oldData) return oldData;
                    return { ...oldData, breakStatus };
                }
            );
        };

        const onSessionUpdate = (sessionStatus: SessionStatus) => {
            queryClient.setQueryData<QueueState>(
                ["doctor-queue", clinicId, doctorId, date],
                (oldData) => {
                    if (!oldData) return oldData;
                    return { ...oldData, sessionStatus };
                }
            );
        };

        const joinRoom = () => {
            socket.emit("join_queue_room", roomName);
        };

        // Attach listeners for this specific parameter set
        socket.on("queue_update", onQueueUpdate);
        socket.on("doctor_break_update", onBreakUpdate);
        socket.on("doctor_session_update", onSessionUpdate);

        // Join room logic
        if (socket.connected) {
            joinRoom();
        }
        socket.on("connect", joinRoom);

        return () => {
            // Cleanup listeners and leave room
            socket.off("queue_update", onQueueUpdate);
            socket.off("doctor_break_update", onBreakUpdate);
            socket.off("doctor_session_update", onSessionUpdate);
            socket.off("connect", joinRoom);

            if (socket.connected) {
                socket.emit("leave_queue_room", roomName);
            }
        };
    }, [clinicId, doctorId, date, queryClient, token, serverUrl]);


    return socketRef.current;
}
