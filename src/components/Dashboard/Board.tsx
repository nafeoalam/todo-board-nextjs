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

  const handleTicketUpdate = async (updatedTicket: ITicket) => {
    try {
      // Optimistically update the UI
      setTickets((prevTickets) =>
        prevTickets.map((ticket) =>
          ticket.id === updatedTicket.id ? updatedTicket : ticket
        )
      );

      // Update the server and get the updated data back
      const updatedTicketFromServer = await updateTicket(
        updatedTicket.id,
        updatedTicket
      );

      // Confirm the update locally with server-approved data
      setTickets((prevTickets) =>
        prevTickets.map((ticket) =>
          ticket.id === updatedTicketFromServer.id
            ? updatedTicketFromServer
            : ticket
        )
      );
    } catch (error) {
      console.error("Error updating ticket:", error);
      // Optionally revert the UI changes if the server update fails
      setTickets((prevTickets) =>
        prevTickets.map((ticket) =>
          ticket.id === updatedTicket.id ? { ...ticket } : updatedTicket
        )
      );
    }
  };

  const handleAddTicket = async (status: string) => {
    const newTicket: ITicket = {
      id: `${Date.now()}`, // Temporary ID; real ID should come from the server
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

  function handleDragStart(
    e: React.DragEvent<HTMLDivElement>,
    ticket: ITicket
  ) {
    e.dataTransfer.setData("ticketId", ticket.id);
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>, newCategory: string) {
    // e.preventDefault();
    // const ticketId = e.dataTransfer.getData("ticketId");
    // const ticket = tickets.find((t) => t.id === ticketId);
    // if (ticket && ticket.category !== newCategory) {
    //   handleTicketUpdate({ ...ticket, cate: newCategory });
    // }
  }


  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
  }


  const statuses = ["Open", "In Progress", "Code Review", "Resolved"];

  return (
    <div className="board">
      {statuses.map((status) => (
        <div key={status} className="column">
          <h2>{status}</h2>
          <button onClick={() => handleAddTicket(status)}>Add</button>
          <div
            className="column-content"
            onDrop={(e) => handleDrop(e, status)}
            onDragOver={handleDragOver}
          >
            {tickets
              .filter((ticket) => ticket.status === status)
              .map((ticket) => (
                <TicketCard
                  key={ticket.id}
                  ticket={ticket}
                  onDragStart={(e) => handleDragStart(e, ticket)}
                />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Board;
