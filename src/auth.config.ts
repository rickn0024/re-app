import type { NextAuthConfig, Session } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export const authConfig = {
  providers: [], // Required by NextAuthConfig type
  callbacks: {
    authorized({
      request,
      auth,
    }: {
      request: NextRequest;
      auth: Session | null;
    }) {
      // Array of regex patterns to match paths we want to protect
      const protectedPaths = [
        /\/profile/,
        /\/user\/(.*)/,
        /\/admin\/(.*)/,
        /\/agent\/(.*)/,
      ];
      // Check if the current path is protected from request URL pathname
      const { pathname } = request.nextUrl;
      // Check if the user is authenticated and access is allowed
      if (!auth && protectedPaths.some(path => path.test(pathname)))
        return false;
      // Check for session cart cookie
      if (!request.cookies.get('sessionFavoritesId')) {
        // Generate a new session cart id cookie
        const sessionFavoritesId = crypto.randomUUID();
        // Clone request headers
        const newRequestHeaders = new Headers(request.headers);
        // Create new request and add to new headers
        const response = NextResponse.next({
          request: {
            headers: newRequestHeaders,
          },
        });
        // Set newly generated sessionFavoritesId in the response cookie
        response.cookies.set('sessionFavoritesId', sessionFavoritesId);
        return response;
      } else {
        return true;
      }
    },
  },
} satisfies NextAuthConfig;
