import { ITicket } from "@/lib/";
import React, { useState, useEffect, useContext } from "react";
import { useFormError } from "@/hooks/useFormError";
import { TicketContext } from "../TicketContext";

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
  const cTickets = useContext(TicketContext);

  const tempSavedTicket = cTickets?.ticketData.find(
    (tick) => tick.id === ticket.id
  );

  const [title, setTitle] = useState<string>(
    tempSavedTicket?.title || ticket.title
  );

  const [description, setDescription] = useState<string>(
    tempSavedTicket?.description || ticket.description
  );
  const [expiryDate, setExpiryDate] = useState<string>(
    tempSavedTicket?.expiry_date || ticket.expiry_date
  );

  const { error, setErrorMsg, clearError } = useFormError();

  useEffect(() => {
    // This effect handles either updating an existing ticket or adding a new one
    if (!cTickets?.ticketData || !ticket.id) return;

    const tickets = cTickets.ticketData;
    const existingTicketIndex = tickets.findIndex((t) => t.id === ticket.id);

    let updatedTickets;

    if (existingTicketIndex !== -1) {
      // Update existing ticket
      updatedTickets = tickets.map((t, index) =>
        index === existingTicketIndex
          ? { ...t, title, description, expiryDate }
          : t
      );
    } else {
      // Add new ticket if it doesn't exist
      updatedTickets = [
        ...tickets,
        { id: ticket.id, title, description, expiry_date: expiryDate },
      ];
    }

    cTickets.setTicketData(updatedTickets); // Update the context with new ticket data
  }, [title, description, expiryDate]);

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
      clearError();
      onClose();
    } catch (error) {
      setErrorMsg(error, "Error updating ticket: Please try again.");
      console.error("Error updating ticket:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full m-4">
        <span
          className="top-4 right-4 text-3xl cursor-pointer float-end"
          onClick={() => {
            onClose();
          }}
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
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default TicketEditModal;
