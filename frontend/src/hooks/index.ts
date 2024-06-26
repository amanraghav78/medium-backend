import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

export interface Blog {
    "content": string;
    "thumbnail": string;
    "id": number;
    "author": {
        "name": string;
    }
}

export const useBlog= ({ id } : {id: string})=> {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
                    headers: {
                        Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTh9.503w4HZVzHTXrzlJJ1VzmQ-tzNMcR3Xayl9VT2wFbeo"
                    }
                });
                setBlog(response.data.blog);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching blogs:", error);
            } 
        };

        fetchBlogs();
    }, [id]);

    return {
        loading,
        blog
    };
}

export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
                    headers: {
                        Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTh9.503w4HZVzHTXrzlJJ1VzmQ-tzNMcR3Xayl9VT2wFbeo"
                    }
                });
                setBlogs(response.data.blogs);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching blogs:", error);
            } 
        };

        fetchBlogs();
    }, []);

    return {
        loading,
        blogs
    };
};
