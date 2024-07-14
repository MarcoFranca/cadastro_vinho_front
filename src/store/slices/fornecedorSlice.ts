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
    const response = await axiosInstance.get('suppliers/suppliers/');
    return response.data;
});

export const createFornecedor = createAsyncThunk('fornecedores/createFornecedor', async (novoFornecedor: Fornecedor) => {
    const response = await axiosInstance.post('suppliers/suppliers/', novoFornecedor, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
    });
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
