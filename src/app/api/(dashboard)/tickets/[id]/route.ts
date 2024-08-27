import { query } from "@/lib/";
import { NextResponse } from "next/server";

// GET /api/tickets/:id
export const GET = async (request: Request, context: { params: any }) => {
  try {
    const ticketId = context.params.id;

    if (!ticketId || isNaN(Number(ticketId))) {
      return new NextResponse('Invalid or missing "id" parameter', {
        status: 400,
      });
    }

    const result = await query("SELECT * FROM tickets WHERE id = $1;", [
      ticketId,
    ]);
    if (result.rows.length > 0) {
      return new NextResponse(JSON.stringify(result.rows[0]), {
        status: 200,
      });
    } else {
      return new NextResponse(JSON.stringify({ message: "Ticket not found" }), {
        status: 404,
      });
    }
  } catch (error: any) {
    if (error.message.includes("ECONNREFUSED")) {
      return new NextResponse("Database connection error", { status: 500 });
    }
    return new NextResponse("Error in fetching a ticket: " + error.message, {
      status: 500,
    });
  }
};

// PUT /api/tickets/:id
export const PUT = async (request: Request, context: { params: any }) => {
  try {
    const ticketId = context.params.id; // Ensure this matches how you define the parameter in your route

    if (!ticketId || isNaN(Number(ticketId))) {
      return new NextResponse('Invalid or missing "id" parameter', {
        status: 400,
      });
    }

    const body = await request.json();
    const { title, description, expiry_date, status } = body;

    if (!title || typeof title !== "string") {
      return new NextResponse('Invalid or missing "title" field', {
        status: 400,
      });
    }

    if (!description || typeof description !== "string") {
      return new NextResponse('Invalid or missing "description" field', {
        status: 400,
      });
    }

    if (!expiry_date || isNaN(Date.parse(expiry_date))) {
      return new NextResponse('Invalid or missing "expiry_date" field', {
        status: 400,
      });
    }

    if (!status || typeof status !== "string") {
      return new NextResponse('Invalid or missing "status" field', {
        status: 400,
      });
    }

    const result = await query(
      "UPDATE tickets SET title = $1, description = $2, expiry_date = $3, status = $4 WHERE id = $5 RETURNING *;",
      [title, description, expiry_date, status, ticketId]
    );

    if (result.rows.length > 0) {
      return new NextResponse(JSON.stringify(result.rows[0]), {
        status: 200,
      });
    } else {
      return new NextResponse(
        JSON.stringify({ message: "Ticket not updated, ID may not exist" }),
        {
          status: 404,
        }
      );
    }
  } catch (error: any) {
    if (error.message.includes("ECONNREFUSED")) {
      return new NextResponse("Database connection error", { status: 500 });
    }
    return new NextResponse("Error in updating a ticket: " + error.message, {
      status: 500,
    });
  }
};
