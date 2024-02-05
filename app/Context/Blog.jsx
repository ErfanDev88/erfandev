"use client";
import React, { createContext, useState } from "react";
import StartProgramming from "@/public/assets/howToStartProgramming.png";

export const blogContext = createContext();

function Blog({ children }) {
  const [blogData, setBlogData] = useState([
    {
      imageSrc: StartProgramming,
      title: "برنامه نویسی رو از کجا شروع کنم؟",
      description:
        "برنامه نویسی هم مثل بقیه مهارت ها نیاز به نقشه راه داره که بهت بگه از کجا شروع کنی تا به بهترین خودت توی اون حرفه تبدیل بشی!",
      btnTitle: "مشاهده مقاله کامل",
      btnHref: "/",
    },
    {
      imageSrc: StartProgramming,
      title: "تیلویند چیست (Tailwindcss)",
      description:
        "برنامه نویسی هم مثل بقیه مهارت ها نیاز به نقشه راه داره که بهت بگه از کجا شروع کنی تا به بهترین خودت توی اون حرفه تبدیل بشی!",
      btnTitle: "مشاهده مقاله کامل",
      btnHref: "/",
    },
    {
      imageSrc: StartProgramming,
      title: "NextJs نکست جی اس چیست؟",
      description:
        "برنامه نویسی هم مثل بقیه مهارت ها نیاز به نقشه راه داره که بهت بگه از کجا شروع کنی تا به بهترین خودت توی اون حرفه تبدیل بشی!",
      btnTitle: "مشاهده مقاله کامل",
      btnHref: "/",
    },
  ]);

  return (
    <blogContext.Provider value={blogData}>{children}</blogContext.Provider>
  );
}

export default Blog;
