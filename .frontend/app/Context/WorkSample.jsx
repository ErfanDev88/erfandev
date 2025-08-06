"use client";
import React, { createContext, useEffect, useState } from "react";

export const workContext = createContext();

function WorkSample({ children }) {
  const [workSamplesData, setWorkSamplesData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "http://localhost:1337/api/work-samples?populate=*"
        );
        const data = await res.json();
        const formatted = data.data.map((item) => ({
          title: item.title,
          description: item.description,
          btnTitle: item.btnTitle,
          btnHref: item.btnHref,
          imageSrc: item.imageSrc?.url
            ? `http://localhost:1337${item.imageSrc.url}`
            : null,
        }));
        setWorkSamplesData(formatted);
      } catch (error) {
        console.error("Error fetching work samples:", error);
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
