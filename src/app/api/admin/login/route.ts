import { NextResponse } from "next/server";
import { z } from "zod";
import { verifyPassword } from "@/lib/admin/password";
import { createSessionToken, SESSION_COOKIE } from "@/lib/admin/session";
import { isRateLimited, getClientKey } from "@/lib/rateLimit";

const loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export async function POST(req: Request) {
  if (await isRateLimited(`login:${getClientKey(req)}`, 10, 300)) {
    return NextResponse.json({ error: "Too many attempts, try again later" }, { status: 429 });
  }

  const body = await req.json();
  const result = loginSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({ error: "Username and password are required" }, { status: 400 });
  }

  const { username, password } = result.data;
  const validUsername = username === process.env.ADMIN_USERNAME;
  const validPassword =
    !!process.env.ADMIN_PASSWORD_HASH && verifyPassword(password, process.env.ADMIN_PASSWORD_HASH);

  if (!validUsername || !validPassword) {
    return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
  }

  const res = NextResponse.json({ success: true });
  res.cookies.set(SESSION_COOKIE, createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 12,
  });
  return res;
}
