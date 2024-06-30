// src/app/components/DownloadExcel.tsx
import React from 'react';
import axiosInstance from '@/app/api/axios';
import { saveAs } from 'file-saver';
import Button from '../../Button';

const DownloadExcel: React.FC = () => {
    const handleDownload = async () => {
        try {
            const response = await axiosInstance.get('/wines/export/', {
                responseType: 'blob', // Especifica que a resposta é um blob
            });

            const blob = new Blob([response.data], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            });
            saveAs(blob, 'fornecedores_vinhos.xlsx');
        } catch (error) {
            console.error('Erro ao baixar o arquivo Excel', error);
        }
    };

    return (
        <Button onClick={handleDownload}>Download Excel</Button>
    );
};

export default DownloadExcel;
