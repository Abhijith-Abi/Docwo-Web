import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function AppointmentsPagination() {
    return (
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-2 gap-y-4 pb-8">
            <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-1">
                <Button
                    variant="default"
                    className="h-9 w-9 sm:w-10 sm:h-10 text-base font-semibold border-none bg-black text-white p-0"
                >
                    1
                </Button>
                <Button
                    variant="outline"
                    className="h-9 w-9 sm:w-10 sm:h-10 text-base font-semibold rounded-md border-muted p-0 shadow-sm bg-background"
                >
                    2
                </Button>
                <Button
                    variant="outline"
                    className="h-9 w-9 sm:w-10 sm:h-10 text-base font-semibold rounded-md border-muted p-0 shadow-sm bg-background"
                >
                    3
                </Button>
                <Button
                    variant="outline"
                    className="h-9 w-9 sm:w-10 sm:h-10 text-base font-semibold rounded-md border-muted p-0 shadow-sm bg-background"
                >
                    4
                </Button>
                <span className="px-1 text-muted-foreground font-semibold tracking-widest">
                    ...
                </span>
                <Button
                    variant="outline"
                    className="h-9 w-9 sm:w-10 sm:h-10 text-base font-semibold rounded-md border-muted p-0 shadow-sm bg-background hidden sm:inline-flex"
                >
                    10
                </Button>
                <Button
                    variant="outline"
                    className="h-9 w-9 sm:w-10 sm:h-10 text-base font-semibold rounded-md border-muted p-0 shadow-sm bg-background hidden sm:inline-flex"
                >
                    11
                </Button>
                <Button
                    variant="outline"
                    className="h-9 w-9 sm:w-10 sm:h-10 text-base font-semibold rounded-md border-muted p-0 shadow-sm bg-background"
                >
                    12
                </Button>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                <ChevronRight className="h-4 w-4" />
            </Button>

            <div className="flex items-center gap-3 ml-2 sm:ml-4 border-l pl-4 sm:pl-6">
                <span className="text-xs font-semibold text-muted-foreground whitespace-nowrap">
                    Goto Page
                </span>
                <div className="flex items-center">
                    <Button
                        variant="outline"
                        className="h-9 min-w-14 text-base font-semibold rounded-md border-muted p-0 shadow-sm bg-background gap-1 flex justify-between px-3"
                    >
                        5{" "}
                        <ChevronRight className="h-3 w-3 text-muted-foreground" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
