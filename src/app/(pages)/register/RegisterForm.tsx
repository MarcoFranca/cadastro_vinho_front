import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import styles from './register.module.css';
import Link from "next/link";
import LogoImage from "@/../public/assets/logos/vertical_logo_transparente(letra).png";
import Image from "next/image";

export default function RegisterForm(props: any) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setError('');  // Limpa o erro antes de tentar registrar
        try {
            const response = await axios.post(`http://localhost:8000/api/v1/users/users/`, {
                username,
                email,
                password,
            });
            if (response.status === 201) {
                router.push('/login');
            }
        } catch (error) {
            setError('Registration failed. Please try again.');
            console.error('Registration failed:', error);
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
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={styles.input}
                    placeholder={'E-mail'}
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
                <button type="submit" className={styles.button}>Register</button>
            </form>
            {error && <p className={styles.error}>{error}</p>}
            <div className={styles.conecte}>
                <p>Tem uma conta?<Link href={'/login'}> Conecte-se</Link></p>
            </div>
        </div>
    );
}
