// src/utils/axios.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api/v1/', // Ajuste o URL conforme necessário
});

api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default api;
