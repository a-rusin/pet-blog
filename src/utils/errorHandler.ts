import axios from "axios";
import { toast } from "react-toastify";
import z from "zod";

export const errorHandler = (error: unknown): string => {
  let errorMsg: string;
  if (error instanceof z.ZodError) {
    errorMsg = "Expecter error: Invalid data from server";
  } else if (axios.isAxiosError(error) && error.response?.data?.error) {
    errorMsg = `Expecter error: ${error.response?.data?.error?.message || error.response?.data?.error}`;
  } else {
    errorMsg = "Unexpected error";
  }

  toast.error(errorMsg);

  return errorMsg;
};
