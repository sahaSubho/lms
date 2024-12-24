// services/courseService.ts

import { Course } from "./ApiTypes/CourseType";

const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT as string;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY as string;

if (!API_ENDPOINT || !API_KEY) {
  throw new Error("Missing API endpoint or API key in environment variables.");
}

// Helper function to handle fetch requests with added typing
const fetchFromApi = async <T>(
  url: string,
  options: RequestInit = {}
): Promise<T> => {
  const response = await fetch(`${API_ENDPOINT}${url}`, {
    ...options,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM4NjU3MzU0LCJpYXQiOjE3MzA4ODEzNTQsImp0aSI6ImMxYjExYTYzYmM3ODQxYzA5N2EwZDNiYzJmMDkyODE0IiwidXNlcl9pZCI6MzMzLCJ1c2VyX2tleSI6IjRlYjdkZGU4LTFmNzMtNDk5Yi04Zjc3LTVjZmFiZDIxZDg5NyJ9.DKmm_86oEUfC5TMHGK7DjWmAslQb2R9kMMuuzDH4Zf0`,
      "api-key": API_KEY,
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.statusText}`);
  }

  return response.json() as Promise<T>;
};

// Function to get all courses
export const getAllCourses = async (): Promise<Course[]> => {
  return fetchFromApi<Course[]>("/lms/v1/lms-books");
};
