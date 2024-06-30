import { DefaultSession } from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
    interface Session {
        accessToken?: string;
        refreshToken?: string;
        user: {
            id: string;
            username: string;
        } & DefaultSession['user'];
    }

    interface User {
        id: string;
        access: string;
        refresh: string;
        username: string;
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        id?: string;
        accessToken?: string;
        refreshToken?: string;
        username?: string;
    }
}
