"use client";
import Image from "next/image";
import navLine from "../public/assets/Lines/navbar.png";
import skillLine from "../public/assets/Lines/whatCanIdo.png";
import heroImage from "../public/assets/heroImage.png";
import { TypeAnimation } from "react-type-animation";
import Btn from "@/components/Btn";
import ContinueLine from "@/components/ContinueLine";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <Image
        src={navLine}
        width={1100}
        height={1100}
        className="absolute left-[30%] bottom-[17%] -z-50"
      />
      <section className="w-full flex flex-col md:flex-row justify-between items-center rounded-[60px] p-16 hero md:mt-16 mt-28 gap-y-12 md:gap-y-0">
        <div className="w-full md:w-[40%] flex flex-col justify-between md:items-start items-center md:gap-y-10 gap-y-8 order-1 md:order-none ">
          <TypeAnimation
            sequence={[
              // Same substring at the start will only be typed out once, initially
              "من <عرفان/> هستم",
              1000, // wait 1s before replacing "Mice" with "Hamsters"
              "برنامه نویس تحت وب",
              1000,
              "طراح UI & UX سایت",
              1000,
              "تسلط کافی به کتابخانه ها و فریموورک ها",
              1500,
            ]}
            wrapper="h1"
            speed={50}
            style={{ fontWeight: 600, display: "inline-block" }}
            className="text-3xl md:text-5xl md:leading-normal"
            repeat={Infinity}
          />
          <article className="font-extralight text-xl text-center md:text-right">
            علاقه و تخصص من بیشتر برنامه نویسی هست و سعی می‌کنم حداقل توی تخصص
            خودم به روز باشم.
          </article>
          <Btn title={"اطلاعات بیشتر درباره من"} href={"/about"} />
        </div>
        <div className="w-full md:w-[60%] flex justify-end">
          <Image src={heroImage} width={600} height={600} alt="Erfandev" />
        </div>
      </section>
      <Image
        src={skillLine}
        width={1800}
        height={1300}
        className="absolute bottom-5 left-0 -z-50"
      />
      <ContinueLine from={"#fff"} to={"#FFE57E"} />
    </div>
  );
}
