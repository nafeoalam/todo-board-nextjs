import { ICategory } from "@/lib/";
import axiosInstance from "../lib/axios";

// Fetch all categories
export const getCategories = async (): Promise<ICategory[]> => {
  const response = await axiosInstance
    .get<ICategory[]>("/categories")
    .catch((error) => {
      throw error;
    });
  return response.data;
};

// Create a new category
export const createCategory = async (
  categoryData: ICategory
): Promise<ICategory> => {
  const response = await axiosInstance
    .post<ICategory>("/categories", categoryData)
    .catch((error) => {
      throw error;
    });
  return response.data;
};

// Fetch a single category by ID
export const getCategoryById = async (id: number): Promise<ICategory> => {
  const response = await axiosInstance
    .get<ICategory>(`/categories/${id}`)
    .catch((error) => {
      throw error;
    });
  return response.data;
};

// Update an existing category
export const updateCategory = async (
  id: number,
  categoryData: ICategory
): Promise<ICategory> => {
  const response = await axiosInstance
    .put<ICategory>(`/categories/${id}`, categoryData)
    .catch((error) => {
      throw error;
    });
  return response.data;
};
