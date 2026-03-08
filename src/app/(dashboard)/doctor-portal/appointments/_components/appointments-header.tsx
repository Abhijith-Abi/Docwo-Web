export function AppointmentsHeader() {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">
                    Appointments
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                    Track and review appointments
                </p>
            </div>
        </div>
    );
}
