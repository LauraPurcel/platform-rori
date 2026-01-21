import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8081",
    withCredentials: true
});

api.interceptors.request.use(config => {
    if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");

        if (token && token !== "null" && token !== "undefined") {
            config.headers.Authorization = `Bearer ${token}`;
        } else {
            delete config.headers.Authorization;
        }
    }

    return config;
});

export default api;
