import { useState, useEffect } from "react";
import { chessClient } from "@/api/chessClient";

export interface UserDetails {
  name: string;
  total_score: number;
}


export const useGetBeginnerUserDetails = () => {
  const [data, setData] = useState<UserDetails | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      setError(null);
      try {
        const response = await chessClient.get(
          `/lms/v1/lms-beginner-user-details`
        );
        setData(response.data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Error fetching book details"
        );
      } 
    };
    fetchCourseDetails();
  }, []);

  return { data, error };
};
