"use client";
import Image from "next/image";
import React from "react";
import navLine from "../../public/assets/Lines/navbar.png";
import Link from "next/link";
// import { WorkSampleCard } from "..";

function page() {
  return (
    <div className="container mx-auto w-full flex flex-col items-center justify-center mt-40 relative">
      <Image
        src={navLine}
        width={1700}
        height={1100}
        className="absolute left-[20%] -z-50"
      />
      <section className="w-full rounded-2xl md:rounded-none md:w-[119.8%] bg-[#A58A44] flex flex-col justify-between items-center gap-y-14 lg:w-[145%] py-10">
        <h1 className="font-medium text-3xl">نمونه کار های من</h1>
        <div className="flex flex-col md:flex-row md:items-center justify-between items-center gap-x-0 gap-y-8 md:gap-x-8">
            {/* <WorkSampleCard /> */}
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

export default page;
