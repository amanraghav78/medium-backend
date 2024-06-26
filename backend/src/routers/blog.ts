import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from 'hono/jwt';
import { createBlogInput, updateBlogInput} from '@amanraghav/backend-common';


export const blogRouter= new Hono<{
    Bindings: {
      DATABASE_URL: string;
      JWT_SECRET: string;
    },
    Variables: {
        userId: string
    };
}>();

blogRouter.use('/*', async (c, next)=>{
    const authHeader= c.req.header("Authorization");
    if(!authHeader){
        c.status(401);
        return c.json({
            error: "unauthorised from authHeader"
        })
    }

    const user = await verify (authHeader, c.env.JWT_SECRET);
    if (!user || typeof user.id !== 'number') {
		c.status(401);
		return c.json({ error: "unauthorized in user" });
	}
	c.set('userId', user.id.toString());
	await next()

});

blogRouter.post('/', async (c) => {
    const body = await c.req.json();
    const { success } = createBlogInput.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({
            message: "Inputs not correct"
        })
    }
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const authorId= c.get("userId");

    const blog= await prisma.blog.create({
        data : {
            thumbnail: body.title,
            content: body.content,
            authorId: Number(authorId)
        }
    })

    return c.json({
        id: blog.id
    })
})
  
blogRouter.put('/', async (c) => {
    const body = await c.req.json();
    const { success } = updateBlogInput.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({
            message: "Inputs not correct"
        })
    } 
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const blog= await prisma.blog.update({
        where : {
            id:body.id
        },
        data : {
            thumbnail: body.title,
            content: body.content,
        }
    })

    return c.json({
        id: blog.id
    })
})

//Todo: add pagination
blogRouter.get('/bulk', async (c) => {
    //const body = await c.req.json();
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const blogs = await prisma.blog.findMany({
        select: {
            content: true,
            thumbnail: true,
            id: true,
            author: {
                select: {
                    name: true
                }
            }
        }
    });

    return c.json({
        blogs
    })
})
  
blogRouter.get('/:id', async (c) => {
    const id = c.req.param("id");
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try {
        const blog= await prisma.blog.findFirst({
            where : {
                id: Number(id)
            },
            select: {
                id: true,
                thumbnail: true,
                content: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        })
    
        return c.json({
            blog
        })
        
    } catch (error) {
        c.status(411);
        console.log(error);
        return c.json({
            message: "Error while fetching blog post"
        })
    }
})




