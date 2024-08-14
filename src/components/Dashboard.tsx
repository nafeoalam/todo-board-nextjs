import React from "react";

async function Dashboard() {
  const getTickets = await fetch('/api/ticket')

  return (
    <div>Dashboard</div>
  )
}

export default Dashboard