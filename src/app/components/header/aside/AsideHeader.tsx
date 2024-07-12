'use client';

import styles from './asideHeader.module.css';
import Image from 'next/image';
import LogoImage from '@/../public/assets/logos/horizontal_logo_transparente(letra).png';
import HomeImage from '@/../public/assets/icones/home_10023286.svg';
import FornecedorImage from '@/../public/assets/icones/worker-pushing-a-cart_48592.svg';
import WineImage from '@/../public/assets/icones/wine-bottle-glass-sign_75114.svg';
import MarkupImage from '@/../public/assets/icones/money_11438266.svg';
import React from 'react';
import Link from "next/link";

const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: HomeImage },
    { id: 'fornecedores', label: 'Fornecedores', icon: FornecedorImage },
    { id: 'vinhos', label: 'Vinhos', icon: WineImage },
    { id: 'markup', label: 'Regra de Markup', icon: MarkupImage },
];

const AsideHeader: React.FC = () => {
    return (
        <aside className={styles.aside}>
            <nav>
                <Image src={LogoImage} alt={'logo'} className={styles.logo} priority />
                <ul className={styles.menu}>
                    {menuItems.map(menuItem => (
                        <li key={menuItem.id}>
                            <Link href={`/${menuItem.id}`}>
                                <Image src={menuItem.icon} alt={menuItem.label} className={styles.icon}/>
                                {menuItem.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
};

export default AsideHeader;