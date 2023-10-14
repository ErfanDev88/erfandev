import "./globals.css";
import { Vazirmatn } from "next/font/google";
import Navbar from "@/components/layout/Navbar"

const vazirmatn = Vazirmatn({ subsets: ["latin"] });

export const metadata = {
  title: "عرفان رضایی | Erfandev",
  description:
    "محمد عرفان رضایی, عرفان رضایی, عرفان, سایت شخصی عرفان رضایی, erfandev, Erfan, Erfandev, erfandev",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="rtl">
      <body className={`${vazirmatn.className} bg-[url('../public/assets/background.png')] bg-no-repeat bg-cover container mx-auto`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
