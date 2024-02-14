import "./globals.css";
import WorkSample from "./Context/WorkSample";
import Navbar from "@/components/layout/Navbar";
import ScroolUpBtn from "@/components/ScroolUpBtn";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Blog from "./Context/Blog";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "عرفان رضایی , برنامه نویس سایت , طراح ui ux سایت | Erfandev",
  description:
    "محمد عرفان رضایی, عرفان رضایی, عرفان, سایت شخصی عرفان رضایی, erfandev, Erfan, Erfandev, erfandev, طراح سایت و برنامه نویس سایت ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <meta name="robots" content="index, archive" />
        <link rel="canonical" href="https://erfandev.vercel.app/" />
      </head>
      <body
        className={`font-[Vazirmatn] bg-[url('../public/assets/background.png')] bg-no-repeat bg-cover overflow-x-hidden flex flex-col justify-center items-center relative`}
      >
        <WorkSample>
          <Blog>
            <Navbar />
            {children}
            <Footer />
            <Analytics />
            <SpeedInsights />
            <ScroolUpBtn />
          </Blog>
        </WorkSample>
      </body>
    </html>
  );
}
