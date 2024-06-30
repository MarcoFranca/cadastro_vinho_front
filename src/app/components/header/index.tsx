'use client';

import styles from './styles.module.css'
import Image from "next/image";
import LogoImg from "../../../../public/assets/logos/horizontal_logo_transparente(letra).png";
import Link from "next/link";

export function Header() {
    return (

        <header className={styles.header}>
            <nav className={styles.navbar}>
                    <Link href="/" className={styles.link}>
                        <Image className={styles.logo}
                               alt="logotipo"
                               src={LogoImg}
                               priority
                        />
                    </Link>
                <ul className={styles.menu}>
                    <Link href="/login" className={`${styles.button} `}>
                        <li>Log in</li>
                    </Link>
                    <Link href="/register" className={`${styles.button} ${styles.whiteButton}`}>
                        <li>Cadastrar</li>
                    </Link>
                </ul>
            </nav>
        </header>
    );
}
