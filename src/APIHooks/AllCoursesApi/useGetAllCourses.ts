import { useState, useEffect } from "react";
import { chessClient } from "@/api/chessClient";

export interface Course {
  courseKey: string;
  title: string;
  author: string;
  chapters: number;
  timeLength: string;
  price: number;
  mrp: number;
  rating: number;
  createdAt: string;
  badges: string[];
  already_bought: boolean;
}

export const useGetAllCourses = () => {
  const [data, setData] = useState<Course[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await chessClient.get("/lms/v1/lms-books");
        setData(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error fetching data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return { data, isLoading, error };
};
