import Link from "next/link";
import React from "react";

function OutlineBtn({
  href,
  title,
  borderColor,
  textColor,
  bgHoverColor,
  textHoverColor,
}) {
  return (
    <Link
      href={href}
      className={`outline-btn rounded-2xl text-${textColor} border border-${borderColor} bg-transparent py-4 px-6 text-xl font-medium hover:text-${textHoverColor} relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-${bgHoverColor} before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0`}
    >
      {title}
    </Link>
  );
}

export default OutlineBtn;
