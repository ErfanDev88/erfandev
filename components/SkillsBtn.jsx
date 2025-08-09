import Image from "next/image";
import React from "react";

function SkillsBtn({ shadow, title, imageSrc, imageShadow }) {
  return (
    <button
      className="w-72 md:w-96 flex justify-between items-center py-12 px-10 skillBtn font-normal text-2xl text-white"
      style={{
        boxShadow: `2px 2px 18px 0px rgba(148, 148, 148, 0.18) inset, ${shadow}`,
      }}
    >
      {title}
      <Image
        alt={title}
        src={imageSrc}
        width={58}
        height={58}
        style={{ boxShadow: `${imageShadow}` }}
      />
    </button>
  );
}

export default SkillsBtn;
