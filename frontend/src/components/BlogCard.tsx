import { Link } from "react-router-dom";

interface BlogCardProps {
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
    id: number;
}

export const BlogCard = ({
    id,
    authorName,
    title,
    content,
    publishedDate
}: BlogCardProps) => {
    return <Link to= {`/blog/${id}`}>
        <div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer">
            <div className="flex">
                <Avatar name= {authorName}/>
                
                <div className="font-extralight pl-2 text-sm flex justify-center flex-col"> 
                    {authorName} 
                </div> 
                <div className="flex justify-center flex-col pl-2">
                    <Circle />
                </div>
                <div className="font-thin pl-2 text-slate-400 text-sm flex justify-center flex-col">
                    {publishedDate}
                </div>
            </div>
            <div className="text-xl font-semibold pt-2">
                {title}
            </div>
            <div className="text-md font-thin">
                {content.slice(0, 100) + "..."}
            </div>
            <div className="w-full text-slate-400 text-sm font-thin pt-4">
                {`${Math.ceil(content.length / 100)} minute(s) read`}
            </div>
            
        </div>
    </Link>
}

function Circle(){
    return <div className="h-1 w-1 rounded-full bg-slate-500"></div>
}

export function Avatar({ name }: { name: string }) {
    return <div className="relative inline-flex items-center justify-center w-6 h-6 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
        <span className="font-extralight text-xs text-gray-600">{name[0]}</span>
    </div>
    
}