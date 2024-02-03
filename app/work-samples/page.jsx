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
    <div className="container mx-auto w-full flex flex-col items-center justify-center mt-20 relative">
      <Image
        src={navLine}
        width={1700}
        height={1100}
        className="absolute left-[20%] -z-50"
      />
      <section className="w-full rounded-2xl md:rounded-none md:w-[119.8%] bg-[#A58A44] flex flex-col justify-between items-center gap-y-14 lg:w-[145%] py-10">
        <h1 className="font-medium text-3xl">نمونه کار های من</h1>
        <div className="md:w-[85%] flex flex-col md:flex-wrap md:flex-row md:items-center justify-between items-center gap-x-0 gap-y-8 md:gap-x-8">
          {cardData.map((data) => {
            return (
              <article
                data-aos="flip-down"
                className="h-[550px] md:w-[380px] w-[300px] flex flex-col justify-between items-center rounded-2xl workSampleCard p-5 gap-y-7"
              >
                <div className="w-full rounded-2xl shadow-xl overflow-hidden">
                  <Image
                    src={data.imageSrc}
                    className="w-full rounded-2xl shadow-xl transition-all duration-300 hover:scale-110 cursor-pointer"
                  />
                </div>
                <h1 className="text-3xl font-bold">{data.title}</h1>
                <p className="text-2xl font-extralight text-center">
                  {data.description}
                </p>
                <Btn title={data.btnTitle} href={data.btnHref} />
              </article>
            );
          })}
        </div>
        <Link
          href={"/"}
          className={`outline-btn rounded-2xl text-white border border-white bg-transparent py-4 px-6 text-xl font-medium hover:text-[#A58A44] relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-white before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0`}
        >
          نمونه کار های بیشتر
        </Link>
      </section>
    </div>
  );
}
