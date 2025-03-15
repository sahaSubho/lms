import axios from "axios";
import Cookies from "js-cookie";

const authToken = Cookies.get("auth_token");

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const MAIN_DOMAIN = process.env.NEXT_PUBLIC_MAIN_DOMAIN || "http://localhost:8081";

console.log("API_URL", API_BASE_URL)

const chessClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "api-key": API_KEY,
  },
});

// Interceptor to set the latest auth token before every request
chessClient.interceptors.request.use(async (config) => {
    if (authToken) {
        config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
});

// Response Interceptor: Redirect to main domain on 401
chessClient.interceptors.response.use(
    (response) => response, // Pass successful responses
    (error) => {
        if (error.response && error.response.status === 401) {
            console.warn("Unauthorized! Redirecting to main domain...");
            window.location.href = MAIN_DOMAIN; // Redirect to main domain
        }
        return Promise.reject(error);
    }
);

export {chessClient}