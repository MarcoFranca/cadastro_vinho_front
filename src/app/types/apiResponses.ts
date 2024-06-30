// src/types/apiResponses.ts
import React from 'react';

export interface UserResponse {
    id: number;
    username: string;
    email: string;
}

export interface User {
    id: number;
    username: string;
    email: string;
    // Adicione outros campos conforme necessário
}

export interface AsideHeaderProps {
    // eslint-disable-next-line no-unused-vars
    onMenuClick: (section: string) => void;
    currentSection: string;
}

export interface Fornecedor {
    id: string;
    nome: string;
    // Adicione outros campos relevantes aqui
}

export interface Vinho {
    id: string;
    nome: string;
    vinicula: string;
    pais: string;
    uva: string;
    safra: string;
    tamanho: string;
    valorCusto: number;
    markup: number;
    estoque: number;
    imagem: string;
    fornecedores: Fornecedor[];
    // Adicione outros campos relevantes aqui
}

export interface WineFormProps {
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    nome: string;
    setNome: React.Dispatch<React.SetStateAction<string>>;
    vinicula: string;
    setVinicula: React.Dispatch<React.SetStateAction<string>>;
    pais: string;
    setPais: React.Dispatch<React.SetStateAction<string>>;
    uva: string;
    setUva: React.Dispatch<React.SetStateAction<string>>;
    safra: string;
    setSafra: React.Dispatch<React.SetStateAction<string>>;
    tamanho: string;
    setTamanho: React.Dispatch<React.SetStateAction<string>>;
    valorCusto: string;
    setValorCusto: React.Dispatch<React.SetStateAction<string>>;
    markup: string;
    setMarkup: React.Dispatch<React.SetStateAction<string>>;
    estoque: string;
    setEstoque: React.Dispatch<React.SetStateAction<string>>;
    fornecedores: Fornecedor[];
    fornecedoresSelecionados: string[];
    handleFornecedorChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    imagem: File | null;
    mensagem: string;
}
