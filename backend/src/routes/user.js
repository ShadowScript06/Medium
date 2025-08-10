import { Hono } from "hono";
import { PrismaClient } from "../generated/prisma/edge";
import bcrypt from "bcryptjs";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
export const userRouter = new Hono();
// SIGN UP
userRouter.post("/signup", async (c) => {
    try {
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate());
        const body = await c.req.json();
        const existingUser = await prisma.user.findUnique({
            where: {
                email: body.email
            }
        });
        if (existingUser) {
            return c.json({
                message: "User already exist please try Signin"
            });
        }
        const hashedPassword = bcrypt.hashSync(body.password);
        const user = await prisma.user.create({
            data: {
                email: body.email,
                password: hashedPassword,
            },
        });
        const token = await sign({ id: user.id }, c.env.JWT_SECRET);
        return c.json({
            message: "Sign up Succesfull",
            token: token,
        });
    }
    catch (error) {
        console.log(error);
        return c.json({
            message: "Internal Server Error",
        });
    }
});
//SIGN IN
userRouter.post("/signin", async (c) => {
    try {
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate());
        const body = await c.req.json();
        const user = await prisma.user.findUnique({
            where: {
                email: body.email,
            },
        });
        if (!user) {
            return c.json({
                message: "No user Found",
            });
        }
        const correctPassword = await bcrypt.compare(body.password, user.password);
        if (!correctPassword) {
            return c.json({
                message: "Incorrect Password",
            });
        }
        const token = await sign({ id: user.id }, c.env.JWT_SECRET);
        return c.json({
            message: "Sign in Succesfull",
            token: token,
        });
    }
    catch (error) {
        console.log(error);
        return c.json({
            message: "Internal Server Error",
        });
    }
});
