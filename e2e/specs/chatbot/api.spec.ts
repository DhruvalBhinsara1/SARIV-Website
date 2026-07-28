import { test, expect } from "@playwright/test";

test.describe("Chatbot API", () => {
  test("POST /api/chat rejects an empty message", async ({ request }) => {
    const res = await request.post("/api/chat", { data: { message: "" } });
    expect(res.status()).toBe(400);
    const body = await res.json();
    expect(body.error).toBe("Validation failed");
  });

  test("POST /api/chat rejects a missing message", async ({ request }) => {
    const res = await request.post("/api/chat", { data: {} });
    expect(res.status()).toBe(400);
  });

  test("POST /api/admin/reindex rejects unauthenticated requests", async ({ request }) => {
    const res = await request.post("/api/admin/reindex");
    expect(res.status()).toBe(401);
  });

  test("POST /api/admin/debug-retrieval rejects unauthenticated requests", async ({ request }) => {
    const res = await request.post("/api/admin/debug-retrieval", { data: { query: "test" } });
    expect(res.status()).toBe(401);
  });

  test("GET /api/admin/conversations rejects unauthenticated requests", async ({ request }) => {
    const res = await request.get("/api/admin/conversations");
    expect(res.status()).toBe(401);
  });

  test("GET /api/admin/conversations/[id] rejects unauthenticated requests", async ({ request }) => {
    const res = await request.get("/api/admin/conversations/00000000-0000-0000-0000-000000000000");
    expect(res.status()).toBe(401);
  });

  test("GET /api/admin/usage rejects unauthenticated requests", async ({ request }) => {
    const res = await request.get("/api/admin/usage");
    expect(res.status()).toBe(401);
  });

  test("Chatbot launcher opens the panel and accepts input", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /open chat with the sariv assistant/i }).click();

    const textbox = page.getByRole("textbox", { name: "Message" });
    await expect(textbox).toBeVisible();
    await textbox.fill("Hello");
    await page.getByRole("button", { name: "Send message" }).click();

    await expect(page.getByText("Hello", { exact: true })).toBeVisible();
  });

  test("POST /api/admin/login rejects wrong credentials", async ({ request }) => {
    const res = await request.post("/api/admin/login", {
      data: { username: "wrong", password: "wrong" },
    });
    expect(res.status()).toBe(401);
  });

  test("POST /api/admin/login rejects a missing password", async ({ request }) => {
    const res = await request.post("/api/admin/login", { data: { username: "SarivAdmin" } });
    expect(res.status()).toBe(400);
  });

  test("Visiting /admin without a session redirects to the login page", async ({ page }) => {
    await page.goto("/admin");
    await expect(page).toHaveURL(/\/admin\/login$/);
    await expect(page.getByRole("heading", { name: "SARIV Admin" })).toBeVisible();
    await expect(page.getByLabel("Username")).toBeVisible();
    await expect(page.getByLabel("Password")).toBeVisible();
  });

  test("Login page shows an error on wrong credentials", async ({ page }) => {
    await page.goto("/admin/login");
    await page.getByLabel("Username").fill("wrong");
    await page.getByLabel("Password").fill("wrong");
    await page.getByRole("button", { name: "Sign In" }).click();

    await expect(page.getByText("Invalid username or password")).toBeVisible();
  });
});
