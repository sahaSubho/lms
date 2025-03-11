import { useState, useEffect } from "react";
import { chessClient } from "@/api/chessClient";

export interface RegisteredCourse {
  completedPercentage: number;
  title: string;
  chapterNumber: number;
  subTitle: string;
  points: number;
  learningKey: string;
  courseKey: string;
  // bookImg: string;
}

export const useGetAllRegisterCourses = (type?:string) => {
  const [data, setData] = useState<RegisteredCourse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRegisteredCourses = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await chessClient.get(
          "/lms/v1/lms-user-registered-courses"+ (type ? `?type=${type}`: '')
        );
        setData(response.data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Error fetching registered courses"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchRegisteredCourses();
  }, []);

  return { data, isLoading, error };
};
