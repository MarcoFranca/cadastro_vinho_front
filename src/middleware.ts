// src/middleware.ts
import { NextResponse } from 'next/server';
import { verifyJwtToken } from './lib/auth';

const protectedRoutes = ['/app/*', '/account/*', '/api/*', '/admin/*'];

function matchesWildcard(path: string, pattern: string): boolean {
    if (pattern.endsWith('/*')) {
        const basePattern = pattern.slice(0, -2);
        return path.startsWith(basePattern);
    }
    return path === pattern;
}

export async function middleware(request) {
    const LOGIN_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/login?redirect=${request.nextUrl.pathname + request.nextUrl.search}`;

    if (protectedRoutes.some(pattern => matchesWildcard(request.nextUrl.pathname, pattern))) {
        const token = request.cookies.get('token');

        if (!token) {
            return NextResponse.redirect(LOGIN_URL);
        }

        try {
            const payload = verifyJwtToken(token.value);
            if (!payload) {
                request.cookies.delete('token');
                return NextResponse.redirect(LOGIN_URL);
            }
        } catch (error) {
            request.cookies.delete('token');
            return NextResponse.redirect(LOGIN_URL);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
