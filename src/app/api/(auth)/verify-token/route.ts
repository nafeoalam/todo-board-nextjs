import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// POST /api/verify-token
export const POST = async (request: Request) => {
  const requestBody = await request.json();
  const { token } = requestBody;

  const secret = process.env.JWT_SECRET || "55555";

  try {
    jwt.verify(token, secret);
    return new NextResponse(JSON.stringify({ valid: true }), { status: 200 });
  } catch (error) {
    console.error("Token verification failed:", error);
    return new NextResponse(
      JSON.stringify({ valid: false, error: "Invalid token" }),
      { status: 401 }
    );
  }
};
