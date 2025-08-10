import { Hono } from "hono";
import { withAccelerate } from "@prisma/extension-accelerate";
import { PrismaClient } from "@prisma/client/edge.js";
import { decode, sign, verify } from "hono/jwt";
import bcrypt from "bcryptjs";
import { userRouter } from "./routes/user";
import { blogRouter } from "./routes/blog";
import { cors } from "hono/cors";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

app.use('*',cors());
app.route('/api/v1/user',userRouter);
app.route('/api/v1/blog',blogRouter);

app.get("/", (c) => c.text("Hello From MEDIUM App!"));

// MIDDLEWARE







export default app;
