import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

export function ManagementPagination() {
    return (
        <div className="flex flex-wrap items-center justify-center gap-4 w-full">
            <Pagination className="w-auto mx-0">
                <PaginationContent className="gap-1.5 flex-wrap">
                    <PaginationItem>
                        <PaginationPrevious
                            href="#"
                            className="h-9 w-9 p-0 px-2 border justify-center bg-white shadow-sm hover:bg-muted"
                        />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink
                            href="#"
                            isActive
                            className="h-9 w-9 bg-black text-white hover:bg-black/90 hover:text-white border-0 shadow-sm"
                        >
                            1
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink
                            href="#"
                            className="h-9 w-9 border bg-white shadow-sm hover:bg-muted"
                        >
                            2
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="hidden sm:inline-flex">
                        <PaginationLink
                            href="#"
                            className="h-9 w-9 border bg-white shadow-sm hover:bg-muted"
                        >
                            3
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="hidden sm:inline-flex">
                        <PaginationLink
                            href="#"
                            className="h-9 w-9 border bg-white shadow-sm hover:bg-muted"
                        >
                            4
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <div className="h-9 w-9 border bg-white shadow-sm flex flex-col items-center justify-center rounded-md text-muted-foreground">
                            <span className="leading-none tracking-widest translate-y-[-2px]">
                                ...
                            </span>
                        </div>
                    </PaginationItem>
                    <PaginationItem className="hidden sm:inline-flex">
                        <PaginationLink
                            href="#"
                            className="h-9 w-9 border bg-white shadow-sm hover:bg-muted"
                        >
                            10
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="hidden sm:inline-flex">
                        <PaginationLink
                            href="#"
                            className="h-9 min-w-9 border bg-white shadow-sm hover:bg-muted"
                        >
                            11
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="hidden sm:inline-flex">
                        <PaginationLink
                            href="#"
                            className="h-9 min-w-9 border bg-white shadow-sm hover:bg-muted"
                        >
                            12
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext
                            href="#"
                            className="h-9 w-9 p-0 px-2 border justify-center bg-white shadow-sm hover:bg-muted"
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>

            <div className="hidden sm:flex items-center gap-2 border-l pl-4 text-sm text-muted-foreground whitespace-nowrap">
                <span>Goto Page</span>
                <div className="relative">
                    <select className="appearance-none border rounded-md h-9 pl-3 pr-8 bg-white shadow-sm text-sm font-medium focus:outline-none focus:ring-1 focus:ring-ring select-none cursor-pointer">
                        <option>5</option>
                    </select>
                    <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
                        <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
}
