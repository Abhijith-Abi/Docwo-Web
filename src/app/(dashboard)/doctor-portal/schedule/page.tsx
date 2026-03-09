import { Suspense } from "react";
import { ScheduleClient } from "./_components/schedule-client";

export default function SchedulePage() {
    return (
        <Suspense>
            <ScheduleClient />
        </Suspense>
    );
}
