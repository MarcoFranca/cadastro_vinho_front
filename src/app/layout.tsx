// src/app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';
import React from "react";
import ClientLayout from "@/app/client-layout";
import ClientProvider from "@/app/components/ClientProvider";


export const metadata: Metadata = {
    title: 'Vino-Manager',
    description: 'Software desenvolvido para facilitar na gestão da compra e venda de vinhos',
    icons: {
        icon: '/icon.png', // Ajuste o caminho conforme necessário
    },
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="pt-br">
        <body >
        <ClientProvider>
            <ClientLayout>

                {children}
            </ClientLayout>
        </ClientProvider>
        </body>
        </html>
    );
}
