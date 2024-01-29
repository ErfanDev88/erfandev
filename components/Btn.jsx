"use client";
import Link from "next/link";
import React from "react";

function Btn({ title, href }) {
  return (
    <Link
      href={href}
      className="btn rounded-2xl py-3 px-5 text-xl font-medium hover:scale-110 hover:rotate-2 transition-all duration-300 text-center"
    >
      {title}
    </Link>
  );
}

export default Btn;
