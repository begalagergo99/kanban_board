import axios from "axios";

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_URL,
});

