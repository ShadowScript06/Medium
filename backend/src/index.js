import { Hono } from "hono";
import { userRouter } from "./routes/user";
import { blogRouter } from "./routes/blog";
const app = new Hono();
app.route('/api/v1/user', userRouter);
app.route('/api/v1/blog', blogRouter);
app.get("/", (c) => c.text("Hello From MEDIUM App!"));
// MIDDLEWARE
export default app;
