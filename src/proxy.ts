import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicRoutes: string[] = ["/"];

export default function middleware(request: NextRequest) {
    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|assets|.*\\.(?:png|jpg|jpeg|gif|svg|ico|webp|mp4|mp3|pdf|woff|woff2|ttf|otf)).*) "],
};
