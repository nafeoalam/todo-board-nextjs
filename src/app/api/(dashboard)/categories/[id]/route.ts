import { query } from "@/lib/db";
import { NextResponse } from "next/server";

// GET /api/categories/:id
export const GET = async (request: Request, context: { params: any }) => {
  try {
    const categoryId = context.params.id;

    if (!categoryId || isNaN(Number(categoryId))) {
      return new NextResponse('Invalid or missing "id" parameter', { status: 400 });
    }
    
    const result = await query("SELECT * FROM categories WHERE id = $1;", [
      categoryId,
    ]);
    if (result.rows.length > 0) {
      return new NextResponse(JSON.stringify(result.rows[0]), {
        status: 200,
      });
    } else {
      return new NextResponse(
        JSON.stringify({ message: "Category not found" }),
        {
          status: 404,
        }
      );
    }
  } catch (error: any) {
    if (error.message.includes("ECONNREFUSED")) {
      return new NextResponse("Database connection error", { status: 500 });
    }
    return new NextResponse("Error in fetching category: " + error.message, {
      status: 500,
    });
  }
};
