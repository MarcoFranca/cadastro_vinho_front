import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axiosInstance from '@/app/api/axios';
import store from "@/store/store";

const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: 'Username', type: 'text' },
                password: { label: 'Password', type: 'password' }
            },
            authorize: async (credentials, req) => {
                if (!credentials) return null;

                try {
                    // Autenticação inicial para obter os tokens
                    const tokenResponse = await axiosInstance.post(`users/token/`, {
                        username: credentials.username,
                        password: credentials.password,
                    });

                    if (tokenResponse.status === 200) {
                        const { access, refresh } = tokenResponse.data;

                        // Atualiza o estado do Redux com o token de acesso
                        // Para que o interceptor do axiosInstance inclua o token
                        store.dispatch({
                            type: 'auth/setToken',
                            payload: { access, refresh },
                        });

                        // Fazer uma chamada adicional ao endpoint users/profile para obter os detalhes do usuário
                        const profileResponse = await axiosInstance.get(`users/profile`, {
                            headers: {
                                Authorization: `Bearer ${access}`,
                            },
                        });

                        if (profileResponse.status === 200) {
                            const user = profileResponse.data;

                            return {
                                id: user.id,
                                name: user.username, // Ajuste conforme necessário
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
