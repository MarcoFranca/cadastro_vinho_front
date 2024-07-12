import axios, { AxiosInstance } from 'axios';

// Criação da instância do Axios
const axiosInstance: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Adiciona um interceptor para incluir o token JWT no cabeçalho Authorization
if (typeof window !== 'undefined') {
    axiosInstance.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem('token');
            const parsedToken = token ? JSON.parse(token) : null;

            if (parsedToken && parsedToken.access) {
                config.headers.Authorization = `Bearer ${parsedToken.access}`;
            }

            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
}

// Exportação da instância do Axios
// @ts-ignore
export default axiosInstance;