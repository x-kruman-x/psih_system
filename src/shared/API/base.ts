import axios from 'axios'

export const loginInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL
});

export const instance = axios.create({
    withCredentials: true,
    baseURL: import.meta.env.VITE_API_BASE_URL
});

instance.interceptors.request.use(
    (config) => {
        config.headers.Authorization = `Bearer ${localStorage.getItem("access_token")}`;
        return config;
    }
);

instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response) {
        console.log("Ошибка обработана программно:", error.response.status);
      } else {
        console.error("Необработанная ошибка:", error);
      }
  
      return Promise.reject(error);
    }
  );

instance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshToken = localStorage.getItem("refresh_token");

                if (!refreshToken) {
                    console.log("Refresh token is missing");
                    return Promise.reject(error);
                }

                const resp = await refreshInstance.post("/api/jwt/refresh/");
                localStorage.setItem("access_token", resp.data.access_token);
                originalRequest.headers.Authorization = `Bearer ${resp.data.access_token}`;
                return instance(originalRequest);
            } catch (refreshError) {
                console.error("Failed to refresh token:", refreshError);
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
                // window.location.href = "/login";
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export const refreshInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

refreshInstance.interceptors.request.use(
    (config) => {
        config.headers.Authorization = `Bearer ${localStorage.getItem("refresh_token")}`;
        return config;
    }
);