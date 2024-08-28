import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { query } from "@/lib/db";

// POST /api/register
export const POST = async (request: Request) => {
  const { username, password } = await request.json();

  if (!username || !password) {
    return new NextResponse(
      JSON.stringify({ message: "Username and password are required" }),
      { status: 400 }
    );
  }

  if (username.length < 3 || password.length < 6) {
    return new NextResponse(
      JSON.stringify({ message: "Invalid username or password" }),
      { status: 400 }
    );
  }

  try {
    const { rows: existingUsers } = await query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );

    if (existingUsers.length) {
      return new NextResponse(
        JSON.stringify({ message: "Username already taken" }),
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const { rows } = await query(
      "INSERT INTO users(username, password) VALUES($1, $2) RETURNING *;",
      [username, hashedPassword]
    );

    if (rows.length) {
      const user = rows[0];
      return new NextResponse(JSON.stringify(user), {
        status: 201,
      });
    } else {
      return new NextResponse(
        JSON.stringify({ message: "User registration failed" }),
        {
          status: 400,
        }
      );
    }
  } catch (error) {
    // console.log(error);
    return new NextResponse(JSON.stringify({ message: "Database error" }), {
      status: 500,
    });
  }
};
