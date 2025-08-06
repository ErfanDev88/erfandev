import React from "react";

function ContinueLine({from, to}) {
  return (
    <svg
      width="25"
      height="283"
      viewBox="0 0 25 283"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mt-16"
    >
      <circle cx="12.5" cy="9.5" r="9.5" fill={from} />
      <line
        x1="13.25"
        y1="19"
        x2="13.25"
        y2="258"
        stroke="url(#paint0_linear_16_52)"
        strokeWidth="1.5"
      />
      <circle cx="12.5" cy="270.5" r="7.5" fill={to} />
      <circle cx="12.5" cy="270.5" r="12" stroke={to} />
      <defs>
        <linearGradient
          id="paint0_linear_16_52"
          x1="12.5"
          y1="-3.5"
          x2="12.4997"
          y2="254.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={from} />
          <stop offset="1" stopColor={to} />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default ContinueLine;
