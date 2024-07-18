'use client';

import React from 'react';
import styles from './cadastrar-vinhos.module.css';
import { Vinho } from '@/app/types/apiResponses';

interface WineListProps {
    vinhos: Vinho[];
    filtro: string;
    setFiltro: (filtro: string) => void;
    onCadastrarClick: () => void;
}

const WineList: React.FC<WineListProps> = ({ vinhos, filtro, setFiltro, onCadastrarClick }) => {
    return (
        <div>
            <div className={styles.header}>
                <button onClick={onCadastrarClick}>+ Cadastrar Vinho</button>
                <input
                    type="text"
                    placeholder="Buscar por nome"
                    value={filtro}
                    onChange={(e) => setFiltro(e.target.value)}
                    className={styles.filtro}
                />
            </div>
            <ul className={styles.card}>
                {vinhos.length > 0 ? (
                    vinhos.map((vinho) => (
                        <li key={vinho.id} className={styles.cell}>
                            <img src={vinho.imagem} alt={vinho.nome} />
                            <p>Vinho: {vinho.nome}</p>
                            <p>Safra: {vinho.safra}</p>
                            <p>Vinicula: {vinho.vinicula}</p>
                            <p>Uva: {vinho.uva}</p>
                            <p>Valor: {vinho.valor_custo}</p>
                            <p>Pais: {vinho.pais}</p>
                        </li>
                    ))
                ) : (
                    <p>Nenhum vinho encontrado.</p>
                )}
            </ul>
        </div>
    );
};

export default WineList;
