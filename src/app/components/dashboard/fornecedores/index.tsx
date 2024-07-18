'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFornecedores, createFornecedor, updateFornecedor, deleteFornecedor } from '@/store/slices/fornecedorSlice';
import { RootState, AppDispatch } from '@/store/store';
import Modal from '@/app/components/Modal/Modal';
import styles from './Fornecedores.module.css';
import Image from 'next/image';
import PlusImage from '../../../../../public/assets/icones/add-button_1224.svg';
import EditImage from '../../../../../public/assets/icones/edit.svg';
import DeleteImage from '../../../../../public/assets/icones/delete.svg';
import Link from 'next/link';
import { Fornecedor } from '@/app/types/apiResponses'; // Certifique-se de importar a interface correta

const Fornecedores = () => {
    const dispatch = useDispatch<AppDispatch>();
    const fornecedores = useSelector((state: RootState) => state.fornecedores.fornecedores);
    const fornecedorStatus = useSelector((state: RootState) => state.fornecedores.status);
    const [novoFornecedor, setNovoFornecedor] = useState<Omit<Fornecedor, 'id'>>({
        nome: '',
        contato: '',
        telefone: '',
        email: '',
        endereco: '',
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentFornecedorId, setCurrentFornecedorId] = useState<number | null>(null);

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
        if (isEditMode && currentFornecedorId !== null) {
            dispatch(updateFornecedor({ id: currentFornecedorId, ...novoFornecedor }));
        } else {
            dispatch(createFornecedor(novoFornecedor));
        }
        resetForm();
        setIsModalOpen(false);
    };

    const handleEdit = (fornecedor: Fornecedor) => {
        setNovoFornecedor(fornecedor);
        setCurrentFornecedorId(fornecedor.id ?? 0);
        setIsEditMode(true);
        setIsModalOpen(true);
    };

    const handleDelete = (id: number) => {
        dispatch(deleteFornecedor(id));
    };

    const openModal = () => {
        setIsEditMode(false);
        setIsModalOpen(true);
    };
    const closeModal = () => setIsModalOpen(false);

    const resetForm = () => {
        setNovoFornecedor({
            nome: '',
            contato: '',
            telefone: '',
            email: '',
            endereco: '',
        });
        setCurrentFornecedorId(null);
        setIsEditMode(false);
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <button className={styles.addButton} onClick={openModal}>
                    <Image src={PlusImage} alt={'+'}/> Cadastrar Fornecedor
                </button>
                <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
                    <h2>{isEditMode ? 'Editar Fornecedor' : 'Cadastrar Novo Fornecedor'}</h2>
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
                        <button type="submit" className={styles.button}>{isEditMode ? 'Atualizar Fornecedor' : 'Adicionar Fornecedor'}</button>
                    </form>
                </Modal>
                <table className={styles.table}>
                    <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Contato</th>
                        <th>Telefone</th>
                        <th>Email</th>
                        <th>Endereço</th>
                        <th>Ações</th>
                    </tr>
                    </thead>
                    <tbody>
                    {fornecedores.map((fornecedor) => (
                        <tr key={fornecedor.id}>
                            <td>{fornecedor.nome}</td>
                            <td>{fornecedor.contato}</td>
                            <td>
                                <Link href={`https://wa.me/${fornecedor.telefone}`} passHref>
                                    {fornecedor.telefone}
                                </Link>
                            </td>
                            <td>
                                <Link href={`mailto:${fornecedor.email}`} passHref>
                                    {fornecedor.email}
                                </Link>
                            </td>
                            <td>{fornecedor.endereco}</td>
                            <td>
                                <button onClick={() => handleEdit(fornecedor)} className={styles.actionButton}>
                                    <Image src={EditImage} alt="Editar" />
                                </button>
                                <button onClick={() => handleDelete(fornecedor.id)} className={styles.actionButton}>
                                    <Image src={DeleteImage} alt="Deletar" />
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Fornecedores;
