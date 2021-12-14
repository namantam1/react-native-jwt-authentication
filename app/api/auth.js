import apiClient from './client';

const login = data => apiClient.post('/api/token/', data);
const register = data => apiClient.post('/api/register/', data);

const users = () => apiClient.get("/api/users/");

export default {login, register, users};
