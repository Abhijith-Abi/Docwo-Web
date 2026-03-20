import { useEffect, useRef } from "react";
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

    useEffect(() => {
        if (!clinicId || !doctorId || !date || !token) return;

        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
        let serverUrl = baseUrl;
        try {
            const url = new URL(baseUrl);
            serverUrl = url.origin;
        } catch (e) {
            console.error("Invalid NEXT_PUBLIC_BASE_URL:", baseUrl);
        }

        console.log("Connecting to Queue Socket at:", serverUrl);

        const socket = io(serverUrl, {
            auth: { token },
            transports: ["websocket"],
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000,
        });

        socketRef.current = socket;

        const roomName = `queue-clinic-${clinicId}-doctor-${doctorId}-${date}`;

        socket.on("connect", () => {
            console.log("✅ Queue Socket Connected:", socket.id);
            console.log("📢 Joining room:", roomName);
            socket.emit("join_queue_room", roomName);
        });

        socket.on("connect_error", (error) => {
            console.error("Queue Socket connection error:", error.message);
        });

        socket.on("room_joined_successfully", ({ room }) => {
            console.log("Joined room:", room);
        });

        socket.on("queue_update", (payload: any) => {
            console.log("Received queue_update payload:", payload);
            
            let newQueue: QueuePatient[] = [];
            if (Array.isArray(payload)) {
                newQueue = payload;
            } else if (payload && typeof payload === "object") {
                // If it's an object, check if the queue is inside a 'queue' property
                if (Array.isArray(payload.queue)) {
                    newQueue = payload.queue;
                } else if (Object.keys(payload).length === 0) {
                    // It's an empty object, treat as empty queue
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
                    return {
                        ...oldData,
                        queue: newQueue,
                    };
                }
            );
        });

        socket.on("doctor_break_update", (breakStatus: BreakStatus) => {
            console.log("Received doctor_break_update:", breakStatus);
            queryClient.setQueryData<QueueState>(
                ["doctor-queue", clinicId, doctorId, date],
                (oldData) => {
                    if (!oldData) return oldData;
                    return {
                        ...oldData,
                        breakStatus,
                    };
                }
            );
        });

        socket.on("doctor_session_update", (sessionStatus: SessionStatus) => {
            console.log("Received doctor_session_update:", sessionStatus);
            queryClient.setQueryData<QueueState>(
                ["doctor-queue", clinicId, doctorId, date],
                (oldData) => {
                    if (!oldData) return oldData;
                    return {
                        ...oldData,
                        sessionStatus,
                    };
                }
            );
        });

        socket.on("disconnect", (reason) => {
            console.log("Disconnected from Queue Socket:", reason);
        });

        return () => {
            if (socket.connected) {
                socket.emit("leave_queue_room", roomName);
            }
            socket.disconnect();
            socketRef.current = null;
        };
    }, [clinicId, doctorId, date, token, queryClient]);

    return socketRef.current;
}
