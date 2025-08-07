"use client";
import React, { createContext, useEffect, useState } from "react";

export const blogContext = createContext();

function Blog({ children }) {
  const [blogData, setBlogData] = useState([]);


  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await fetch("https://erfandev-strapi.liara.run/api/blogs?populate=*");
      const data = await res.json();
      const formatted = data.data.map((blog) => ({
        id: blog.id,
        title: blog.title,
        description: blog.description,
        btnTitle: "مشاهده مقاله کامل",
        btnHref: `/blogs/${blog.slug}`,
        imageSrc: `https://erfandev-strapi.liara.run${blog.image?.url}`,
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
