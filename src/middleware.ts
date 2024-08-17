import { NextRequest, NextResponse } from "next/server";
import { tokenVerification } from "./lib/middlewares/tokenVerification";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // Exclude /api/login and /api/register from middleware
  if (
    pathname.startsWith("/api/login") ||
    pathname.startsWith("/api/register")
  ) {
    return NextResponse.next();
  }

  // Check for authorization token in headers
  const token = request.headers.get("cookie")?.split("=")[1] || "";

  if (pathname.startsWith("/authentication")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // If no token is found, redirect to login page
  if (!token) {
    return NextResponse.redirect(new URL("/authentication", request.url));
  }

  try {
    const isTokenValid = await tokenVerification(token);

    if (isTokenValid) {
      // Allow the request to proceed if the token is valid
      if (pathname.startsWith("/authentication")) {
        return NextResponse.redirect(new URL("/", request.url));
      }
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/authentication", request.url));
    }
  } catch (error) {
    console.log(error);
    // If token verification fails, redirect to login page
    return NextResponse.redirect(new URL("/authentication", request.url));
  }
}

// Specify the paths where the middleware should run
export const config = {
  matcher: ["/api/:path*", "/dashboard/:path*"],
};
