import { NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/auth";
import { logMiddleware } from "@/lib/middlewares/logMiddleware";
import { authMiddleware } from "@/lib/middlewares/authMiddleware";

export async function middleware(request: NextRequest) {
  if (request.url.includes("/api/")) {
    if (request.url.includes("/api/tickets")) {
      const logResult = logMiddleware(request);
      console.log(`Log: ${logResult.response}`);
    }

    const authResult = authMiddleware(request);
    if (!authResult?.isValid) {
      return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });
    }
    return
  } else {
    return await updateSession(request);
  }
}
