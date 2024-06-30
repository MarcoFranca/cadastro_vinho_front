import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Vinho, Fornecedor } from '@/app/types/apiResponses';

interface VinhoState {
    vinhos: Vinho[];
    fornecedores: Fornecedor[];
    filteredVinhos: Vinho[];
    mensagem: string;
}

const initialState: VinhoState = {
    vinhos: [],
    fornecedores: [],
    filteredVinhos: [],
    mensagem: '',
};

const vinhoSlice = createSlice({
    name: 'vinhos',
    initialState,
    reducers: {
        setVinhos(state, action: PayloadAction<Vinho[]>) {
            state.vinhos = action.payload;
            state.filteredVinhos = action.payload;
        },
        setFilteredVinhos(state, action: PayloadAction<Vinho[]>) {
            state.filteredVinhos = action.payload;
        },
        setFornecedores(state, action: PayloadAction<Fornecedor[]>) {
            state.fornecedores = action.payload;
        },
        setMensagem(state, action: PayloadAction<string>) {
            state.mensagem = action.payload;
        },
    },
});

export const { setVinhos, setFilteredVinhos, setFornecedores, setMensagem } = vinhoSlice.actions;

export default vinhoSlice.reducer;
