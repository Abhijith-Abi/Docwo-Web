"use client";

export default function AdminPortalPage() {
    return (
        <div className="flex flex-col h-full gap-6">
            <h1 className="text-[28px] font-semibold text-slate-800 tracking-tight">
                Dashboard
            </h1>
            <div className="flex-1 w-full bg-slate-50 border border-slate-100 rounded-2xl border-dashed flex items-center justify-center">
                <p className="text-slate-400 font-medium tracking-wide">
                    Dashboard Content
                </p>
            </div>
        </div>
    );
}
