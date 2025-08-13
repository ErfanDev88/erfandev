"use client";
import React, { createContext, useEffect, useState } from "react";

export const workContext = createContext();

function WorkSample({ children }) {
  const [workSamplesData, setWorkSamplesData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://erfandev-strapi.liara.run/api/work-samples?populate=*"
        );
        const data = await res.json();
        const formatted = data.data.map((item) => ({
          title: item.title,
          description: item.description,
          btnTitle: item.btnTitle,
          btnHref: item.btnHref,
          imageSrc: item.imageSrc?.url
            ? `https://erfandev-strapi.liara.run${item.imageSrc.url}`
            : null,
        }));
        setWorkSamplesData(formatted);
      } catch (error) {
        alert("اینترنت خود را بررسی کنید")
      }
    };

    fetchData();
  }, []);
  return (
    <workContext.Provider value={workSamplesData}>
      {children}
    </workContext.Provider>
  );
}

export default WorkSample;
