'use client';

import styles from './asideHeader.module.css';
import Image from 'next/image';
import LogoImage from '@/../public/assets/logos/horizontal_logo_transparente(letra).png';
import HomeImage from '@/../public/assets/icones/home_10023286.svg';
import FornecedorImage from '@/../public/assets/icones/worker-pushing-a-cart_48592.svg';
import WineImage from '@/../public/assets/icones/wine-bottle-glass-sign_75114.svg';
import MarkupImage from '@/../public/assets/icones/money_11438266.svg';
import React from 'react';
import {AsideHeaderProps} from '@/app/types/apiResponses';

const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: HomeImage },
    { id: 'fornecedores', label: 'Fornecedores', icon: FornecedorImage },
    { id: 'vinhos', label: 'Vinhos', icon: WineImage },
    { id: 'markup', label: 'Regra de Markup', icon: MarkupImage },
];

const AsideHeader: React.FC<AsideHeaderProps> = ({ onMenuClick, currentSection }) => {
    return (
        <aside className={styles.aside}>
            <nav>
                <Image src={LogoImage} alt={'logo'} className={styles.logo} priority />
                <ul className={styles.menu}>
                    {menuItems.map((item) => (
                        <li
                            key={item.id}
                            className={currentSection === item.id ? styles.selected : ''}
                            onClick={() => onMenuClick(item.id)}
                        >
                            <Image src={item.icon} alt={item.label} className={styles.icon} priority />
                            {item.label}
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
};

export default AsideHeader;
