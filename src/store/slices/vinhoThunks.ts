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
