// components/TicketCard.tsx
import React from "react";
import { ITicket } from ".";
import { formatDate } from "@/lib/utils";
interface TicketCardProps {
  ticket: ITicket;
  onDragStart: (e: React.DragEvent<HTMLDivElement>) => void;
}

const TicketCard: React.FC<TicketCardProps> = ({
  ticket,
  onDragStart,
}) => {
  const expiryText = formatDate(ticket.expiry_date);
  let expiryClass = "";

  if (expiryText === "Overdue") {
    expiryClass += "urgent";
  } else if (expiryText === "Today") {
    expiryClass += "yellow";
  } else if (expiryText === "1 day left") {
    expiryClass += "urgent";
  }

  return (
    <div className="ticket-card" draggable onDragStart={onDragStart}>
      <h3>{ticket.title}</h3>
      <p>{ticket.description}</p>
      <div className="meta">
        <span className={expiryClass}>{expiryText}</span>
        <span className="status">{ticket.status}</span>
      </div>
    </div>
  );
};

export default TicketCard;
