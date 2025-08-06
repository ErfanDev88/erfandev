import React, { useState } from "react";
import moment from "moment-jalaali";
import "moment/locale/fa";

function CommentCard({name, description, date, isApproved}) {
  const [formattedDate, setFormattedDate] = useState(
    moment(date).locale("fa").format("jYYYY/jM/jD HH:mm")
  );
  date = formattedDate;

  if(isApproved==false) return null;

  return (
    <div
      data-aos="fade"
      className="w-full max-w-full overflow-x-auto p-4 rounded-md mb-4 bg-[#232323] flex flex-col gap-y-2"
    >
      <div className="w-full flex justify-between items-center border-b-[0.6px] border-b-[#ffffff09] pb-2">
        <h3 className="text-sm font-light text-white text-start">{name}</h3>
        <p className="text-xs font-light text-white text-end">
          {formattedDate}
        </p>
      </div>
      <div className="max-w-xs">
        <p className="text-white font-medium text-xl flex flex-col text-start">
          {description}
        </p>
      </div>
    </div>
  );
}

export default CommentCard;
