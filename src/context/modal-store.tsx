"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface ModalContextType {
    openModal: (content: ReactNode) => void;
    closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
    const [modalContent, setModalContent] = useState<ReactNode | null>(null);

    const openModal = (content: ReactNode) => setModalContent(content);
    const closeModal = () => setModalContent(null);

    return (
        <ModalContext.Provider value={{ openModal, closeModal }}>
            {children}
            {modalContent && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={closeModal}
                    />
                    <div className="relative z-10">{modalContent}</div>
                </div>
            )}
        </ModalContext.Provider>
    );
}

export function useModal(): ModalContextType {
    const ctx = useContext(ModalContext);
    if (!ctx) throw new Error("useModal must be used within a ModalProvider");
    return ctx;
}
