'use client';

import React from 'react';
import styles from './cadastrar-vinhos.module.css';
import { WineFormProps } from '@/app/types/apiResponses';


const WineForm: React.FC<WineFormProps> = ({
                      handleSubmit,
                      nome,
                      setNome,
                      vinicula,
                      setVinicula,
                      pais,
                      setPais,
                      uva,
                      setUva,
                      safra,
                      setSafra,
                      tamanho,
                      setTamanho,
                      valorCusto,
                      setValorCusto,
                      markup,
                      setMarkup,
                      estoque,
                      setEstoque,
                      fornecedores,
                      fornecedoresSelecionados,
                      handleFornecedorChange,
                      handleImageChange,
                      imagem,
                      mensagem
                  }) => {
    return (
        <div className={styles.modalContent}>
            <h2>Cadastrar Vinho</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Vinícola"
                    value={vinicula}
                    onChange={(e) => setVinicula(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="País"
                    value={pais}
                    onChange={(e) => setPais(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Uva"
                    value={uva}
                    onChange={(e) => setUva(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Safra"
                    value={safra}
                    onChange={(e) => setSafra(e.target.value)}
                    required
                />
                <select value={tamanho} onChange={(e) => setTamanho(e.target.value)} required>
                    <option value="meia">Meia Garrafa</option>
                    <option value="inteira">Garrafa Inteira</option>
                </select>
                <input
                    type="number"
                    placeholder="Valor de Custo"
                    value={valorCusto}
                    onChange={(e) => setValorCusto(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Markup"
                    value={markup}
                    onChange={(e) => setMarkup(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Estoque"
                    value={estoque}
                    onChange={(e) => setEstoque(e.target.value)}
                    required
                />
                <select multiple onChange={handleFornecedorChange} required>
                    {fornecedores.map((fornecedor) => (
                        <option key={fornecedor.id} value={fornecedor.id}>
                            {fornecedor.nome}
                        </option>
                    ))}
                </select>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    required
                />
                <button type="submit">Cadastrar</button>
            </form>
            {mensagem && <p>{mensagem}</p>}
        </div>
    );
};

export default WineForm;
