'use client';

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import styles from './login.module.css';
import Image from "next/image";
import LogoImage from "@/../public/assets/logos/vertical_logo_transparente(letra).png";
import Link from "next/link";

export default function LoginForm(props: any) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const result = await signIn("credentials", {
                redirect: false,
                username,
                password,
            });

            if (result?.error) {
                setError(result.error);
            } else {
                // Redireciona para a página inicial ou protegida após o login bem-sucedido
                window.location.href = "/dashboard";
            }
        } catch (error) {
            setError("Failed to login");
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
                    required={true}
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={styles.input}
                    placeholder={'Senha'}
                    required={true}
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
