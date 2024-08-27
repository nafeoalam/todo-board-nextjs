import { query } from "@/lib/";
import { NextResponse } from "next/server";

// GET /api/categories
export const GET = async (request: Request) => {
  try {
    const result = await query("SELECT * FROM categories;");
    if (!result.rows || result.rows.length === 0) {
      return new NextResponse('No categories found', { status: 404 });
    }
    return new NextResponse(JSON.stringify(result.rows), {
      status: 200,
    });
  } catch (error: any) {
    return new NextResponse("Error in fetching categories" + error.message, {
      status: 500,
    });
  }
};

// POST /api/categories
export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const { name, description } = body;

    if (!name || typeof name !== 'string') {
      return new NextResponse('Invalid or missing "name" field', { status: 400 });
    }

    if (!description || typeof description !== 'string') {
      return new NextResponse('Invalid or missing "description" field', { status: 400 });
    }
    
    const result = await query(
      "INSERT INTO categories (name, description) VALUES ($1, $2) RETURNING *;",
      [name, description]
    );
    return new NextResponse(JSON.stringify(result.rows[0]), {
      status: 201,
    });
  } catch (error: any) {
    return new NextResponse("Error in creating category" + error.message, {
      status: 500,
    });
  }
};
