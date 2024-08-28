import { query } from "@/lib/db";
import { NextResponse } from "next/server";

// GET /api/tickets/:id/history
export const GET = async (request: Request, context: { params: any }) => {
  try {
    const ticketId = context.params.id;

    if (!ticketId || isNaN(Number(ticketId))) {
      return new NextResponse('Invalid or missing "id" parameter', {
        status: 400,
      });
    }

    const result = await query(
      "SELECT * FROM event_logs WHERE ticket_id = $1;",
      [ticketId]
    );

    return new NextResponse(JSON.stringify(result.rows || []), {
      status: 200,
    });
  } catch (error: any) {
    if (error.message.includes("ECONNREFUSED")) {
      return new NextResponse("Database connection error", { status: 500 });
    }
    return new NextResponse(
      "Error in fetching a ticket history: " + error.message,
      {
        status: 500,
      }
    );
  }
};
