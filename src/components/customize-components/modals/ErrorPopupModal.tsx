"use client";

import { AlertCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorPopupModalProps {
    data: {
        title: string;
        errors: string[];
    };
    onClose: () => void;
}

export default function ErrorPopupModal({
    data,
    onClose,
}: ErrorPopupModalProps) {
    return (
        <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm mx-4 border border-red-100">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2 text-red-600">
                    <AlertCircle className="h-5 w-5 shrink-0" />
                    <h3 className="font-semibold text-base">{data.title}</h3>
                </div>
                <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 p-0 text-muted-foreground hover:text-foreground -mt-1 -mr-1"
                    onClick={onClose}
                >
                    <X className="h-4 w-4" />
                </Button>
            </div>
            <ul className="space-y-1.5">
                {data.errors.map((err, i) => (
                    <li
                        key={i}
                        className="text-sm text-red-700 bg-red-50 rounded-lg px-3 py-2"
                    >
                        {err}
                    </li>
                ))}
            </ul>
            <Button
                className="w-full mt-5 bg-red-600 hover:bg-red-700 text-white rounded-xl"
                onClick={onClose}
            >
                Dismiss
            </Button>
        </div>
    );
}
