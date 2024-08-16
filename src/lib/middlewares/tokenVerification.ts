export async function tokenVerification(token: string) {
  // Verify the token
  const secret = new TextEncoder().encode(process.env.JWT_SECRET || "55555");

  const key = await crypto.subtle.importKey(
    "raw",
    secret,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["verify"]
  );

  const [header, payload, signature] = token.split(".");
  const data = `${header}.${payload}`;
  const signatureBuffer = new Uint8Array(
    atob(signature)
      .split("")
      .map((char) => char.charCodeAt(0))
  );

  const isValid = await crypto.subtle.verify(
    "HMAC",
    key,
    signatureBuffer,
    new TextEncoder().encode(data)
  );

  return isValid;
}
