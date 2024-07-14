'use client';

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signIn, useSession } from 'next-auth/react';
import styles from './login.module.css';
import Image from 'next/image';
import LogoImage from '@/../public/assets/logos/vertical_logo_transparente(letra).png';
import Link from 'next/link';
import { login } from '@/store/slices/authSlice';

export default function LoginForm(props: any) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const { data: session, status } = useSession();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const result = await signIn('credentials', {
                redirect: false,
                username,
                password,
            });

            if (result?.error) {
                setError(result.error);
            } else {
                if (status === 'authenticated') {
                    const { user } = session;
                    if (user && user.accessToken && user.refreshToken) {
                        dispatch(login({
                            user: { id: user.id ?? '', username: user.username ?? '', email: user.email ?? '' },
                            token: { access: user.accessToken ?? '', refresh: user.refreshToken ?? '' },
                        }));
                        window.location.href = '/dashboard';
                    } else {
                        setError('Failed to retrieve user session');
                    }
                }
            }
        } catch (error) {
            setError('Failed to login');
        }
    };

    return (
        <div className={styles.container_form}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <Image src={LogoImage} alt={'logo'} className={styles.image} />
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className={styles.input}
                    placeholder={'Nome de Usuário'}
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={styles.input}
                    placeholder={'Senha'}
                    required
                />
                <button type="submit" className={styles.button}>Entrar</button>
                <Link href={'/reset-password'} className={styles.sword}>Esqueceu a senha?</Link>
                {error && <p className={styles.message}>{error}</p>}
            </form>
            <div className={styles.cadastre}>
                <p>Não tem conta?<Link href={'/register'}> Cadastre-se</Link></p>
            </div>
            {error && <p>{error}</p>}
        </div>
    );
}
