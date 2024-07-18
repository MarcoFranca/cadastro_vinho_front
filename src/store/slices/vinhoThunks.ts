import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/app/api/axios';
import { setVinhos, setFornecedores } from './vinhoSlice';
import { Vinho, Fornecedor } from '@/app/types/apiResponses';
import { RootState } from '@/store/store';

export const fetchVinhos = createAsyncThunk<void, void, { state: RootState }>(
    'vinhos/fetchVinhos',
    async (_, { dispatch }) => {
        try {
            const response = await axiosInstance.get<Vinho[]>('wines/wines/');
            dispatch(setVinhos(response.data));
        } catch (error) {
            console.error('Erro ao buscar vinhos:', error);
            dispatch(setVinhos([]));
        }
    }
);

export const fetchFornecedores = createAsyncThunk<void, void, { state: RootState }>(
    'vinhos/fetchFornecedores',
    async (_, { dispatch }) => {
        try {
            const response = await axiosInstance.get<Fornecedor[]>('suppliers/suppliers/');
            dispatch(setFornecedores(response.data));
        } catch (error) {
            console.error('Erro ao buscar fornecedores:', error);
            dispatch(setFornecedores([]));
        }
    }
);

export const updateVinho = createAsyncThunk<void, { id: string; formData: FormData }, { state: RootState }>(
    'vinhos/updateVinho',
    async ({ id, formData }, { dispatch }) => {
        try {
            const response = await axiosInstance.put(`wines/wines/${id}/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            dispatch(fetchVinhos());
        } catch (error) {
            console.error('Erro ao atualizar vinho:', error);
        }
    }
);

export const deleteVinho = createAsyncThunk<void, string, { state: RootState }>(
    'vinhos/deleteVinho',
    async (id, { dispatch }) => {
        try {
            await axiosInstance.delete(`wines/wines/${id}/`);
            dispatch(fetchVinhos());
        } catch (error) {
            console.error('Erro ao deletar vinho:', error);
        }
    }
);
