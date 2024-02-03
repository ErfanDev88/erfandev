// import Image from "next/image";
// import React, { useContext } from "react";
// import Btn from "./Btn";
// import { workContext } from "@/app/Context/WorkSample";
// import AOS from 'aos';
// import 'aos/dist/aos.css';
// import { useEffect } from "react";

// function WorkSampleCard() {
//   const cardData = useContext(workContext);
//   useEffect(() => {
//     AOS.init({
//          duration: 800,
//          once: false,
//        })
//  }, [])
//   return (
//     <>
//       {cardData.slice(0, 3).map((data) => {
//         return (
//             <div data-aos="flip-down" className="h-[550px] md:w-[380px] w-[300px] flex flex-col justify-between items-center rounded-2xl workSampleCard p-5 gap-y-7">
//               <div className="w-full rounded-2xl shadow-xl overflow-hidden" >
//                 <Image
//                   src={data.imageSrc}
//                   className="w-full rounded-2xl shadow-xl transition-all duration-300 hover:scale-110 cursor-pointer"
//                 />
//               </div>
//               <h1 className="text-3xl font-bold">{data.title}</h1>
//               <p className="text-2xl font-extralight text-center">
//                 {data.description}
//               </p>
//               <Btn title={data.btnTitle} href={data.btnHref} />
//             </div>
//         );
//       })}
//     </>
//   );
// }

// export default WorkSampleCard;
