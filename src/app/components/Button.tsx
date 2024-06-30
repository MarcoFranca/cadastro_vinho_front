'use client';

import styles from './Button.module.css';
import { FC, ReactNode } from 'react';

interface ButtonProps {
    children: ReactNode;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
}

const Button: FC<ButtonProps> = ({ children, type = 'button', onClick }) => {
    return (
        <button className={styles.button} type={type} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;
