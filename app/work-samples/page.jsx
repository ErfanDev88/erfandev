"use client";
import Image from "next/image";
import React, { useContext } from "react";
import navLine from "../../public/assets/Lines/navbar.png";
import Link from "next/link";
import { workContext } from "../Context/WorkSample";
import { Btn } from "..";

export default function workSamples() {
  const cardData = useContext(workContext);

  return (
    <div className="container mx-auto w-full flex flex-col items-center justify-center mt-40 md:mt-20 relative">
      <Image
        alt="navLine"
        src={navLine}
        width={1700}
        height={1100}
        className="absolute left-[20%] -z-50"
      />
      <section className="w-full rounded-2xl md:rounded-md md:w-[110.8%] bg-gradient-to-br from-[#A58A44] to-[#837233d7]  flex flex-col  items-center gap-y-14 py-10">
        <h1 className="font-medium text-3xl text-white">نمونه کار های من</h1>
        <main className="md:w-[85%] flex flex-col md:flex-wrap md:flex-row md:items-center items-center gap-x-0 gap-y-8 md:gap-x-8">
          {cardData.map((data) => {
            return (
              <article
                key={data.title}
                data-aos="flip-down"
                className="h-[550px] md:w-[380px] w-[300px] flex flex-col justify-between items-center rounded-2xl workSampleCard p-5 gap-y-7"
              >
                <div className="w-full rounded-2xl shadow-xl overflow-hidden">
                  <img
                    src={data.imageSrc}
                    alt={data.title}
                    className="max-h-[250px] w-full rounded-2xl shadow-xl transition-all duration-300 hover:scale-110 cursor-pointer"
                  />
                </div>
                <h1 className="text-3xl font-bold text-center text-white">{data.title}</h1>
                <p className="text-2xl font-extralight text-center text-white">
                  {data.description}
                </p>
                <Btn title={data.btnTitle} href={data.btnHref} />
              </article>
            );
          })}
        </main>
      </section>
    </div>
  );
}
