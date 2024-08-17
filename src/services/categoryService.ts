// services/categoryService.ts
import axiosInstance from "../lib/axios";

export interface ICategory {
  id?: number;
  name: string;
  description: string;
}

// Fetch all categories
export const getCategories = async (): Promise<ICategory[]> => {
  try {
    const response = await axiosInstance.get<ICategory[]>("/categories");
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch categories");
  }
};

// Create a new category
export const createCategory = async (categoryData: ICategory): Promise<ICategory> => {
  try {
    const response = await axiosInstance.post<ICategory>("/categories", categoryData);
    return response.data;
  } catch (error) {
    throw new Error("Failed to create category");
  }
};

// Fetch a single category by ID
export const getCategoryById = async (id: number): Promise<ICategory> => {
  try {
    const response = await axiosInstance.get<ICategory>(`/categories/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch category");
  }
};

// Update an existing category
export const updateCategory = async (id: number, categoryData: ICategory): Promise<ICategory> => {
  try {
    const response = await axiosInstance.put<ICategory>(`/categories/${id}`, categoryData);
    return response.data;
  } catch (error) {
    throw new Error("Failed to update category");
  }
};
