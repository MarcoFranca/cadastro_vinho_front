// src/app/components/UploadExcel.tsx
import React, { useState } from 'react';
import axiosInstance from '@/app/api/axios';
import Button from '../../Button';
import styles from './UploadExcel.module.css';

const UploadExcel: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [message, setMessage] = useState<string>('');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!file) {
            setMessage('Por favor, selecione um arquivo.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axiosInstance.post('/wines/import/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',  
                },
            });

            setMessage('Arquivo importado com sucesso!');
        } catch (error) {
            console.error('Erro ao importar o arquivo Excel', error);
            setMessage('Erro ao importar o arquivo.');
        }
    };

    return (
        <div className={styles.container}>
            <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
            <Button onClick={handleUpload}>Importar Excel</Button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default UploadExcel;
