"use client";
import React, { useState } from "react";
import { ITicket } from ".";
import { createTicket, updateTicket } from "@/services/ticketService";
import TicketCard from "./TicketCard";

interface BoardPros {
  allTickets: ITicket[];
}

function Board({ allTickets }: Readonly<BoardPros>) {
  const [tickets, setTickets] = useState<ITicket[]>(allTickets);

  // Function to handle ticket updates
  const handleTicketUpdate = async (ticketId: string, newStatus: string) => {

    const originalTicket = tickets.find((ticket) => ticket.id === Number(ticketId));
    if (!originalTicket || originalTicket.status === newStatus) return;


    const updatedTicket = { ...originalTicket, status: newStatus };

    console.log({updatedTicket});
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

  const handleAddTicket = async (status: string) => {
    const newTicket: ITicket = {
      title: "New Ticket",
      description: "Enter description...",
      expiry_date: new Date().toISOString().split("T")[0], // Set today's date as default
      status: status,
      category_id: 1,
    };

    try {
      const createdTicket = await createTicket(newTicket);
      // Update local state with the ticket returned from the server
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
    handleTicketUpdate(ticketId, newStatus);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const statuses = ["Open", "In Progress", "Resolved", "Closed"];

  return (
    <div className="board">
      {statuses.map((status) => (
        <div
          key={status}
          className="column"
          onDrop={(e) => handleDrop(e, status)}
          onDragOver={handleDragOver}
        >
          <h2>{status}</h2>
          {status === "Open" && (
            <button onClick={() => handleAddTicket(status)}>Add</button>
          )}
          <div className="column-content">
            {tickets
              .filter((ticket) => ticket.status === status)
              .map((ticket) => (
                <TicketCard
                  key={ticket.id}
                  ticket={ticket}
                  onDragStart={(e) => handleDragStart(e, String(ticket.id))}
                />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Board;
