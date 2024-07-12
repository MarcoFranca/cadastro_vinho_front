import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import fornecedorReducer from './slices/fornecedorSlice';
import vinhoReducer from '@/store/slices/vinhoSlice';


export const store = configureStore({
    reducer: {
        auth: authReducer,
        fornecedores: fornecedorReducer,
        vinhos: vinhoReducer,

    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
