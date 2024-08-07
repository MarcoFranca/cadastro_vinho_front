import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
    interface Session {
        user: {
            id: string;
            name: string;
            email: string;
            username: string;
            accessToken: string;
            refreshToken: string;
        } & DefaultSession['user'];
    }

    interface User {
        id: string;
        name: string;
        email: string;
        username: string;
        accessToken: string;
        refreshToken: string;
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        id: string;
        username: string;
        accessToken: string;
        refreshToken: string;
    }
}
