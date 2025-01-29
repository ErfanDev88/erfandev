"use client";
import React, { useEffect } from "react";
import "./globals.css";
import navLine from "../public/assets/Lines/navbar.png";
import skillLine from "../public/assets/Lines/whatCanIdo.png";
import gif404 from "../public/assets/404-Error.svg";
import Image from "next/image";
import { Btn } from ".";
import AOS from "aos";
import "aos/dist/aos.css";

function notFound() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
    });
  }, []);
  return (
    <>
      <div
        className={`container mx-auto w-full flex flex-col items-center justify-center`}
      >
        <Image
          alt="navLine"
          src={navLine}
          width={1100}
          height={1100}
          className="absolute left-[25%] bottom-[40%] -z-50"
        />
        <section
          data-aos="zoom-in"
          className="w-full flex flex-col md:flex-row justify-between items-center rounded-[60px] p-16 hero mt-28 gap-y-12 md:gap-y-0"
        >
          <div
            data-aos="slide-left"
            className="w-full md:w-[50%] flex flex-col justify-between md:items-start items-center md:gap-y-20 gap-y-8 order-1 md:order-none "
          >
            <div className="gap-y-10">
              <h1 className="text-8xl font-black text-center md:text-start">
                404
              </h1>
              <h1 className="font-black text-4xl text-center md:text-right md:leading-none leading-loose">
                صفحه مورد نظر یافت نشد!
              </h1>
            </div>
            <Btn title={"بازگشت به خانه "} href={"/"} />
          </div>
          <div
            data-aos="slide-right"
            className="w-full md:w-[50%] flex justify-end"
          >
            <Image
              alt="404 صفحه یافت نشد"
              src={gif404}
              width={560}
              height={560}
            />
          </div>
        </section>
        <Image
          alt="skillLine"
          src={skillLine}
          width={1800}
          height={1300}
          className="absolute top-[300px] left-[300px] -z-[60]"
        />
      </div>
    </>
  );
}

export default notFound;
