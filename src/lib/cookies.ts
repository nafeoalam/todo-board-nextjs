import { parse } from 'cookie';

export const getTokenFromCookies = (cookieHeader: string | undefined): string | undefined => {
  if (!cookieHeader) return undefined;
  const cookies = parse(cookieHeader);
  return cookies.token;
};