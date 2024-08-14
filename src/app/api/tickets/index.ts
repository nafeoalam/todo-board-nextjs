import type { NextApiRequest, NextApiResponse } from "next";

// POST /api/tickets
async function createTicket(req: NextApiRequest, res: NextApiResponse) {
  // Create a ticket based on request body
}

// GET /api/tickets
async function listTickets(req: NextApiRequest, res: NextApiResponse) {
  // List all tickets
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      return listTickets(req, res);
    case "POST":
      return createTicket(req, res);
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
