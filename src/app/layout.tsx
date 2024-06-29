// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/app/components/header';
import {SessionProvider} from "next-auth/react";
import React from "react";


const inter = Inter({ subsets: ['latin'] });

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
                <Header />
                {children}
            </body>
        </html>
    );
}
