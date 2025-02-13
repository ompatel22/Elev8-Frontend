import axios from "axios";
export const baseURL = "http://localhost:8080/api/v1";
export const httpClient = axios.create({
  baseURL: baseURL,
  withCredentials :true
});
