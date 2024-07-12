import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';

const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: 'Username', type: 'text' },
                password: { label: 'Password', type: 'password' }
            },
            authorize: async (credentials) => {
                if (!credentials) return null;

                try {
                    const tokenResponse = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}users/token/`, {
                        username: credentials.username,
                        password: credentials.password,
                    });

                    if (tokenResponse.status === 200) {
                        const { access, refresh } = tokenResponse.data;

                        const profileResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}users/profile`, {
                            headers: {
                                Authorization: `Bearer ${access}`,
                            },
                        });

                        if (profileResponse.status === 200) {
                            const user = profileResponse.data;

                            return {
                                id: user.id,
                                name: user.username,
                                email: user.email,
                                username: user.username,
                                accessToken: access,
                                refreshToken: refresh,
                            };
                        } else {
                            return null;
                        }
                    } else {
                        return null;
                    }
                } catch (error) {
                    console.error('Error authenticating user:', error);
                    return null;
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user } : {token: any, user:any}) {
            if (user) {
                token.id = user.id;
                token.accessToken = user.accessToken;
                token.refreshToken = user.refreshToken;
                token.username = user.username;
            }
            return token;
        },
        async session({ session, token } : {session: any, token: any}) {
            session.user = {
                id: token.id,
                name: token.name || token.username,
                email: token.email || '',
                username: token.username,
                accessToken: token.accessToken,
                refreshToken: token.refreshToken,
            };
            return session;
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/auth/signin',
    },
};

export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);
