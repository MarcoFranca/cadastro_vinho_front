import React, {useState} from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import styles from './register.module.css'
import Link from "next/link";
import LogoImage from "@/../public/assets/logos/vertical_logo_transparente(letra).png";
import Image from "next/image";


export default function RegisterForm(props: any) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            await axios.post('users/users/', {
                username,
                email,
                password,
            });
            router.push('/login');
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    return (
        <div className={styles.container_form}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <Image src={LogoImage} alt={'logo'} className={styles.image}/>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className={styles.input}
                        placeholder={'Nome de Usuário'}
                        required={true}
                    />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={styles.input}
                        placeholder={'E-mail'}
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
                <button type="submit" className={styles.button}>Register</button>
            </form>
            <div className={styles.conecte}>
                <p>tem uma conta?<Link href={'/login'}> Conecte-se</Link></p>
            </div>
        </div>
    );
}