// pages/api/auth/register.ts
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import { query } from "@/lib/db";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const result = await query(
        "INSERT INTO users(username, password) VALUES($1, $2) RETURNING *;",
        [username, hashedPassword]
      );
      res.status(201).json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ message: "Database error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
