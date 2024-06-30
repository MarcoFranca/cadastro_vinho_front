// src/app/client-layout.tsx
'use client';

import { SessionProvider } from "next-auth/react";
import { ReactNode } from 'react';

interface ClientLayoutProps {
    children: ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    );
}
