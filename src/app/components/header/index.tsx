'use client';

import styles from './styles.module.css'
import Image from "next/image";
import LogoImg from "../../../../public/assets/logos/horizontal_logo_transparente(letra).png";
import LoginImg from "../../../../public/assets/icones/usuarioLogin.svg";
import CreateImg from "../../../../public/assets/icones/usuarioNovo.svg";
import Link from "next/link";
export function Header() {
    return (

                 <header>
                <section>
                    <nav className={styles.navbar}>
                        <Link href="/" className={styles.link}>
                            <Image className={styles.logo}
                                   alt="logotipo"
                                   src={LogoImg}
                                   priority
                            />
                        </Link>
                        <ul className={styles.menu}>
                            <div className={styles.lista}>
                                <Link href="/login">
                                    <Image className={styles.iconeMenu}
                                           alt="usuario com garrafa de vinho"
                                           src={LoginImg}
                                           priority
                                    />
                                    <li>Acessar</li>
                                </Link>
                            </div>
                            <div className={styles.lista}>
                                <Link href="/register">
                                    <Image className={styles.iconeMenu}
                                           alt="usuario com garrafa de vinho"
                                           src={CreateImg}
                                           priority
                                    />
                                    <li>Cadastrar</li>
                                </Link>
                            </div>
                        </ul>
                    </nav>
                </section>
            </header>
    );
}
