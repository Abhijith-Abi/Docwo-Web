import { Suspense } from "react";
import { MonthsClient } from "./_components/months-client";

export default function SlotsMonthsPage() {
    return (
        <Suspense>
            <MonthsClient scheduleId="Today" />
        </Suspense>
    );
}
