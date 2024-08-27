import { axiosInstance } from "@/lib";

export const login = async (
  username: string,
  password: string
): Promise<void> => {
  const response = await axiosInstance
    .post("/api/login", { username, password })
    .catch((error) => {
      console.error("Login service error:", error);
      throw error; // Rethrow to handle it in the component
    });
  // Handle the response if needed, such as storing the token
  return response.data;
};

export const register = async (
  username: string,
  password: string
): Promise<void> => {
  const response = await axiosInstance
    .post("/api/register", { username, password })
    .catch((error) => {
      console.error("Register service error:", error);
      throw new Error("Failed to register. Please try again."); // Custom error message for rethrow
    });
  return response.data;
};
