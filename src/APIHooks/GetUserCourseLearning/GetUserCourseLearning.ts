import { useState, useEffect, useCallback } from "react";
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
  pages: {
     id: number;
    heading: string;
    text: string;
    content: string;
    content_type: "chess_position" | "video" | "img";
    position_order: number;
    points: number;
    is_solved: boolean;
    chapterId?: string | number;
    pageId?: string | number;
    mcq?: {
      question: string;
      options: string[];
      answer: string;
    };
  }[];
  practice_tests: {
    question: string;
    solution: string;
    position_order: number;
    is_solved: boolean;
  }[];
}

export interface RegisteredCourseDetails {
  title: string;
  author: string;
  price: string;
  course_key: string;
  mrp: string;
  rating: number;
  badges: string[];
  points: number;
  chapters: Chapter[];
}

export const GetUserCourseLearning = (courseKey: string|null) => {
  const [data, setData] = useState<RegisteredCourseDetails | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCourseDetails = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await chessClient.get(
        `/lms/v1/lms-user-course-detail/${courseKey}`
      );
      setData(response.data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error fetching course details"
      );
    } finally {
      setIsLoading(false);
    }
  }, [courseKey]);

  useEffect(() => {
    if (courseKey) {
      fetchCourseDetails();
    }
  }, [courseKey, fetchCourseDetails]);

  return { data, isLoading, error, refetch: fetchCourseDetails };
};
