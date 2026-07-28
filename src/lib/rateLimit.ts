import { sql } from "@/lib/db/client";

const DEFAULT_WINDOW_SECONDS = 60;
const DEFAULT_MAX_REQUESTS = 10;

// Fixed-window limiter backed by Postgres — serverless functions are
// stateless per-instance, so an in-memory counter wouldn't be shared.
export async function isRateLimited(
  key: string,
  limit = DEFAULT_MAX_REQUESTS,
  windowSeconds = DEFAULT_WINDOW_SECONDS
): Promise<boolean> {
  const { rows } = await sql`
    insert into rate_limits (key, count, window_start)
    values (${key}, 1, now())
    on conflict (key) do update set
      count = case
        when rate_limits.window_start < now() - make_interval(secs => ${windowSeconds})
          then 1
        else rate_limits.count + 1
      end,
      window_start = case
        when rate_limits.window_start < now() - make_interval(secs => ${windowSeconds})
          then now()
        else rate_limits.window_start
      end
    returning count
  `;
  return rows[0].count > limit;
}

export function getClientKey(req: Request): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}
