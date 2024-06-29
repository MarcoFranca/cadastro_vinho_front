// src/app/page.tsx
'use client'
import ClientLayout from '@/app/client-layout';
import AuthButton from '@/app/components/AuthButton';

export default function Page() {
    return (
        <ClientLayout>
            <h1>Welcome to My Application</h1>
            <AuthButton />
            {/* Outros componentes */}
        </ClientLayout>
    );
}
