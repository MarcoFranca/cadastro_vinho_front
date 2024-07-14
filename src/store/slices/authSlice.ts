import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
    id: string;
    username: string;
    email: string;
}

interface AuthState {
    user: User | null;
    token: {
        access: string;
        refresh: string;
    } | null;
}

const initialState: AuthState = {
    user: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') || 'null') : null,
    token: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('token') || 'null') : null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{ user: User; token: { access: string; refresh: string } }>) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            localStorage.setItem('user', JSON.stringify(action.payload.user));
            localStorage.setItem('token', JSON.stringify(action.payload.token));
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        },
        setToken: (state, action: PayloadAction<{ access: string; refresh: string }>) => {
            if (state.token) {
                state.token.access = action.payload.access;
                state.token.refresh = action.payload.refresh;
                localStorage.setItem('token', JSON.stringify(state.token));
            }
        },
    },
});

export const { login, logout, setToken } = authSlice.actions;

export default authSlice.reducer;
