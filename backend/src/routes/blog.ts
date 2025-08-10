import { Hono } from "hono";
import { verify } from "hono/jwt";
import { PrismaClient } from "../generated/prisma/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import z from "zod";
import { blogPostSchema } from "prajwal-medium-comman01";


export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();


blogRouter.use("/*", async (c, next) => {
  const header = c.req.header("authorization") || "";
  if (header == "") {
    return c.json({
      status: 403,
      error: "Unauthorised",
    });
  }

  const response = await verify(header, c.env.JWT_SECRET);

  if (typeof response.id === "string") {
    c.set("userId", response.id);
    await next();
  } else {
    return c.json({
      status: 403,
      error: "Unauthorised",
    });
  }
});

// BLOG POST
blogRouter.post("/", async(c) => {


    try {
    const body = await c.req.json();

    const {success} =blogPostSchema.safeParse(body);

    if(!success){
        c.status(411);
        return c.json({
            message:"Invalid Input, Please try again"
        });
    }
    const userId=c.get('userId');
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const post=await prisma.post.create({
        data:{
            title:body.title,
            content:body.content,
            authorId:userId,
            published:true,
        }
    });

    return c.json({
        message:"Blog has been Posted",
        id:post.id
    });
        
    } catch (error) {
       console.log(error);
       c.json({
        message:"Internal Server Error"
       }); 
    }
    



    
  return c.text("blog post done");
});

//BLOG UPDATE
blogRouter.put("/:id", async(c) => {
    try {
        const body = await c.req.json();
        const userId=c.get('userId');
        const blogId=c.req.param('id');

        const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());
        const blog= await prisma.post.findUnique({
            where:{
                id:blogId
            }
        });

        if(!blog){
            return c.json({
                status:404,
                message:"Blog Does not Exist"
            });
        }

        if(blog.authorId!==userId){
            return c.json({
                status:401,
                message:"Unauthorised Access"
            });
        }

        const updateBlog=await prisma.post.update({
            where:{id:blogId},
            data:{
        ...(body.title && { title: body.title }),
        ...(body.content && { content: body.content }),
        ...(body.published && { published: body.published }),

            
        }})

        return c.json({
            staus:200,
            message:"Blog Updated Succesfully"
        })

    } catch (error) {
        console.log(error);
        return c.json({
            status:500,
            message:"Internal Server Error"
        });
    }
});


// GET ALLL BLOGS
blogRouter.get("/", async(c) => {

    try {
         const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());
    const blogs=await prisma.post.findMany();

    return c.json({ 
        status:200,
        message:"blogs fetched succesfully",
        blogs:blogs
    }
    

    )
    } catch (error) {
        console.log(error);
        return c.json({
            status:500,
            message:"Internal server Error"
        });
    }

});


// GET SINGLE BLOCK BY ID
blogRouter.get("/:id",async (c) => {
   try {
         const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());
    const userId=c.get('userId');
   const blog = await prisma.post.findMany({
  where: {
    id: userId,
  },
});

if(!blog){
    return c.json({
        status:404,
        message:"Blog does not exist"
    })
}

    return c.json({ 
        status:200,
        message:"blog fetched succesfully",
        blogs:blog
    }
    

    )
    } catch (error) {
        console.log(error);
        return c.json({
            status:500,
            message:"Internal server Error"
        });
    }
});