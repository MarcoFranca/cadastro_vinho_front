// src/app/dashboard/page.tsx
'use client';

import { useSession, signIn } from 'next-auth/react';
import { useEffect } from 'react';
import ClientLayout from '@/app/client-layout';

export default function DashboardPage() {
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === 'unauthenticated') {
            signIn();
        }
    }, [status]);

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (status === 'unauthenticated') {
        return null; // Redirecionando, então não renderize nada.
    }

    return (
        <ClientLayout>
            <h1>Welcome to the Dashboard</h1>
            {/* Outros componentes */}
        </ClientLayout>
    );
}
