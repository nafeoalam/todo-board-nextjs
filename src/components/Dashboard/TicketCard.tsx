import React from "react";
import { formatDate } from "@/lib/";
import { ITicket } from "@/lib/";
interface TicketCardProps {
  ticket: ITicket;
  onDragStart: (e: React.DragEvent<HTMLDivElement>) => void;
  onEdit: () => void;
}

const TicketCard: React.FC<TicketCardProps> = ({
  ticket,
  onDragStart,
  onEdit,
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
    <div
      className="ticket-card p-4 border border-gray-300 rounded shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white"
      draggable
      onDragStart={onDragStart}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">{ticket.title}</h3>
        <button
          onClick={onEdit}
          className="bg-blue-500 hover:bg-blue-600 text-white text-xs font-bold py-2 px-4 rounded"
        >
          Edit
        </button>
      </div>
      <p>{ticket.description}</p>
      <div className="flex justify-between items-center mt-4">
        <span className={`expiry-date ${expiryClass} text-sm font-medium`}>
          {expiryText}
        </span>
        <span
          className={`status bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs`}
        >
          {ticket.status}
        </span>
      </div>
    </div>
  );
};

export default TicketCard;
