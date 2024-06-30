// src/app/components/Modal/Modal.tsx
import React, { useEffect } from 'react';
import ReactModal from 'react-modal';
import styles from './Modal.module.css';

interface ModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    children: React.ReactNode;
}

const Modal = ({ isOpen, onRequestClose, children }: ModalProps) => {
    useEffect(() => {
        const appElement = document.getElementById('__next');
        if (appElement) {
            ReactModal.setAppElement('#__next');
        }
    }, []);

    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className={styles.modalContent}
            overlayClassName={styles.modalOverlay}
        >
            {children}
        </ReactModal>
    );
};

export default Modal;
