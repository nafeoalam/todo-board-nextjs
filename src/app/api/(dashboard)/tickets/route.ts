import { query } from "@/lib/db";
import { NextResponse } from "next/server";

// GET /api/tickets
export const GET = async () => {
  try {
    const result = await query("SELECT * FROM tickets;");
    return new NextResponse(JSON.stringify(result.rows), {
      status: 200,
    });
  } catch (error: any) {
    return new NextResponse("Error in fetching blogs" + error.message, {
      status: 500,
    });
  }
};

// POST /api/tickets
export const POST = async (request: Request) => {
  try {
    const requestBody = await request.json();
    const { title, description, expiry_date, category_id } = requestBody;

    const result = await query(
      "INSERT INTO tickets (title, description, expiry_date, category_id) VALUES ($1, $2, $3, $4) RETURNING *;",
      [title, description, expiry_date, category_id]
    );
    return new NextResponse(JSON.stringify(result.rows[0]), {
      status: 200,
    });
  } catch (error: any) {
    return new NextResponse("Error in creating tickets" + error.message, {
      status: 500,
    });
  }
};