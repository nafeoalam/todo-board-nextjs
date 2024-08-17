"use client";
import React, { useState } from "react";
import { ITicket } from ".";
import { createTicket, updateTicket } from "@/services/ticketService";
import TicketCard from "./TicketCard";
import TicketAddModal from "./TicketAddModal";
import TicketEditModal from "./TicketEditModal";

const statuses = ["Open", "In Progress", "Resolved", "Closed"];
interface BoardPros {
  allTickets: ITicket[];
}

function Board({ allTickets }: Readonly<BoardPros>) {
  const [tickets, setTickets] = useState<ITicket[]>(allTickets);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [editingTicket, setEditingTicket] = useState<ITicket | null>(null);

  // Function to handle ticket updates
  const handleTicketDrag = async (ticketId: string, newStatus: string) => {
    const originalTicket = tickets.find(
      (ticket) => ticket.id === Number(ticketId)
    );
    if (!originalTicket || originalTicket.status === newStatus) return;

    const updatedTicket = { ...originalTicket, status: newStatus };

    console.log({ updatedTicket });
    try {
      const serverUpdatedTicket = await updateTicket(ticketId, updatedTicket);
      setTickets((prev) =>
        prev.map((ticket) =>
          ticket.id === Number(ticketId) ? serverUpdatedTicket : ticket
        )
      );
    } catch (error) {
      console.error("Error updating ticket:", error);
    }
  };

  const handleAddTicket = async (ticketData: {
    title: string;
    description: string;
    expiry_date: string;
    category_id: number;
  }) => {
    setIsModalOpen(false); // Close modal upon submission
    try {
      const createdTicket = await createTicket({
        ...ticketData,
        status: "Open",
      });
      setTickets((prevTickets) => [...prevTickets, createdTicket]);
    } catch (error) {
      console.error("Error adding new ticket:", error);
    }
  };

  // Drag and drop handlers
  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    ticketId: string
  ) => {
    e.dataTransfer.setData("ticketId", ticketId);
  };

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    newStatus: string
  ) => {
    e.preventDefault();
    const ticketId = e.dataTransfer.getData("ticketId");
    handleTicketDrag(ticketId, newStatus);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleEditTicket = (ticket: ITicket) => {
    setEditingTicket(ticket);
    setIsEditModalOpen(true); // Assuming you are reusing the modal open state
  };

  const handleTicketUpdate = async (updatedTicket: ITicket) => {
    try {
      // Call the update API service
      const serverUpdatedTicket = await updateTicket(
        String(updatedTicket.id),
        updatedTicket
      );
      // Update the local state to reflect the updated ticket information
      setTickets((prevTickets) =>
        prevTickets.map((ticket) =>
          ticket.id === serverUpdatedTicket.id ? serverUpdatedTicket : ticket
        )
      );
      setIsEditModalOpen(false); // Optionally close the modal after update
    } catch (error) {
      console.error("Error updating ticket:", error);
      // Optionally handle errors, e.g., show a message to the user
    }
  };

  

  return (
    <div className="board">
      <TicketAddModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddTicket}
      />

      {isEditModalOpen && editingTicket && (
        <TicketEditModal
          ticket={editingTicket}
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleTicketUpdate}
        />
      )}

      {statuses.map((status) => (
        <div
          key={status}
          className="column"
          onDrop={(e) => handleDrop(e, status)}
          onDragOver={handleDragOver}
        >
          {status === "Open" && (
            <button className="float-right" onClick={() => setIsModalOpen(true)}>
              +
            </button>
          )}
          <h2>{status}</h2>

          <div className="column-content">
            {tickets
              .filter((ticket) => ticket.status === status)
              .map((ticket) => (
                <TicketCard
                  key={ticket.id}
                  ticket={ticket}
                  onDragStart={(e) => handleDragStart(e, String(ticket.id))}
                  onEdit={() => handleEditTicket(ticket)}
                />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Board;
