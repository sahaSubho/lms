import { useState, useEffect } from "react";
import { chessClient } from "@/api/chessClient";

export interface CourseInclude {
  id: number;
  icon: string;
  description: string;
}

export interface Chapter {
  id: number;
  title: string;
  time_required: number;
  is_locked: boolean;
  points: number;
  user_point: number;
  pages: {
    heading: string;
    text: string;
    content: string;
    content_type: string;
    position_order: number;
  }[];
  practice_tests: {
    question: string;
    solution: string;
    position_order: number;
  }[];
}

export interface BookDetails {
  completedPercentage: number;
  title: string;
  chapterNumber: number;
  chapterId: number;
  subTitle: string;
  author: string;
  price: string;
  courseKey: string;
  already_bought: boolean;
  mrp: string;
  rating: number;
  badges: string[];
  points: number;
  chapters: Chapter[];
  user_score: number;
  leaderboard: {
    user_id: number;
    name: string;
    total_score: number;
  }[];
}

export const useGetBeginnerCourseDetails = () => {
  const [data, setData] = useState<BookDetails | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await chessClient.get(
          `/lms/v1/lms-beginner-course`
        );
        setData(response.data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Error fetching book details"
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchCourseDetails();
  }, []);

  return { data, isLoading, error };
};
