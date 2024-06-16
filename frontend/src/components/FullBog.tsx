import { Blog } from "../hooks"
import { Appbar } from "./Appbar"
import { Avatar } from "./BlogCard"

export const FullBlog= ({ blog } : {blog : Blog}) => {
    return <div>
        <Appbar/>
        <div className="flex justify-center">
            <div className="grid grid-cols-12 px-10 w-full pt-200 max-w-screen-xl pt-12">
                <div className="col-span-8">
                    <div className="text-3xl font-extrabold">
                        {blog.thumbnail}
                    </div>
                    <div className="text-slate-500 pt-2">
                        Posted on 11th June 2024
                    </div>
                    <div className="pt-2 text-slate-600">
                        {blog.content}
                    </div>
                </div>
                <div className="col-span-4 pl-8">
                    <div>
                        <Avatar name= "Aman"/> Author
                    </div>
                    <div className="text-2xl font-bold">
                        {blog.author.name || "Aman"}    
                    </div>
                    <div className="text-slate-500 pt-2">
                         Aman is a passionate writer and tech enthusiast with a knack for breaking down complex topics into engaging and easy-to-understand content. With a background in writing, they bring a unique perspective to his writing, making words accessible to everyone.
                    </div>
                </div>
            </div>
        </div>
    </div>
}