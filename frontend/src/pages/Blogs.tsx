import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"

export const Blogs = () => {
    return <div>
            <Appbar />
            <div className="flex justify-center">
            
            <div className="max-w-xl">
                <BlogCard 
                    authorName= {"Aman"}
                    title= {"SHE: Hope, Faith, Love"}
                    content= {"content of the blog HTML is the standard markup language for Web pages. With HTML you can create your own Website. HTML is easy to learn - You will enjoy it!"}
                    publishedDate= {"9th June 2024"}
                />
                <BlogCard 
                    authorName= {"Aman"}
                    title= {"SHE: Hope, Faith, Love"}
                    content= {"content of the blog HTML is the standard markup language for Web pages. With HTML you can create your own Website. HTML is easy to learn - You will enjoy it!"}
                    publishedDate= {"9th June 2024"}
                />
                <BlogCard 
                    authorName= {"Aman"}
                    title= {"SHE: Hope, Faith, Love"}
                    content= {"content of the blog HTML is the standard markup language for Web pages. With HTML you can create your own Website. HTML is easy to learn - You will enjoy it!"}
                    publishedDate= {"9th June 2024"}
                />
            </div>
        </div>
    </div>
}