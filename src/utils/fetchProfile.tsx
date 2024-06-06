import api from './axios';

export async function fetchProfile(token: any) {
    try {
        const response = await api.get('users/users/profile/', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch profile');
    }
}
