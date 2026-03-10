import { Suspense } from "react";
import { SlotsClient } from "./_components/slots-client";

interface PageProps {
    params: Promise<{
        scheduleId: string;
    }>;
}

export default async function SlotsPage({ params }: PageProps) {
    const resolvedParams = await params;

    return (
        <Suspense>
            <SlotsClient scheduleId={resolvedParams.scheduleId} />
        </Suspense>
    );
}
