"use client";
import Image from "next/image";
import React, { useContext } from "react";
import Link from "next/link";
import { Btn } from "..";
import { blogContext } from "../Context/Blog";

export default function blogs() {
  const blogData = useContext(blogContext);

  return (
    <section className="container w-full justify-between items-center flex flex-col gap-y-14 mt-40 md:mt-20 mb-10">
      <h1 className="font-medium text-3xl">مقاله ها</h1>
      <div className="flex flex-col md:flex-row md:items-center justify-between items-center gap-x-0 gap-y-8 md:gap-x-8 md:w-full md:px-10 md:justify-between md:flex-wrap">
        {blogData.map((data) => {
          return (
            <div
              data-aos="flip-down"
              className="md:w-[490px] w-[300px] flex flex-col justify-between items-center rounded-2xl workSampleCard px-4 py-8 gap-y-7"
            >
              <div className="w-[86%] rounded-2xl shadow-xl overflow-hidden">
                <Image
                  src={data.imageSrc}
                  className="w-full rounded-2xl shadow-xl transition-all duration-300 hover:scale-110 cursor-pointer"
                />
              </div>
              <h1 className="text-3xl font-bold">{data.title}</h1>
              <p className="w-[80%] text-xl font-extralight text-center leading-relaxed">
                {data.description}
              </p>
              <Btn title={data.btnTitle} href={data.btnHref} />
            </div>
          );
        })}
      </div>
    </section>
  );
}
