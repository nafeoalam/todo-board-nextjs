import axios from "axios";
import { revalidatePath } from "next/cache";
import React from "react";

async function Dashboard() {
  const tickets = await fetch("/api/ticket");

  // async function addTicket(formData: FormData) {
  //   await fetch("/api/ticket", {
  //     method: "POST",
  //     body: JSON.stringify({ title: event.target.title.value }),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });

  //   revalidatePath("/");
  // }

  return (
    <div>
      <div className="grid grid-cols-6 gap-4">
        {tickets.map((ticket) => (
          <JokeCard key={joke.id} joke={joke.joke} />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
