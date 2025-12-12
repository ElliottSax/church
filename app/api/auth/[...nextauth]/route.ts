import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

// Minimal auth options for static export build
// This file is only used during build time - auth won't work in static deployment
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        return null;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET || 'static-build-secret',
};

// Note: This handler won't work in static export
export const GET = () => new Response('Auth not available in static deployment', { status: 503 });
export const POST = () => new Response('Auth not available in static deployment', { status: 503 });
