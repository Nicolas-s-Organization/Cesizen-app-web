import axios from 'axios';


const BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true, // indispensable pour envoyer/recevoir les cookies
});

// Injecte l'accessToken dans chaque requête
api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Gère les 401 → refresh automatique
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Le refreshToken est dans le cookie httpOnly → envoyé automatiquement
        const { data } = await axios.post(
          `${BASE_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        );

        localStorage.setItem('accessToken', data.accessToken);
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(originalRequest);

      } catch {
        localStorage.removeItem('accessToken');
        // window.location.href = '/login'; // redirection forcée vers /login -> A voir si on peut modifier ca
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
