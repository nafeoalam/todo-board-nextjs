import { query } from "@/lib/db";
import { NextResponse } from "next/server";

// GET /api/tickets
export const GET = async () => {
  try {
    const result = await query("SELECT * FROM tickets;");

    if (!result.rows || result.rows.length === 0) {
      return new NextResponse("No tickets found", { status: 404 });
    }

    return new NextResponse(JSON.stringify(result.rows), {
      status: 200,
    });
  } catch (error: any) {
    if (error.message.includes("ECONNREFUSED")) {
      return new NextResponse("Database connection error", { status: 500 });
    }
    return new NextResponse("Error in fetching tickets: " + error.message, {
      status: 500,
    });
  }
};

// POST /api/tickets
export const POST = async (request: Request) => {
  try {
    const requestBody = await request.json();
    const { title, description, expiry_date, category_id } = requestBody;

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

    if (!category_id || typeof category_id !== "number") {
      return new NextResponse('Invalid or missing "category_id" field', {
        status: 400,
      });
    }

    const result = await query(
      "INSERT INTO tickets (title, description, expiry_date, category_id) VALUES ($1, $2, $3, $4) RETURNING *;",
      [title, description, expiry_date, category_id]
    );
    return new NextResponse(JSON.stringify(result.rows[0]), {
      status: 201,
    });
  } catch (error: any) {
    if (error.message.includes("ECONNREFUSED")) {
      return new NextResponse("Database connection error", { status: 500 });
    }
    return new NextResponse("Error in creating tickets: " + error.message, {
      status: 500,
    });
  }
};
