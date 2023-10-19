import Image from "next/image";
import React, { useContext } from "react";
import Btn from "./Btn";
import { workContext } from "@/app/Context/WorkSample";

function WorkSampleCard() {
  const cardData = useContext(workContext);

  return (
    <>
      {cardData.slice(0, 3).map((data) => {
        return (
          <div className="h-[550px] w-[380px] flex flex-col justify-between items-center rounded-2xl workSampleCard p-5 gap-y-7">
            <Image
              src={data.imageSrc}
              className="w-full rounded-2xl shadow-xl"
            />
            <h1 className="text-3xl font-bold">{data.title}</h1>
            <p className="text-2xl font-extralight text-center">
              {data.description}
            </p>
            <Btn title={data.btnTitle} href={data.btnHref} />
          </div>
        );
      })}
    </>
  );
}

export default WorkSampleCard;
