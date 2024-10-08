import React from "react";
import Board from "./Board";
import { getTickets } from "@/services/ticketService";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getErrorMessage, ITicket } from "@/lib/";

async function Dashboard() {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value ?? "";
  let tickets: ITicket[] = [];
  try {
    tickets = await getTickets(token);
  } catch (err) {
    const error = getErrorMessage(err);
    console.log(error, "Dashboard");
    redirect("/authentication");
  }

  return (
    <div>
      <Board allTickets={tickets} />
    </div>
  );
}

export default Dashboard;
