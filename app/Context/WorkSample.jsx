'use client'
import React, { createContext, useState } from "react";
import supra from "../../public/assets/Supra.png";
import messengerApp from "../../public/assets/messengerApp.png";
import iphone14Site from "../../public/assets/iphone14Site.png";

export const workContext = createContext();

function WorkSample({ children }) {
  const [workSamplesData, setWorkSamplesData] = useState([
    {
      imageSrc: supra,
      title: "معرفی سوپرا MK4",
      description: "یه سایت برای معرفی ماشین رویایی Supra MK4",
      btnTitle: " مشاهده در Dribbble",
      btnHref: "https://dribbble.com/shots/22265792-Toyota-Supra-MK4",
    },
    {
      imageSrc: messengerApp,
      title: "سایت پیام رسان",
      description: "طراحی یک سایت پیام رسان",
      btnTitle: " مشاهده در Dribbble",
      btnHref: "https://dribbble.com/shots/20265629-Messenger",
    },
    {
      imageSrc: iphone14Site,
      title: "سایت معرفی iPhone 14",
      description: "یه سایت برای معرفی گوشی آیفون ۱۴",
      btnTitle: " مشاهده در Dribbble",
      btnHref: "https://dribbble.com/shots/20950885-iPhone-14",
    },
    {
      imageSrc: iphone14Site,
      title: "سایت معرفی iPhone 14",
      description: "یه سایت برای معرفی گوشی آیفون ۱۴",
      btnTitle: " مشاهده در Dribbble",
      btnHref: "https://dribbble.com/shots/20950885-iPhone-14",
    },
  ]);

  return (
    <workContext.Provider value={workSamplesData}>
      {children}
    </workContext.Provider>
  );
}

export default WorkSample;
