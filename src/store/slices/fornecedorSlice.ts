// src/store/slices/fornecedorSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/app/api/axios';

interface Fornecedor {
    id?: number;
    nome: string;
    contato: string;
    telefone: string;
    email: string;
    endereco: string;
}

interface FornecedorState {
    fornecedores: Fornecedor[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: FornecedorState = {
    fornecedores: [],
    status: 'idle',
    error: null,
};

export const fetchFornecedores = createAsyncThunk('fornecedores/fetchFornecedores', async () => {
    const response = await axiosInstance.get('/suppliers/suppliers/');
    return response.data;
});

export const createFornecedor = createAsyncThunk('fornecedores/createFornecedor', async (novoFornecedor: Fornecedor) => {
    const response = await axiosInstance.post('/suppliers/suppliers/', novoFornecedor, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
    });
    return response.data;
});

const fornecedorSlice = createSlice({
    name: 'fornecedores',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchFornecedores.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchFornecedores.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.fornecedores = action.payload;
            })
            .addCase(fetchFornecedores.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || null;
            })
            .addCase(createFornecedor.fulfilled, (state, action) => {
                state.fornecedores.push(action.payload);
            });
    },
});

export default fornecedorSlice.reducer;
