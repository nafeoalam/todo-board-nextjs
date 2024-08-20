"use client";
import React, { useState } from "react";
import { ICategory, createCategory } from "@/services/categoryService";

const Category: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [message, setMessage] = useState<string>(""); 
  const [isError, setIsError] = useState<boolean>(false); 

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const newCategory: ICategory = { name, description };
    setMessage(""); 
    setIsError(false);

    try {
      const createdCategory = await createCategory(newCategory);
      console.log("Category created successfully:", createdCategory);
      setMessage("Category created successfully!");
      // Optionally reset the form
      setName("");
      setDescription("");
    } catch (error) {
      console.error("Error creating category:", error);
      setMessage("Error creating category. Please try again.");
      setIsError(true); 
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h2 className="text-lg font-semibold mb-4">Create New Category</h2>
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />

        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 mt-4"
        >
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />

        <button
          type="submit"
          className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Create Category
        </button>

        <div
          className={`mt-4 text-sm font-semibold ${
            isError ? "text-red-500" : "text-green-500"
          }`}
        >
          {message}
        </div>
      </form>
    </div>
  );
};

export default Category;
