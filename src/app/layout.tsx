// src/app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';
import React from "react";


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
                {children}
            </body>
        </html>
    );
}
