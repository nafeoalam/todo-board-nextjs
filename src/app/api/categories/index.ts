import type { NextApiRequest, NextApiResponse } from "next";

// POST /api/categories
async function createCategory(req: NextApiRequest, res: NextApiResponse) {
  // Create a category based on request body
}

// GET /api/categories
async function listCategories(req: NextApiRequest, res: NextApiResponse) {
  // List all categories
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      return listCategories(req, res);
    case "POST":
      return createCategory(req, res);
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
