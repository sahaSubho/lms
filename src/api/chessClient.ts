import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export const chessClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM4NjU3MzU0LCJpYXQiOjE3MzA4ODEzNTQsImp0aSI6ImMxYjExYTYzYmM3ODQxYzA5N2EwZDNiYzJmMDkyODE0IiwidXNlcl9pZCI6MzMzLCJ1c2VyX2tleSI6IjRlYjdkZGU4LTFmNzMtNDk5Yi04Zjc3LTVjZmFiZDIxZDg5NyJ9.DKmm_86oEUfC5TMHGK7DjWmAslQb2R9kMMuuzDH4Zf0`,
    "api-key": API_KEY,
  },
});
