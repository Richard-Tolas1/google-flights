import axios, { AxiosInstance, AxiosError, AxiosResponse } from "axios";

const axiosClient = (): AxiosInstance => {
  const headers = {
    "x-rapidapi-key": "ab33ff3159msh978ae20b105def3p1497eejsn6d4b19dc87f4",
    "x-rapidapi-host": "sky-scrapper.p.rapidapi.com",
  };

  const client = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers,
    timeout: 60000,
    withCredentials: false,
  });

  client.interceptors.request.use((config: any) => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    config.headers = config.headers || {};
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  client.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    (error: AxiosError) => {
      try {
        const { response } = error;
        if (response?.status === 401) {
          localStorage.removeItem("ACCESS_TOKEN");
        }
      } catch (e) {
        console.error(e);
      }
      throw error;
    }
  );

  return client;
};

export default axiosClient;