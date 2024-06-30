import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import { fetchVinhos, fetchFornecedores } from '@/store/slices/vinhoThunks';
import styles from './cadastrar-vinhos.module.css';
import Modal from '@/app/components/Modal/Modal';
import WineForm from './WineForm';
import axiosInstance from '@/app/api/axios';
import { Vinho, Fornecedor } from '@/app/types/apiResponses';
import DownloadExcel from '@/app/components/dashboard/cadastrar-vinhos/DownloadExel';
import UploadExcel from "@/app/components/dashboard/cadastrar-vinhos/UploadExcel";

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
    const [groupByFornecedor, setGroupByFornecedor] = useState(false);

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
            const response = await axiosInstance.post('/wines/wines/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            dispatch({ type: 'vinhos/setMensagem', payload: 'Vinho cadastrado com sucesso!' });
            setIsModalOpen(false);
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
            dispatch({ type: 'vinhos/setVinhos', payload: [...vinhos, response.data] });
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

    const filteredVinhos = vinhos.filter((vinho) =>
        vinho.nome.toLowerCase().includes(filtro.toLowerCase())
    );

    // Organize vinhos por fornecedores
    const vinhosPorFornecedor = fornecedores.reduce((acc: { fornecedor: Fornecedor, vinhos: Vinho[] }[], fornecedor: Fornecedor) => {
        const vinhosFornecedor = filteredVinhos.filter((vinho) =>
            vinho.fornecedores.includes(fornecedor.id)
        );
        if (vinhosFornecedor.length) {
            acc.push({ fornecedor, vinhos: vinhosFornecedor });
        }
        return acc;
    }, []);

    const handlePrint = () => {
        window.print();
    };

    const handleDownloadCSV = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('/wines/export/', {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

        } catch (error) {
            dispatch({ type: 'vinhos/setMensagem', payload: 'Erro ao cadastrar vinho.' });
        }
    };

    return (
        <div className={styles.container}>
            <div className={`${styles.header} hide-on-print`}>
                <button onClick={() => setIsModalOpen(true)}>+ Cadastrar Vinho</button>
                <input
                    type="text"
                    placeholder="Buscar por nome"
                    value={filtro}
                    onChange={(e) => setFiltro(e.target.value)}
                    className={styles.filtro}
                />
                <button onClick={() => setGroupByFornecedor(!groupByFornecedor)}>
                    {groupByFornecedor ? 'Ver Todos' : 'Agrupar por Fornecedor'}
                </button>
                <button onClick={handlePrint}>Imprimir</button>
                <DownloadExcel/>
                <UploadExcel/>
            </div>
            <div className="printableArea">
                {groupByFornecedor ? (
                    <div className={styles.vinhosList}>
                        {vinhosPorFornecedor.map((group) => (
                            <div key={group.fornecedor.id} className={styles.fornecedorGroup}>
                                <h3>{group.fornecedor.nome}</h3>
                                <ul className={styles.card}>
                                    {group.vinhos.map((vinho) => (
                                        <li key={vinho.id} className={styles.cell}>
                                            <img src={vinho.imagem} alt={vinho.nome} />
                                            <p>Vinho: {vinho.nome}</p>
                                            <p>Safra: {vinho.safra}</p>
                                            <p>Vinicula: {vinho.vinicula}</p>
                                            <p>Uva: {vinho.uva}</p>
                                            <p>Valor: {vinho.valorCusto}</p>
                                            <p>Pais: {vinho.pais}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                ) : (
                    <ul className={styles.card}>
                        {filteredVinhos.map((vinho) => (
                            <li key={vinho.id} className={styles.cell}>
                                <img src={vinho.imagem} alt={vinho.nome} />
                                <p>Vinho: {vinho.nome}</p>
                                <p>Safra: {vinho.safra}</p>
                                <p>Vinicula: {vinho.vinicula}</p>
                                <p>Uva: {vinho.uva}</p>
                                <p>Valor: {vinho.valorCusto}</p>
                                <p>Pais: {vinho.pais}</p>
                            </li>
                        ))}
                    </ul>
                )}
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
