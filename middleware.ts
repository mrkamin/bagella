import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const isAdmin = request.cookies.get('admin-auth')?.value === 'true';
    if (request.nextUrl.pathname.startsWith('/admin/dashboard')&& !isAdmin) {
        return NextResponse.redirect(new URL('/admin/login', request.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/dashboard/:path*'],
};