"use client";

import { useState } from "react";
import { Mark } from "@/components/Mark";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");
      window.location.href = "/admin";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
      setLoading(false);
    }
  }

  return (
    <main className="min-h-[100dvh] flex items-center justify-center bg-background px-6">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
            <Mark className="w-5 h-5 text-surface" />
          </div>
          <h1 className="font-display text-2xl text-primary">SARIV Admin</h1>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 border border-border rounded-2xl p-8 bg-surface">
          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="text-sm font-medium text-primary">
              Username
            </label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-sm font-medium text-primary">
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>
          {error && <p className="text-error text-sm">{error}</p>}
          <Button type="submit" disabled={loading || !username || !password} className="mt-2">
            {loading ? "Signing in…" : "Sign In"}
          </Button>
        </form>
      </div>
    </main>
  );
}
