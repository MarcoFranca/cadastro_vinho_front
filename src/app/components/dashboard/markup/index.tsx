'use client';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

export default function Markup() {
    const user = useSelector((state: RootState) => state.auth.user);

    if (!user) {
        return <div>Carregando...</div>;
    }

    return (
        <div>
            <h1>Bem-vindo, {user.username}!</h1>
            <p>Email: {user.email}</p>
            <p>Essa é a pagina de markup</p>
        </div>
    );
}
