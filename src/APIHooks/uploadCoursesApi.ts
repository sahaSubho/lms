import { useState } from "react";
import { chessClient } from "@/api/chessClient";

export const useUploadCourseBook = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const uploadCourseBook = async (data: unknown) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await chessClient.post("/lms/v1/lms-upload-book", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setSuccess(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error uploading course book"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return { uploadCourseBook, isLoading, error, success };
};
