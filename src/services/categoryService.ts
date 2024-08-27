import { ICategory } from "@/lib/";
import axiosInstance from "../lib/axios";

// Fetch all categories
export const getCategories = async (): Promise<ICategory[]> => {
  const response = await axiosInstance
    .get<ICategory[]>("/categories")
    .catch((error) => {
      console.error("Error fetching categories:", error);
      throw new Error("Failed to fetch categories");
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
      console.error("Error creating category:", error);
      throw new Error("Failed to create category");
    });
  return response.data;
};

// Fetch a single category by ID
export const getCategoryById = async (id: number): Promise<ICategory> => {
  const response = await axiosInstance
    .get<ICategory>(`/categories/${id}`)
    .catch((error) => {
      console.error("Error fetching category by ID:", error);
      throw new Error("Failed to fetch category");
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
      console.error("Error updating category:", error);
      throw new Error("Failed to update category");
    });
  return response.data;
};
