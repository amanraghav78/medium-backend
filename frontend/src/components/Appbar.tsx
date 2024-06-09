import { Avatar } from "./BlogCard"

export const Appbar = () => {
    return <div className="border-b flex justify-between px-10 py-4">
        <div className="font-semibold flex flex-col justify-center">
            Medium
        </div>
        <div>
            <Avatar name= "Aman" />
        </div>
    </div>
}