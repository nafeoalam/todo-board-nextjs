import React from "react";
import Board from "./Board";
import { getTickets } from "@/services/ticketService";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export interface ITicket {
  id?: number;
  title: string;
  description: string;
  expiry_date: string;
  category_id: number;
  status: string;
}

async function Dashboard() {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value ?? "";
  let tickets: ITicket[] = [];
  try {
    tickets = await getTickets(token);
  } catch (err) {
    redirect('/authentication')
  }

  return (
    <div>
      <Board allTickets={tickets} />
    </div>
  );
}

export default Dashboard;
