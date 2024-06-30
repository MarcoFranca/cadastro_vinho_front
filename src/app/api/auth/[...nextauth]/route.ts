import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { JWT } from 'next-auth/jwt';
import { Session } from 'next-auth';

interface CustomToken extends JWT {
    id?: string;
    accessToken?: string;
    refreshToken?: string;
    username?: string;
}

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                const user = {
                    id: '1',
                    name: 'User',
                    email: 'user@example.com',
                    access: 'token_access',
                    refresh: 'token_refresh',
                    username: 'admin'
                }; // ID como string
                if (credentials?.username === 'admin' && credentials?.password === 'admin') {
                    return user;
                } else {
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }: { token: CustomToken; user?: any }) {
            if (user) {
                token.id = user.id;
                token.accessToken = user.access;
                token.refreshToken = user.refresh;
                token.username = user.username;
            }
            return token;
        },
        async session({ session, token }: { session: Session; token: CustomToken }) {
            session.user = session.user || {};
            if (token.id) {
                session.user.id = token.id ?? '';
                session.accessToken = token.accessToken ?? '';
                session.refreshToken = token.refreshToken ?? '';
                session.user.username = token.username ?? '';
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
});
