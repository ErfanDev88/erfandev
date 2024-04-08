"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/assets/logo.png";
import OverlayMenu from "./OverlayMenu";

function RespoinsiveNavbar() {
  const [isOverlayOpened, setIsOverlayOpened] = useState(false);
  const overlayHandler = () => {
    setIsOverlayOpened(!isOverlayOpened);
  };

  return (
    <div className="w-full relative">
      <nav className="w-full flex justify-between items-center px-8 py-4 md:hidden bg-[#67572a49] backdrop-blur-2xl">
        <Link href={"/"}>
          <Image
            src={logo}
            width={200}
            alt="Erfandev, عرفان رضایی"
            className="cursor-pointer"
          />
        </Link>
        <button className="flex" onClick={overlayHandler}>
          {isOverlayOpened ? (
            <svg
              width="25"
              height="25"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 16L16 2"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16 16L2 2"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 7H18"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M3 12H13"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M3 17H18"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          )}
        </button>
      </nav>
      {isOverlayOpened ? <OverlayMenu setIsOverlayOpened={setIsOverlayOpened}/> : ""}
    </div>
  );
}

export default RespoinsiveNavbar;
