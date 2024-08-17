// components/TicketEditModal.tsx
import React, { useState, useEffect } from "react";
import { ITicket } from ".";

interface TicketEditModalProps {
  ticket: ITicket;
  isOpen: boolean;
  onClose: () => void;
  onSave: (ticket: ITicket) => void;
}

const TicketEditModal: React.FC<TicketEditModalProps> = ({
  ticket,
  isOpen,
  onClose,
  onSave,
}) => {
  const [title, setTitle] = useState<string>(ticket.title);
  const [description, setDescription] = useState<string>(ticket.description);
  const [expiryDate, setExpiryDate] = useState<string>(ticket.expiry_date);

  useEffect(() => {
    if (ticket) {
      setTitle(ticket.title);
      setDescription(ticket.description);
      setExpiryDate(ticket.expiry_date);
    }
  }, [ticket, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedTicket: ITicket = {
      ...ticket,
      title,
      description,
      expiry_date: expiryDate,
    };
    try {
      await onSave(updatedTicket);
      onClose();
    } catch (error) {
      console.error("Error updating ticket:", error);
    }
  };

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
        <h2 className="text-xl font-bold mb-6">Edit Ticket</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
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
              value={expiryDate.split("T")[0]}
              onChange={(e) => setExpiryDate(e.target.value)}
              required
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Update Ticket
          </button>
        </form>
      </div>
    </div>
  );
};

export default TicketEditModal;
