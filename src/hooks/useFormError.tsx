import { useState } from "react";
import { getErrorMessage } from "@/lib";

interface UseFormErrorResult {
  error: string;
  setErrorMsg: (error: any, defaultMsg?: string) => void;
  clearError: () => void;
}

export function useFormError(): UseFormErrorResult {
  const [error, setError] = useState<string>("");

  const setErrorMsg = (
    err: any,
    defaultMsg: string = "An unexpected error occurred. Please try again."
  ) => {
    setError(getErrorMessage(err, defaultMsg));
  };

  const clearError = () => {
    setError("");
  };

  return { error, setErrorMsg, clearError };
}
