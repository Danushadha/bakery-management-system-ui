import axios from "axios";

const api = axios.create({
   // baseURL: "https://bakery-management-system-api-production.up.railway.app"
    

    baseURL: "http://localhost:8082" 
});

api.interceptors.request.use((config) => {

    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default api;
