import axios from 'axios';
import { BASE_API_URL } from './constants';
import { TOKEN_STORAGE_KEY } from '../auth/hooks/useAuth';

export const httpClient = axios.create({
  baseURL: BASE_API_URL,
});

httpClient.interceptors.request.use((config) => {
  const localStorageValue = localStorage.getItem(TOKEN_STORAGE_KEY);
  if (!localStorageValue) {
    return config;
  }
  const token = JSON.parse(localStorageValue);
  if (config.headers && token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});
