import { useState, useEffect } from "react";
import { chessClient } from "@/api/chessClient";

export interface CourseInclude {
  id: number;
  icon: string;
  description: string;
}

export interface Chapter {
  title: string;
  time_required: number;
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
  title: string;
  author: string;
  price: string;
  course_key: string;
  already_bought: boolean;
  mrp: string;
  rating: number;
  badges: string[];
  points: number;
  course_include: CourseInclude[];
  what_you_learn: string[];
  chapters: Chapter[];
}

export const useGetCourseDetails = (courseKey: string) => {
  const [data, setData] = useState<BookDetails | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await chessClient.get(
          `/lms/v1/lms-view-book/${courseKey}`
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

    if (courseKey) {
      fetchCourseDetails();
    }
  }, [courseKey]);

  return { data, isLoading, error };
};
