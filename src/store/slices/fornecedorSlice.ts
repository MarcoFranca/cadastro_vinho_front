// src/store/slices/fornecedorSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/app/api/axios';
import {Fornecedor, FornecedorState} from "@/app/types/apiResponses";




const initialState: FornecedorState = {
    fornecedores: [],
    status: 'idle',
    error: null,
};

export const fetchFornecedores = createAsyncThunk('fornecedores/fetchFornecedores', async () => {
    const response = await axiosInstance.get('suppliers/suppliers/');
    return response.data;
});

export const createFornecedor = createAsyncThunk('fornecedores/createFornecedor', async (novoFornecedor: Omit<Fornecedor, 'id'>) => {
    const response = await axiosInstance.post('suppliers/suppliers/', novoFornecedor);
    return response.data;
});

export const updateFornecedor = createAsyncThunk('fornecedores/updateFornecedor', async (fornecedor: Fornecedor) => {
    const response = await axiosInstance.put(`suppliers/suppliers/${fornecedor.id}/`, fornecedor);
    return response.data;
});

export const deleteFornecedor = createAsyncThunk('fornecedores/deleteFornecedor', async (id: number) => {
    await axiosInstance.delete(`suppliers/suppliers/${id}/`);
    return id;
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
            })
            .addCase(updateFornecedor.fulfilled, (state, action) => {
                const index = state.fornecedores.findIndex(fornecedor => fornecedor.id === action.payload.id);
                if (index !== -1) {
                    state.fornecedores[index] = action.payload;
                }
            })
            .addCase(deleteFornecedor.fulfilled, (state, action) => {
                state.fornecedores = state.fornecedores.filter(fornecedor => fornecedor.id !== action.payload);
            });
    },
});

export default fornecedorSlice.reducer;
