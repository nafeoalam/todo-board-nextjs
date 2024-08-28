import { ITicket } from "@/lib";
import React, { createContext, useState, ReactNode } from "react";

interface ITicketForEdit extends Omit<ITicket, "category_id" | "status"> {
  category_id?: number;
  status?: string;
}

export interface TicketContextType {
  ticketData: ITicketForEdit[];
  setTicketData: (data: ITicketForEdit[]) => void;
}

export const TicketContext = createContext<TicketContextType | null>(null);

interface TicketProviderProps {
  children: ReactNode;
}

export const TicketProvider: React.FC<TicketProviderProps> = ({ children }) => {
  const [ticketData, setTicketData] = useState<ITicketForEdit[]>([]);

  return (
    <TicketContext.Provider value={{ ticketData, setTicketData }}>
      {children}
    </TicketContext.Provider>
  );
};
