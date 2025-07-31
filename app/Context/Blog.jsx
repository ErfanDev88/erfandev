"use client";
import React, { createContext, useEffect, useState } from "react";

export const blogContext = createContext();

function Blog({ children }) {
  const [blogData, setBlogData] = useState([]);


  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await fetch("http://localhost:1337/api/blogs?populate=*");
      const data = await res.json();
      const formatted = data.data.map((blog) => ({
        id: blog.id,
        title: blog.title,
        description: blog.description,
        btnTitle: "مشاهده مقاله کامل",
        btnHref: `/blogs/${blog.slug}`,
        imageSrc: `http://localhost:1337${blog.image?.url}`,
        // content: blog.content,
        // author: blog.author,
        // date: blog.date,
      }));
      setBlogData(formatted);
    };

    fetchBlogs();
  }, []);

  return (
    <blogContext.Provider value={blogData}>{children}</blogContext.Provider>
  );
}

export default Blog;
