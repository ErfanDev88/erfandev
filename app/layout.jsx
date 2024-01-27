import "./globals.css";
import WorkSample from "./Context/WorkSample";
import Navbar from "@/components/layout/Navbar";
import ScroolUpBtn from "@/components/ScroolUpBtn";

export const metadata = {
  title: "عرفان رضایی | Erfandev",
  description:
    "محمد عرفان رضایی, عرفان رضایی, عرفان, سایت شخصی عرفان رضایی, erfandev, Erfan, Erfandev, erfandev",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`font-[Vazirmatn] bg-[url('../public/assets/background.png')] bg-no-repeat bg-cover overflow-x-hidden flex flex-col justify-center items-center`}
      >
        <WorkSample>
          <Navbar />
          {children}
          <ScroolUpBtn />
        </WorkSample>
      </body>
    </html>
  );
}
