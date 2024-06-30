// src/app/login/page.tsx
'use client';

import { signIn } from "next-auth/react";
import React, { useState } from "react";

export default function LoginPage() {
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
                window.location.href = "/";
            }
        } catch (error) {
            setError("Failed to login");
        }
    };

    const handleGoogleSignIn = () => {
        signIn("google");
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>
                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <button type="submit">Login with Credentials</button>
            </form>
            {error && <p>{error}</p>}
            <button onClick={handleGoogleSignIn}>Login with Google</button>
        </div>
    );
}
