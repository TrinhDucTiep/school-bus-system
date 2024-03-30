import axios from 'axios';
import Cookies from 'js-cookie';
import { camelCase } from 'lodash';
// Create an axios instance
const apiClient = axios.create({
  baseURL: "http://localhost:8080", //todo: lam lai sau
});
const REFRESH_TOKEN_ENDPOINT: string = process.env.REFRESH_TOKEN_ENDPOINT || ''; // replace with your refresh token endpoint
// Add a request interceptor
apiClient.interceptors.request.use((config) => {
  const token = Cookies.get('accessToken');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  if (config.data) {
    config.data = toSnakeCase(config.data);
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});
'/refresh-token-endpoint'
// Add a response interceptor
apiClient.interceptors.response.use((response) => {
  response.data = toCamelCase(response.data);
  return response;
}, async (error) => {

  const originalRequest = error.config;
  if (error?.response?.status === 401 && !originalRequest._retry) { // if response is unauthorized
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

function toCamelCase(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(v => toCamelCase(v));
  } else if (obj !== null && obj !== undefined && obj.constructor === Object) {
    return Object.fromEntries(
      Object.entries(obj).map(([k, v]) => [camelCase(k), toCamelCase(v)])
    );
  } else {
    return obj;
  }
}

function toSnakeCase(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(v => toSnakeCase(v));
  } else if (obj !== null && obj !== undefined && obj.constructor === Object) {
    return Object.fromEntries(
      Object.entries(obj).map(([k, v]) => [k.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`), toSnakeCase(v)])
    );
  } else {
    return obj;
  }
}

export default apiClient;