import { Hono } from "hono";
import { cors } from "hono/cors";
import { db } from "./db";
import { users } from "./db/schema";

const app = new Hono();

// Health check endpoint - defined first, no CORS middleware
app.get("/health", (c) => c.text("OK"));

// Apply CORS only to API routes
app.use(
  "/api/*",
  cors({
    origin: process.env.ORIGIN || "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  })
);

app.get("/", (c) => c.text("Hello Hono!"));

app.get("/api/users", async (c) => {
  const allUsers = await db.select().from(users);
  return c.json(allUsers);
});

const port = parseInt(process.env.PORT || "3000");
console.log(`Server starting on http://0.0.0.0:${port}`);

Bun.serve({
  fetch: app.fetch,
  port,
  hostname: "0.0.0.0",
});
