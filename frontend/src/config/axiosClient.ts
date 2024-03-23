import axios from 'axios';
import Cookies from 'js-cookie';
// Create an axios instance
const apiClient = axios.create({
  baseURL: "http://localhost:8080", //todo: hieudt
});
const REFRESH_TOKEN_ENDPOINT: string = process.env.REFRESH_TOKEN_ENDPOINT || ''; // replace with your refresh token endpoint
// Add a request interceptor
apiClient.interceptors.request.use((config) => {
  const token = Cookies.get('accessToken');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});
'/refresh-token-endpoint'
// Add a response interceptor
apiClient.interceptors.response.use((response) => {
  return response;
}, async (error) => {
  const originalRequest = error.config;
  if (error.response.status === 401 && !originalRequest._retry) { // if response is unauthorized
    originalRequest._retry = true;
    const refreshToken = Cookies.get('refreshToken'); // replace with your refresh token getting logic
    return apiClient.post(REFRESH_TOKEN_ENDPOINT, { refreshToken }) // replace with your refresh token endpoint
      .then((response) => {
        Cookies.set('accessToken', response.data.accessToken); // replace with your token setting logic
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`;
        return apiClient(originalRequest); // Retry the original request
      });
  }
  return Promise.reject(error);
});

export default apiClient;