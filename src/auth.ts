import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/db/prisma';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compareSync } from 'bcrypt-ts-edge';
import type { NextAuthConfig, Session, User } from 'next-auth';
import type { JWT } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export const config = {
  pages: {
    signIn: '/signin',
    error: '/signin',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email,
          },
        });
        if (
          user &&
          user.password &&
          compareSync(credentials.password as string, user.password)
        ) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async session({
      session,
      token,
      user,
    }: {
      session: Session;
      token: JWT;
      user: User;
    }) {
      if (token.sub) {
        if (session.user) {
          session.user.id = token.sub;
          session.user.role = token.role;
          session.user.name = token.name;
        }
      }
      if (user?.name) {
        if (session.user) {
          session.user.name = user.name;
        }
      }
      return session;
    },
    async jwt({ token, user }: { token: JWT; user: User }) {
      if (user) {
        token.role = user.role;

        if (user.name === 'NO_NAME') {
          token.name = user.email!.split('@')[0];

          // update the database
          await prisma.user.update({
            where: { id: user.id },
            data: { name: token.name },
          });
        }
      }
      return token;
    },
    authorized({
      request,
      auth,
    }: {
      request: NextRequest;
      auth: Session | null;
    }) {
      // Array of regex patterns to check the request path against
      const protectedPaths = [
        /\/profile/,
        /\/user\/(.*)/,
        /\/admin\/(.*)/,
        /\/agent\/(.*)/,
      ];

      // Get the pathname from the request URL obj
      const { pathname } = request.nextUrl;

      // Check if user is authenticated and accessing a protected path
      if (!auth?.user && protectedPaths.some(path => path.test(pathname)))
        return false;

      // Check for session favorites cookie
      if (!request.cookies.get('sessionFavoritesId')) {
        // generate a new session favorites id
        const sessionFavoritesId = crypto.randomUUID();

        // Clone the response headers
        const newResponseHeaders = new Headers(request.headers);

        // Create new response headers with the session favorites id
        const response = NextResponse.next({
          request: {
            headers: newResponseHeaders,
          },
        });

        // Set the session favorites id cookie
        response.cookies.set('sessionFavoritesId', sessionFavoritesId);

        return response;
      } else {
        return true;
      }
    },
  },
} satisfies NextAuthConfig;
export const { handlers, auth, signIn, signOut } = NextAuth(config);
