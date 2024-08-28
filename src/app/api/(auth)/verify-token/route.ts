import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// POST /api/verify-token
export const POST = async (request: Request) => {
  const requestBody = await request.json();
  const { token } = requestBody;

  const secret = process.env.JWT_SECRET;

  try {
    if (secret) {
      jwt.verify(token, secret);
      return new NextResponse(JSON.stringify({ valid: true }), { status: 200 });
    } else
      return new NextResponse(
        JSON.stringify({ valid: false, error: "Invalid token" }),
        { status: 401 }
      );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ valid: false, error: "Invalid token" }),
      { status: 401 }
    );
  }
};
