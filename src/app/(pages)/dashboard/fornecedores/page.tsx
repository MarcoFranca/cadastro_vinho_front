'use client';

import { useSession, signIn } from 'next-auth/react';
import { useEffect } from 'react';
import ClientLayout from '@/app/client-layout';
import DashboardLayout from "@/app/components/dashboard/DashboardLayout";
import CadastrarVinhos from "@/app/components/dashboard/cadastrar-vinhos";
import styles from './dashboard.module.css';
import Fornecedores from "@/app/components/dashboard/fornecedores";

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
        return null;
    }

    return (
        <ClientLayout>
            <DashboardLayout>
                <Fornecedores/>
            </DashboardLayout>
        </ClientLayout>
    );
}
