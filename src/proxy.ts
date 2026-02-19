import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicRoutes: string[] = ["/"];

export default function middleware(request: NextRequest) {
    const accessToken = request.cookies.get("access_token");

    const isAuthenticated = !!accessToken;

    const { pathname, origin } = request.nextUrl;

    if (isAuthenticated) {
        if (pathname === "/") {
            return NextResponse.redirect(`${origin}/dashboard`);
        } else if (request.nextUrl.pathname.startsWith("/auth")) {
            return NextResponse.redirect(`${origin}/dashboard`);
        } else if (publicRoutes.includes(pathname)) {
            return NextResponse.next();
        }
        return NextResponse.next();
    }

    if (!isAuthenticated) {
        if (request.nextUrl.pathname.startsWith("/auth")) {
            return NextResponse.next();
        } else if (publicRoutes.includes(pathname)) {
            return NextResponse.next();
        }

        return NextResponse.redirect(`${origin}/auth/login?next=${pathname}`);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|assets|.*\\.(?:png|jpg|jpeg|gif|svg|ico|webp|mp4|mp3|pdf|woff|woff2|ttf|otf)).*) "],
};
