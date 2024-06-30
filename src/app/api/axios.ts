import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL, // Altere para a URL da sua API Django
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
