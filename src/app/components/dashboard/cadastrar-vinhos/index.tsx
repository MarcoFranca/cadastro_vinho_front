import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import { fetchVinhos, fetchFornecedores, updateVinho, deleteVinho } from '@/store/slices/vinhoThunks';
import styles from './cadastrar-vinhos.module.css';
import Modal from '@/app/components/Modal/Modal';
import WineForm from './WineForm';
import axiosInstance from '@/app/api/axios';
import { Vinho, Fornecedor } from '@/app/types/apiResponses';
import DownloadExcel from '@/app/components/dashboard/cadastrar-vinhos/DownloadExel';
import UploadExcel from "@/app/components/dashboard/cadastrar-vinhos/UploadExcel";
import Image from 'next/image';
import EditImage from '../../../../../public/assets/icones/edit.svg';
import DeleteImage from '../../../../../public/assets/icones/delete.svg';

const CadastrarVinhos: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const vinhos = useSelector((state: RootState) => state.vinhos.vinhos);
    const fornecedores = useSelector((state: RootState) => state.vinhos.fornecedores);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [nome, setNome] = useState('');
    const [vinicula, setVinicula] = useState('');
    const [pais, setPais] = useState('');
    const [uva, setUva] = useState('');
    const [safra, setSafra] = useState('');
    const [tamanho, setTamanho] = useState('inteira');
    const [valorCusto, setValorCusto] = useState('');
    const [markup, setMarkup] = useState('');
    const [estoque, setEstoque] = useState('');
    const [fornecedoresSelecionados, setFornecedoresSelecionados] = useState<string[]>([]);
    const [imagem, setImagem] = useState<File | null>(null);
    const [mensagem, setMensagem] = useState('');
    const [filtro, setFiltro] = useState('');
    const [currentVinhoId, setCurrentVinhoId] = useState<string | null>(null);
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        dispatch(fetchVinhos());
        dispatch(fetchFornecedores());
    }, [dispatch]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('nome', nome);
        formData.append('vinicula', vinicula);
        formData.append('pais', pais);
        formData.append('uva', uva);
        formData.append('safra', safra);
        formData.append('tamanho', tamanho);
        formData.append('valor_custo', valorCusto);
        formData.append('markup', markup);
        formData.append('estoque', estoque);
        if (imagem) {
            formData.append('imagem', imagem);
        }
        fornecedoresSelecionados.forEach(fornecedorId => {
            formData.append('fornecedores', fornecedorId);
        });

        try {
            if (isEditMode && currentVinhoId) {
                dispatch(updateVinho({ id: currentVinhoId, formData }));
            } else {
                const response = await axiosInstance.post('wines/wines/', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                dispatch({ type: 'vinhos/setVinhos', payload: [...vinhos, response.data] });
            }
            setIsModalOpen(false);
            resetForm();
            dispatch(fetchVinhos());
        } catch (error) {
            dispatch({ type: 'vinhos/setMensagem', payload: 'Erro ao cadastrar vinho.' });
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImagem(e.target.files[0]);
        }
    };

    const handleFornecedorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const options = Array.from(e.target.selectedOptions);
        setFornecedoresSelecionados(options.map(option => option.value));
    };

    const handleEdit = (vinho: Vinho) => {
        setNome(vinho.nome);
        setVinicula(vinho.vinicula);
        setPais(vinho.pais);
        setUva(vinho.uva);
        setSafra(vinho.safra);
        setTamanho(vinho.tamanho);
        setValorCusto(vinho.valor_custo.toString());
        setMarkup(vinho.markup.toString());
        setEstoque(vinho.estoque.toString());
        setFornecedoresSelecionados(vinho.fornecedores);
        setCurrentVinhoId(vinho.id);
        setIsEditMode(true);
        setIsModalOpen(true);
    };

    const handleDelete = (id: string) => {
        dispatch(deleteVinho(id));
    };

    const resetForm = () => {
        setNome('');
        setVinicula('');
        setPais('');
        setUva('');
        setSafra('');
        setTamanho('inteira');
        setValorCusto('');
        setMarkup('');
        setEstoque('');
        setImagem(null);
        setFornecedoresSelecionados([]);
        setCurrentVinhoId(null);
        setIsEditMode(false);
    };

    return (
        <div className={styles.container}>
            <div className={`${styles.header}`}>
                <button onClick={() => setIsModalOpen(true)}>+ Cadastrar Vinho</button>
                <input
                    type="text"
                    placeholder="Buscar por nome"
                    value={filtro}
                    onChange={(e) => setFiltro(e.target.value)}
                    className={styles.filtro}
                />
                <DownloadExcel />
                <UploadExcel />
            </div>
            <div className="printableArea">
                <table className={styles.table}>
                    <thead>
                    <tr>
                        <th>Imagem</th>
                        <th>Nome</th>
                        <th>Safra</th>
                        <th>Vinicula</th>
                        <th>Uva</th>
                        <th>Valor Custo</th>
                        <th>País</th>
                        <th>Ações</th>
                    </tr>
                    </thead>
                    <tbody>
                    {vinhos.filter(vinho => vinho.nome.toLowerCase().includes(filtro.toLowerCase())).map((vinho) => (
                        <tr key={vinho.id}>
                            <td><img src={vinho.imagem} alt={vinho.nome} className={styles.image} /></td>
                            <td>{vinho.nome}</td>
                            <td>{vinho.safra}</td>
                            <td>{vinho.vinicula}</td>
                            <td>{vinho.uva}</td>
                            <td>{vinho.valor_custo}</td>
                            <td>{vinho.pais}</td>
                            <td>
                                <button onClick={() => handleEdit(vinho)} className={styles.actionButton}>
                                    <Image src={EditImage} alt="Editar" />
                                </button>
                                <button onClick={() => handleDelete(vinho.id)} className={styles.actionButton}>
                                    <Image src={DeleteImage} alt="Deletar" />
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
                <WineForm
                    handleSubmit={handleSubmit}
                    nome={nome}
                    setNome={setNome}
                    vinicula={vinicula}
                    setVinicula={setVinicula}
                    pais={pais}
                    setPais={setPais}
                    uva={uva}
                    setUva={setUva}
                    safra={safra}
                    setSafra={setSafra}
                    tamanho={tamanho}
                    setTamanho={setTamanho}
                    valorCusto={valorCusto}
                    setValorCusto={setValorCusto}
                    markup={markup}
                    setMarkup={setMarkup}
                    estoque={estoque}
                    setEstoque={setEstoque}
                    fornecedores={fornecedores}
                    fornecedoresSelecionados={fornecedoresSelecionados}
                    handleFornecedorChange={handleFornecedorChange}
                    handleImageChange={handleImageChange}
                    imagem={imagem}
                    mensagem={mensagem}
                />
            </Modal>
        </div>
    );
};

export default CadastrarVinhos;
