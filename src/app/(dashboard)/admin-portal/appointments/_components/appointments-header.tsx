export function AppointmentsHeader() {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">
                    Appointments
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                    Manage and track all appointments
                </p>
            </div>
            {/* If there are any header actions like in patients, add them here */}
        </div>
    );
}
