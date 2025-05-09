import axios from "axios";
export const baseURL = "http://localhost:8080";
export const baseURLWS = "http://localhost:8080/ws";
export const httpClient = axios.create({
    baseURL: baseURL,
});