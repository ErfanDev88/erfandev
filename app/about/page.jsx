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
        className="w-full flex flex-col md:flex-row justify-between items-center md:items-start rounded-[60px] p-10 md:pr-12 md:pl-0 hero md:mt-28 mt-40 gap-y-12 md:gap-y-0 md:gap-x-12 md:py-0"
      >
        <div className="w-full md:w-[60%] md:h-full md:pt-10 flex flex-col justify-between items-start gap-y-16 order-1 md:-order-1 md:gap-y-8">
          <h1 className="text-4xl xl:text-5xl text-white md:text-4xl font-black md:text-start text-center w-full">
            درباره من
          </h1>
          <p className="font-extralight text-white tex-sm leading-10 tracking-wide text-center md:text-justify md:text-lg md:leading-8 xl:text-xl xl:leading-10">
            سلام! من عرفان هستم، با بیش از ۳ سال تجربه تخصصی در حوزه
            برنامه‌نویسی و توسعه وب. در این مدت پروژه‌های متعددی را با موفقیت
            انجام داده‌ام که می‌توانید نمونه آن‌ها را در
            <Link
              href={"/work-samples"}
              className="font-bold text-[#ffe196] px-1"
            >
              اینجا
            </Link>
            مشاهده کنید. بارها در مسابقات خوارزمی موفق به کسب رتبه‌های برتر
            شده‌ام که نشان‌دهنده مهارت و خلاقیتم در برنامه‌نویسی است. اگر به
            دنبال یک وب‌سایت حرفه‌ای، منحصربه‌فرد و مقرون‌به‌صرفه هستید که در
            کوتاه‌ترین زمان ممکن آماده شود، من می‌توانم بهترین گزینه برای شما
             باشم. برای ارتباط مستقیم و دریافت مشاوره رایگان، کافیست   

            <Link
              href={"/contact-us"}
              className="font-bold text-[#ffe196] px-1"
            >
                اینجا 
            </Link>
            کلیک کنید.
          </p>
        </div>
        <div className="w-full md:w-[40%] flex justify-center md:justify-end h-full">
          <Image
            alt="عرفان رضایی , Erfandev"
            src={aboutMeImg}
            width={400}
            className="rounded-[60px] md:rounded-e-[60px] md:rounded-none"
          />
        </div>
      </section>
    </div>
  );
}
