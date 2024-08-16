import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { query } from "@/lib/db";
import { cookies } from "next/headers";


// POST /api/login
export const POST = async (request: Request) => {
  const requestBody = await request.json();

  console.log(process.env.JWT_SECRET, 'process.env.JWT_SECRET');

  const { username, password } = requestBody;
  try {
    const { rows } = await query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);
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
    return new NextResponse(JSON.stringify({ message: "Database error" }), {
      status: 500,
    });
  }
};
