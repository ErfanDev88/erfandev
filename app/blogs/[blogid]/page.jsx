"use client"
import React from "react";
import { useRouter } from "next/navigation";

export default function SingleBlog() {
  const router = useRouter()
  console.log(router);
  return (
    <section className="container w-full justify-between items-center flex flex-col gap-y-14 mt-40 md:mt-20 mb-10">
      {router}
    </section>
  );
}
