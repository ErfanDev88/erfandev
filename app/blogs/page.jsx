"use client";
import Image from "next/image";
import React, { useContext, useState } from "react";
import { Btn } from "..";
import { blogContext } from "../Context/Blog";

export default function blogs() {
  const [searchQuery, setSearchQuery] = useState("");
  const blogData = useContext(blogContext);

  const filteredBlogs = blogData.filter((contact) =>
    contact.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="container w-full justify-between items-center flex flex-col gap-y-14 mt-40 md:mt-20 mb-10">
      <h1 className="font-medium text-3xl text-white">مقاله ها</h1>
      <div className="flex border border-white/60 rounded-xl p-3 gap-x-2">
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="opacity-60"
        >
          <path
            d="M11 20C15.9706 20 20 15.9706 20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20Z"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M18.9299 20.6898C19.4599 22.2898 20.6699 22.4498 21.5999 21.0498C22.4499 19.7698 21.8899 18.7198 20.3499 18.7198C19.2099 18.7098 18.5699 19.5998 18.9299 20.6898Z"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <input
          type="text"
          placeholder="دنبال چه مقاله ای هستی؟"
          className="w-[90%] bg-transparent focus:outline-none text-white"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      {filteredBlogs.length > 0 ? (
        <main className="flex flex-col md:flex-row md:items-start justify-between items-center gap-x-0 gap-y-8 md:gap-x-8 md:w-full md:px-10 md:justify-between md:flex-wrap">
          {filteredBlogs.map((data) => {
            return (
              <article
                key={data.title}
                data-aos="flip-down"
                className="md:w-[490px] w-[300px] flex flex-col justify-between items-center rounded-2xl workSampleCard px-4 py-8 gap-y-7"
              >
                <div className="w-[86%] rounded-2xl shadow-xl overflow-hidden">
                  <img
                    alt={data.title}
                    src={data.imageSrc}
                    className="w-full rounded-2xl shadow-xl transition-all duration-300 hover:scale-110 cursor-pointer"
                  />
                </div>
                <h1 className="text-3xl font-bold text-white text-center md:text-start">{data.title}</h1>
                <p className="w-[80%] text-xl font-extralight text-white text-start md:text-center leading-relaxed">
                  {data.description}
                </p>
                <Btn title={data.btnTitle} href={data.btnHref} />
              </article>
            );
          })}
        </main>
      ) : (
        <span className="text-xl text-white">
          هیچ مقاله ای با نام "{searchQuery}" پیدا نشد!
        </span>
      )}
    </section>
  );
}
