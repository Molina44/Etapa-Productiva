import axios from "axios";


const axiosClient = axios.create({
    baseURL: 'http://localhost:4000'
});

// Interceptor para agregar el token a cada solicitud
axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Utilizar el encabezado estándar de autorización
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  });
  
  axiosClient.interceptors.response.use((response) => {
    return response;
  }, (error) => {
    // Manejar errores globalmente
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/'; // Redirigir al login si no está autorizado
    }
    return Promise.reject(error);
  });
  
  export default axiosClient;
  