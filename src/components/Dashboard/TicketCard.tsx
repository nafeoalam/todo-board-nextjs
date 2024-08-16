// components/TicketCard.tsx
import React from "react";
import { ITicket } from ".";

interface TicketCardProps {
  ticket: ITicket;
  onDragStart: (e: React.DragEvent<HTMLDivElement>) => void;
}

const TicketCard: React.FC<TicketCardProps> = ({ ticket, onDragStart }) => {
  return (
    <div className="ticket-card" draggable onDragStart={onDragStart}>
      <h3>{ticket.title}</h3>
      <p>{ticket.description}</p>
      <div className="meta">
        <span className="expiry-date">{ticket.expiry_date}</span>
        <span className="status">{ticket.status}</span>
      </div>
    </div>
  );
};

export default TicketCard;
