import { SignJWT, jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const secretKey = process.env.SESSION_SECRET;
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30s") // Set to expire in 30 seconds
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  try {
    const { payload } = await jwtVerify(input, key, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    cookies().set("session", "", { expires: new Date(0) });
  }
}

export async function login(formData: FormData) {
  const user = { email: formData.get("email"), name: "John" };
  const expires = new Date(Date.now() + 30 * 1000); // 30 seconds from now
  const session = await encrypt({ user, expires });

  cookies().set("session", session, { expires, httpOnly: true });
}

export async function logout() {
  cookies().set("session", "", { expires: new Date(0) });
}

export async function getSession() {
  const session = cookies().get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
  const sessionToken = request.cookies.get("session")?.value;
  if (!sessionToken) return NextResponse.next();

  try {
    const sessionData = await decrypt(sessionToken);
    sessionData.exp = Math.floor(Date.now() / 1000) + 30; // Update to expire in 30 seconds

    const updatedSessionToken = await encrypt(sessionData);
    const response = NextResponse.next();
    response.cookies.set("session", updatedSessionToken, {
      httpOnly: true,
      path: "/",
      expires: new Date(sessionData.exp * 1000),
      sameSite: "strict",
    });

    return response;
  } catch (error) {
    cookies().set("session", "", { expires: new Date(0) });
  }
}
