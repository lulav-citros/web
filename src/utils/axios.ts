import axios from 'axios';
// config
import { HOST_API_KEY } from '../config';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: HOST_API_KEY });

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
});

export default axiosInstance;
