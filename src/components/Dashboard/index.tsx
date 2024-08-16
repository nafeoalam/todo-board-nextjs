import React from "react";
import Board from "./Board";
import { getTickets } from "@/services/ticketService";
import { cookies } from "next/headers";

export interface ITicket {
  id: string;
  title: string;
  description: string;
  expiry_date: string;
  category_id: number;
  status: string;
}

async function Dashboard() {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value ?? "";
  const tickets = await getTickets(token);

  return (
    <div>
      <Board allTickets={tickets} />
    </div>
  );
}

export default Dashboard;
