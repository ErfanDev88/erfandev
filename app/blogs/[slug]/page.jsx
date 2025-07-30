"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function BlogDetailPage() {
  const { slug } = useParams(); 
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      const res = await fetch(`http://localhost:1337/api/blogs?filters[slug][$eq]=${slug}&populate=*`);
      const data = await res.json();
      setBlog(data.data[0]?.attributes);
    };
    fetchBlog();
  }, [slug]);

  if (!blog) return <p>در حال بارگذاری...</p>;

  return (
    <section className="container mx-auto mt-20 p-6">
      <h1 className="text-3xl font-bold mb-6">{blog.title}</h1>
      <img
        src={`http://localhost:1337${blog.image?.data?.url}`}
        alt={blog.title}
        className="w-full max-w-3xl rounded-lg shadow mb-6"
      />
      <p className="text-lg leading-relaxed">{blog.description}</p>
      <div className="mt-8 prose prose-lg prose-invert">
        {/* محتوای کامل بلاگ (Rich Text) */}
        <div dangerouslySetInnerHTML={{ __html: blog.content }} />
      </div>
      <p className="mt-10 text-sm opacity-70">
        ✍ نویسنده: {blog.author} | 🗓 تاریخ: {blog.date}
      </p>
    </section>
  );
}
