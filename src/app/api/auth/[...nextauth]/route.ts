// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                try {
                    const response = await axios.post("http://localhost:8000/api/v1/users/token/", {
                        username: credentials.username,
                        password: credentials.password,
                    });
                    const user = response.data;

                    if (response.status === 200 && user) {
                        return user;
                    }
                } catch (error) {
                    console.error("Login error:", error.response?.data || error.message);
                    throw new Error("Invalid credentials");
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user, account }) {
            if (account && account.provider === "google") {
                token.id = account.id;
            } else if (user) {
                token.access = user.access;
                token.refresh = user.refresh;
            }
            return token;
        },
        async session({ session, token }) {
            session.user = token.user;
            session.access = token.access;
            session.refresh = token.refresh;
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/login',
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
