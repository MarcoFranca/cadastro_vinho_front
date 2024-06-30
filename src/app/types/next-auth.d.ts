
declare module "next-auth" {
    interface Session {
        accessToken?: string;
        refreshToken?: string;
        user: {
            username: string;
        } & DefaultSession["user"];
    }

    interface User {
        access: string;
        refresh: string;
        username: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        accessToken?: string;
        refreshToken?: string;
        username?: string;
    }
}
