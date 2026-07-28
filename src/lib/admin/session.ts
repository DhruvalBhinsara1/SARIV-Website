import { createHmac, timingSafeEqual } from "crypto";

export const SESSION_COOKIE = "sariv_admin_session";
const SESSION_TTL_MS = 12 * 60 * 60 * 1000; // 12 hours

function sign(payload: string): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) throw new Error("ADMIN_SESSION_SECRET is not set");
  return createHmac("sha256", secret).update(payload).digest("hex");
}

export function createSessionToken(): string {
  const payload = `admin.${Date.now() + SESSION_TTL_MS}`;
  return `${payload}.${sign(payload)}`;
}

export function verifySessionToken(token: string | undefined): boolean {
  if (!token) return false;

  const lastDot = token.lastIndexOf(".");
  if (lastDot === -1) return false;
  const payload = token.slice(0, lastDot);
  const signature = token.slice(lastDot + 1);

  let expected: string;
  try {
    expected = sign(payload);
  } catch {
    return false;
  }

  const signatureBuffer = Buffer.from(signature, "hex");
  const expectedBuffer = Buffer.from(expected, "hex");
  if (signatureBuffer.length !== expectedBuffer.length || !timingSafeEqual(signatureBuffer, expectedBuffer)) {
    return false;
  }

  const expiry = Number(payload.split(".")[1]);
  return Number.isFinite(expiry) && Date.now() < expiry;
}
