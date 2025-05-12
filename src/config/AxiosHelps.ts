import axios from "axios";
export const baseURL = import.meta.env.VITE_URL_BACK;
export const baseURLWS = import.meta.env.VITE_URL_WS;
export const httpClient = axios.create({
    baseURL: baseURL,
});