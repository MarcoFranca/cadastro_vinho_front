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

//fornecedor

export interface Fornecedor {
    id: number;
    nome: string;
    contato: string;
    telefone: string;
    email: string;
    endereco: string;
}

export interface FornecedorState {
    fornecedores: Fornecedor[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}


export interface Vinho {
    id: string;
    nome: string;
    vinicula: string;
    pais: string;
    uva: string;
    safra: string;
    tamanho: string;
    valor_custo: number; // Assegure-se de que esta propriedade está definida corretamente
    markup: number;
    estoque: number;
    fornecedores: string[];
    imagem?: string;
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
