import "./globals.css";
import WorkSample from "./Context/WorkSample";
import Navbar from "@/components/layout/Navbar";
import ScroolUpBtn from "@/components/ScroolUpBtn";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Blog from "./Context/Blog";
import Footer from "@/components/layout/Footer";
import RespoinsiveNavbar from "@/components/layout/RespoinsiveNavbar";

export const metadata = {
  title: "عرفان رضایی , برنامه نویس سایت , طراح ui ux سایت | Erfandev",
  description:
    "محمد عرفان رضایی, عرفان رضایی, عرفان, سایت شخصی عرفان رضایی, erfandev, Erfan, Erfandev, erfandev, طراح سایت و برنامه نویس سایت ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="rtl">
      <head>
        <link
          href="https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn-Variable-font-face.css"
          rel="stylesheet"
          type="text/css"
        />

        <meta name="robots" content="index, archive" />
        <link rel="canonical" href="https://erfandev.vercel.app/" />
      </head>
      <body
        className={`bg-gradient-to-b from-[#191919] to-[#151515] overflow-x-hidden flex flex-col justify-center items-center relative`}
      >
        <WorkSample>
          <Blog>
            <Navbar />
            <RespoinsiveNavbar />
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
