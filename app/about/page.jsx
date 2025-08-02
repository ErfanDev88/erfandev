"use client";
import Image from "next/image";
import React from "react";
import aboutMeImg from "@/public/assets/aboutMePic.jpg";
import Link from "next/link";

export default function about() {
  return (
    <div className="container w-full">
      <section
        data-aos="zoom-in"
        className="w-[90%] md:w-full flex flex-col md:flex-row justify-between items-center md:items-start rounded-[60px] p-10 md:pr-24 md:pl-0 hero md:mt-28 mt-40 gap-y-12 md:gap-y-0 md:gap-x-32 md:py-0"
      >
        <div className="w-full md:w-[60%] md:h-full md:pt-20 flex flex-col justify-between items-start gap-y-16 order-1 md:-order-1">
          <h1 className="text-4xl md:text-5xl font-black md:text-start text-center w-full">
            درباره من
          </h1>
          <p className="font-extralight tex-sm md:text-xl leading-10 tracking-wide text-center md:text-justify">
            سلام! من عرفان هستم. بیش از ۳ سال است که در زمینه برنامه‌نویسی
            فعالیت می‌کنم و تجربه‌های گسترده‌ای در این حوزه دارم. همچنین،
            نمونه‌کارهای زیادی را انجام داده‌ام که می‌توانید در
            <Link
              href={"/work-samples"}
              className="font-bold text-[#ffe196] px-1"
            >
              اینجا
            </Link>
            ببینید. بارها در مسابقات خوارزمی مقام برتری را کسب کرده‌ام، که این
            نشان از توانایی‌های من در برنامه نویسی است. اگر به دنبال ایجاد
            وبسایت دلخواه خود با کمترین هزینه و در کوتاه‌ترین زمان ممکن هستید،
            من می‌توانم به شما کمک کنم. با توجه به تجربه‌ام، می‌توانم یک وبسایت
            حرفه‌ای و منحصربه‌فرد برای شما ایجاد کنم. برای برقراری ارتباط با من
            و دریافت اطلاعات بیشتر، می‌توانید در
            <Link
              href={"/contact-us"}
              className="font-bold text-[#ffe196] px-1"
            >
              اینجا
            </Link>
            کلیک کنید.
          </p>
        </div>
        <div className="w-full md:w-[40%] flex justify-end h-full">
          <Image alt="عرفان رضایی , Erfandev" src={aboutMeImg} width={400} className="rounded-e-[60px]" />
        </div>
      </section>
    </div>
  );
}
