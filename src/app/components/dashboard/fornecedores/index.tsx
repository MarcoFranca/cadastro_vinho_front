// src/app/components/fornecedores/Fornecedores.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFornecedores, createFornecedor } from '@/store/slices/fornecedorSlice';
import { RootState, AppDispatch } from '@/store/store';
import Modal from '@/app/components/Modal/Modal';
import styles from './Fornecedores.module.css';
import Image from 'next/image';
import PlusImage from '../../../../../public/assets/icones/add-button_1224.svg'
import Link from 'next/link';

const Fornecedores = () => {
    const dispatch = useDispatch<AppDispatch>();
    const fornecedores = useSelector((state: RootState) => state.fornecedores.fornecedores);
    const fornecedorStatus = useSelector((state: RootState) => state.fornecedores.status);
    const [novoFornecedor, setNovoFornecedor] = useState({
        nome: '',
        contato: '',
        telefone: '',
        email: '',
        endereco: '',
    });
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (fornecedorStatus === 'idle') {
            dispatch(fetchFornecedores());
        }
    }, [fornecedorStatus, dispatch]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNovoFornecedor({ ...novoFornecedor, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(createFornecedor(novoFornecedor));
        setNovoFornecedor({
            nome: '',
            contato: '',
            telefone: '',
            email: '',
            endereco: '',
        });
        setIsModalOpen(false); // Fechar modal após a submissão
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                {/*<h2>Fornecedores</h2>*/}
                <button className={styles.addButton} onClick={openModal}> <Image src={PlusImage} alt={'+'}/> Cadastrar Fornecedor</button>
                <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
                    <h2>Cadastrar Novo Fornecedor</h2>
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <input
                            type="text"
                            name="nome"
                            placeholder="Nome"
                            value={novoFornecedor.nome}
                            onChange={handleInputChange}
                            className={styles.input}
                            required
                        />
                        <input
                            type="text"
                            name="contato"
                            placeholder="Contato"
                            value={novoFornecedor.contato}
                            onChange={handleInputChange}
                            className={styles.input}
                            required
                        />
                        <input
                            type="text"
                            name="telefone"
                            placeholder="Telefone"
                            value={novoFornecedor.telefone}
                            onChange={handleInputChange}
                            className={styles.input}
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={novoFornecedor.email}
                            onChange={handleInputChange}
                            className={styles.input}
                            required
                        />
                        <input
                            type="text"
                            name="endereco"
                            placeholder="Endereço"
                            value={novoFornecedor.endereco}
                            onChange={handleInputChange}
                            className={styles.input}
                            required
                        />
                        <button type="submit" className={styles.button}>Adicionar Fornecedor</button>
                    </form>
                </Modal>
                <ul className={styles.fornecedorList}>
                    {fornecedores.map((fornecedor) => (
                        <li key={fornecedor.id}>
                            <div>
                                <div className={styles.empresa}>
                                    <h3>Empresa:</h3>
                                    <p>{fornecedor.nome}</p>
                                </div>
                                <div className={styles.empresa}>
                                    <h3>Contato:</h3>
                                    <p>{fornecedor.contato}</p>
                                </div>
                            </div>
                            <div>
                            <div className={styles.empresa}>
                                <h3>Telefone:</h3>
                                <Link href={`https://wa.me/${fornecedor.telefone}`} ><p>{fornecedor.telefone}</p></Link>
                            </div>
                            <div className={styles.empresa}>
                                <h3>E-mail</h3>
                                <Link href={`mailto:${fornecedor.email}`}><p>{fornecedor.email}</p></Link>
                            </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Fornecedores;
