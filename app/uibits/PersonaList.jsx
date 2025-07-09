import React from "react";
import dynamic from "next/dynamic";

const PersonaList = ({ Icon, name, desc }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center justify-center p-3 rounded bg-[#30508a] text-white shadow-2xl">
        {Icon && <Icon />}
      </div>
      <div className="flex flex-col">
        <p className="font-semibold">{name}</p>
        <p className="text-sm text-[#818181] font-normal">{desc}</p>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(PersonaList), { ssr: false });
