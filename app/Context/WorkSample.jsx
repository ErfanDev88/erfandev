'use client'
import React, { createContext, useState } from "react";
import supra from "../../public/assets/Supra.png";
import messengerApp from "../../public/assets/messengerApp.png";
import iphone14Site from "../../public/assets/iphone14Site.png";
import DashboardUi from "../../public/assets/DashboardUi.jpg";
import ErfandevImg from "../../public/assets/ErfandevImg.jpg";
import ibankCitiImg from "../../public/assets/ibank-citi-img.jpg";
import LoginUiImg from "../../public/assets/LoginUiImg.jpg";
import ShopUiImg from "../../public/assets/ShopUiImg.jpg";
import weatherAppImg from "../../public/assets/weatherAppImg.jpg";
import weblearnImg from "../../public/assets/weblearnImg.png";
import walletDashboardImg from "../../public/assets/walletDashboardImg.jpg";

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
      imageSrc: DashboardUi,
      title: "طراحی ui داشبورد (Dashboard)",
      description: "یک طرح Ui Ux برای یک وبسایت داشبورد",
      btnTitle: " مشاهده در Dribbble",
      btnHref: "https://dribbble.com/shots/19127223-Dashboard",
    },
    {
      imageSrc: ErfandevImg,
      title: "وبسایت شخصی Erfandev",
      description: "طراحی Ui Ux سایت شخصی خودم",
      btnTitle: " مشاهده در Dribbble",
      btnHref: "https://dribbble.com/shots/21891090-Erfandev-Personal-website",
    },
    {
      imageSrc: ibankCitiImg,
      title: "یک سایت و داشبورد پر از قابلیت",
      description: "Username : ibankciti,   Password : ibank1234",
      btnTitle: "مشاهده سایت",
      btnHref: "https://ibank-citi.vercel.app/",
    },
    {
      imageSrc: LoginUiImg,
      title: "Ui صفحه ی لاگین",
      description: "طراحی Ui Ux صفحه ی لاگین",
      btnTitle: " مشاهده در Dribbble",
      btnHref: "https://dribbble.com/shots/19330986-Log-in",
    },
    {
      imageSrc: ShopUiImg,
      title: "Ui سایت فروشگاهی",
      description: "طراحی صفحه ی اول سایت فروشگاهی",
      btnTitle: " مشاهده در Dribbble",
      btnHref: "https://dribbble.com/shots/19199339-ShopUI",
    },
    {
      imageSrc: weatherAppImg,
      title: "Ui سایت هواشناسی",
      description: "طراحی Ui Ux وبسایت هواشناسی",
      btnTitle: " مشاهده در Dribbble",
      btnHref: "https://dribbble.com/shots/19250820-Dark-Weather",
    },
    {
      imageSrc: weblearnImg,
      title: "سایت آموزش برنامه نویسی",
      description: "یک وبسایت برنامه نویسی پر قابلیت",
      btnTitle: "مشاهده سایت",
      btnHref: "https://weblearn.iran.liara.run/",
    },
    {
      imageSrc: walletDashboardImg,
      title: "Ui داشبورد",
      description: "طراحی Ui Ux سایت و داشبورد",
      btnTitle: " مشاهده در Dribbble",
      btnHref: "https://dribbble.com/shots/19423604-Wallet-dashboard",
    },
  ]);

  return (
    <workContext.Provider value={workSamplesData}>
      {children}
    </workContext.Provider>
  );
}

export default WorkSample;
