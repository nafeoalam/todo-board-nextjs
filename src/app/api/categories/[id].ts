import type { NextApiRequest, NextApiResponse } from "next";

// GET /api/categories/:id
async function getCategory(req: NextApiRequest, res: NextApiResponse) {
  // Retrieve a specific category
}

// PUT /api/categories/:id
async function updateCategory(req: NextApiRequest, res: NextApiResponse) {
  // Update a specific category
}

// DELETE /api/categories/:id
async function deleteCategory(req: NextApiRequest, res: NextApiResponse) {
  // Delete a specific category
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      return getCategory(req, res);
    case "PUT":
      return updateCategory(req, res);
    case "DELETE":
      return deleteCategory(req, res);
    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
