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
    moves: {
      ply: number;
      move: string;
      comment: string;
      arrows: { from: string; to: string; color: string }[];
      highlighted_squares: { square: string; color: string }[];
    }[];
    arrows: { from: string; to: string; color: string }[];
    highlighted_squares: { square: string; color: string }[];
    board_disable: boolean;
    show_chessboard_text: boolean;
    custom_pieces: { [key: string]: string };
  }[];
  practice_tests: {
    question: string;
    solution: string;
    position_order: number;
    is_solved: boolean;
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
        localStorage.setItem("courseKey", response.data.courseKey);
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
