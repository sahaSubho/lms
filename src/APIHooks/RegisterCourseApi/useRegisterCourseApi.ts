import { useState } from "react";
import { chessClient } from "@/api/chessClient";

export const useRegisterCourse = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const registerCourse = async (courseKey: string) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await chessClient.post("/lms/v1/lms-register-course", {
        book_uuid: courseKey,
      });
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error registering course");
    } finally {
      setIsLoading(false);
    }
  };

  return { registerCourse, isLoading, error, success };
};
