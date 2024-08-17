// components/TicketFormModal.tsx
import { getCategories, ICategory } from "@/services/categoryService";
import React, { useState, useEffect } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (ticketData: {
    title: string;
    description: string;
    expiry_date: string;
    category_id: number;
  }) => void;
}

const TicketFormModal: React.FC<Props> = ({ isOpen, onClose, onSubmit }) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [expiry_date, setExpiryDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number>();

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await getCategories();
        setCategories(fetchedCategories);
        setSelectedCategory(fetchedCategories[0]?.id);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    if (isOpen) {
      fetchCategories();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full m-4">
        <span
          className="top-4 right-4 text-3xl cursor-pointer float-end"
          onClick={onClose}
        >
          &times;
        </span>
        <h2 className="text-xl font-bold mb-6">New Ticket</h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit({
              title,
              description,
              expiry_date,
              category_id: selectedCategory!,
            });
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Title:
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Description:
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="mt-1 p-2 w-full border rounded-md h-32"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Expiry Date:
            </label>
            <input
              type="date"
              value={expiry_date}
              onChange={(e) => setExpiryDate(e.target.value)}
              required
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Category:
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(Number(e.target.value))}
              required
              className="mt-1 p-2 w-full border rounded-md"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Create Ticket
          </button>
        </form>
      </div>
    </div>
  );
};

export default TicketFormModal;
