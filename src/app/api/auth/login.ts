// pages/api/auth/login.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { query } from '@/lib/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { username, password } = req.body;
    try {
      const { rows } = await query('SELECT * FROM users WHERE username = $1', [username]);
      if (rows.length && await bcrypt.compare(password, rows[0].password)) {
        const token = jwt.sign(
          { userId: rows[0].id },
          process.env.JWT_SECRET!,
          { expiresIn: '1h' }
        );
        res.status(200).json({ token });
      } else {
        res.status(401).json({ message: 'Authentication failed' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Database error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
