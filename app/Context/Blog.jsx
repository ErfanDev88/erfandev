"use client";
import React, { createContext, useState } from "react";
import StartProgramming from "@/public/assets/Blog/howToStartProgramming.png";
import whatisTailwindcss from "@/public/assets/whatisTailwindcss.png";
import whatIsNextJs from "@/public/assets/whatIsNextJs.jpg";

export const blogContext = createContext();

function Blog({ children }) {
  const [blogData, setBlogData] = useState([
    {
      imageSrc: StartProgramming,
      title: "برنامه نویسی رو از کجا شروع کنم؟",
      description:
        "برنامه نویسی هم مثل بقیه مهارت ها نیاز به نقشه راه داره که بهت بگه از کجا شروع کنی تا به بهترین خودت توی اون حرفه تبدیل بشی!",
      btnTitle: "مشاهده مقاله کامل",
      btnHref: "/blogs/how-to-start-programming",
    },
    {
      imageSrc: whatisTailwindcss,
      title: "تیلویند چیست (Tailwindcss)",
      description:"CSS یکی از تکنولوژی‌های مهم دنیای وب است که برای زیبا‌سازی صفحات وب استفاده می‌شود. شما با استفاده از قواعدی که CSS در اختیارتان قرار می‌دهد می‌توانید ظاهر صفحات‌ HTML را به هر شکلی که بخواهید تغییر دهید.",
      btnTitle: "مشاهده مقاله کامل",
      btnHref: "/blogs/what-is-tailwindcss",
    },
    {
      imageSrc: whatIsNextJs,
      title: "NextJs نکست جی اس چیست؟",
      description:
        "برنامه نویسی هم مثل بقیه مهارت ها نیاز به نقشه راه داره که بهت بگه از کجا شروع کنی تا به بهترین خودت توی اون حرفه تبدیل بشی!",
      btnTitle: "مشاهده مقاله کامل",
      btnHref: "/blogs/what-is-nextJs",
    },
  ]);

  return (
    <blogContext.Provider value={blogData}>{children}</blogContext.Provider>
  );
}

export default Blog;
