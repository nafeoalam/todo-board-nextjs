const validate = (token: string) => {
  const validToken = token === process.env.API_SECRET;
  if (!validToken || !token) {
    return false;
  }
  return true;
};

export function authMiddleware(req: Request): any {
  const token = req.headers.get("authorization")?.split(" ")[1] || "";
  console.log("authMiddleware");
  return { isValid: validate(token) };
}
