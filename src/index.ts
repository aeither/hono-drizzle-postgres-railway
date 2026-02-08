import { Hono } from "hono";
import { cors } from "hono/cors";
import { db } from "./db";
import { users } from "./db/schema";

const app = new Hono();

const origin = process.env.ORIGIN
  ? [process.env.ORIGIN, "healthcheck.railway.app"]
  : "*";

app.use(
  "*",
  cors({
    origin,
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  })
);

app.get("/health", (c) => c.text("OK", 200));

app.get("/", (c) => c.text("Hello Hono!"));

app.get("/users", async (c) => {
  const allUsers = await db.select().from(users);
  return c.json(allUsers);
});

const port = parseInt(process.env.PORT!) || 3000;
console.log(`Running at http://0.0.0.0:${port}`);

Bun.serve({
  fetch: app.fetch,
  port,
  hostname: '0.0.0.0'
});
