import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { query } from "@/lib/db";
import { cookies } from "next/headers";

// POST /api/login
export const POST = async (request: Request) => {
  const requestBody = await request.json();

  const { username, password } = requestBody;
  if (!username || !password) {
    return new NextResponse(
      JSON.stringify({ message: "Username and password are required" }),
      { status: 400 }
    );
  }

  if (username.length < 3 || password.length < 4) {
    return new NextResponse(
      JSON.stringify({ message: "Invalid username or password" }),
      { status: 400 }
    );
  }

  if (!process.env.JWT_SECRET) {
    return new NextResponse(
      JSON.stringify({ message: "Server configuration error" }),
      { status: 500 }
    );
  }

  try {
    const { rows } = await query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);

    // throw error

    if (rows.length && (await bcrypt.compare(password, rows[0].password))) {
      const token = jwt.sign({ userId: rows[0].id }, process.env.JWT_SECRET!, {
        expiresIn: "1h",
      });
      cookies().set("token", token);
      return new NextResponse(JSON.stringify({ token }), {
        status: 200,
      });
    } else {
      return new NextResponse(
        JSON.stringify({ message: "Authentication failed" }),
        {
          status: 401,
        }
      );
    }
  } catch (error) {
    return new NextResponse(JSON.stringify(error), {
      status: 500,
    });
  }
};
