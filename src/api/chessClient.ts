import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export const chessClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ4NTA5Nzc0LCJpYXQiOjE3NDA3MzM3NzQsImp0aSI6IjcyNzFjMzY0OTI1YTQ0YTE5NzNlYmU5MWYyN2VkNTgwIiwidXNlcl9pZCI6MTEzNCwidXNlcl9rZXkiOiJiOTkxMDYzNi1iYjAyLTRjMGQtYTBkZC03Y2YwODI4MjJiZjcifQ.1b1M73jjDY0cPd4yI-JMoc8T7_oC1DAo0Fu-wAJFDNs`,
    "api-key": API_KEY,
  },
});