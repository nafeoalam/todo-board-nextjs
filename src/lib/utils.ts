interface Session {
  exp?: number; // Expiration time in seconds from epoch
}

export function checkSessionValidity(session: Session): boolean {
  const currentTime = Date.now();
  const sessionExpiry = session?.exp ? session?.exp * 1000 : 0; // Convert expiry to milliseconds
  return sessionExpiry > currentTime;
}
