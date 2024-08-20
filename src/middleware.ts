import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check for authorization token in headers
  const token = request.headers.get("cookie")?.split("=")[1] || "";

  // If no token is found, redirect to login page
  if (!token) {
    return NextResponse.redirect(new URL("/authentication", request.url));
  }

  try {
    const response = await fetch(
      new URL("/api/verify-token", request.url).toString(),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      }
    );

    const data = await response.json();

    if (data?.valid) {
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
  matcher: ["/api/categories/:path*", "/api/tickets/:path*"],
};
