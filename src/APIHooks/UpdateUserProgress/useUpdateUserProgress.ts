import { useState } from "react";
import { chessClient } from "@/api/chessClient";

interface UpdateProgressParams {
  pageId: number;
  contentType: "img" | "video" | "chess_position";
  videoWatched?: boolean; // For video content
  move?: string; // For chess content
}

export const useUpdateUserProgress = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const updateProgress = async ({
    pageId,
    contentType,
    videoWatched = false,
    move,
  }: UpdateProgressParams) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await chessClient.post("/lms/v1/user-progress", {
        page_id: pageId,
        content_type: contentType,
        video_watched: contentType === "video" ? videoWatched : undefined,
        move: contentType === "chess_position" ? move : undefined,
      });
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error updating progress");
    } finally {
      setIsLoading(false);
    }
  };

  return { updateProgress, isLoading, error, success };
};
