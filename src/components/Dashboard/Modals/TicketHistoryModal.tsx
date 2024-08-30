import React, { useState, useEffect } from "react";
import { ITicketHistory } from "@/lib/";
import { getTicketHistoryById } from "@/services/ticketService";

interface Props {
  ticketId: string;
  isOpen: boolean;
  onClose: () => void;
}

const TicketHistoryModal: React.FC<Props> = ({ ticketId, isOpen, onClose }) => {
  const [history, setHistory] = useState<ITicketHistory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch ticket history on component mount or when ticketId changes
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const fetchedHistory = await getTicketHistoryById(ticketId);
        setHistory(fetchedHistory); // Assuming the API returns a single history object, adjust as necessary
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch ticket history:", error);
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchHistory();
    }
  }, [ticketId, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full m-4">
        <span
          className="top-4 right-4 text-3xl cursor-pointer float-end"
          onClick={onClose}
        >
          &times;
        </span>
        <h2 className="text-xl font-bold mb-6">Ticket History</h2>
        <div className="space-y-4 h-[500px] overflow-auto scroll-smooth">
          {loading ? (
            <p>Loading history...</p>
          ) : history.length > 0 ? (
            history.map((h) => (
              <div key={h.id} className="p-4 shadow rounded bg-gray-100 ">
                <p>{h.event_description}</p>
              </div>
            ))
          ) : (
            <p>No history found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TicketHistoryModal;
