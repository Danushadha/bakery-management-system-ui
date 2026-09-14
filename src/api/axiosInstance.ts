import axios from "axios";

const api = axios.create({
    baseURL: "https://daring-imagination-production-57b7.up.railway.app"
});

api.interceptors.request.use((config) => {

    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default api;
