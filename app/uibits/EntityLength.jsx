import React from "react";

const EntityLength = ({ entityCount, entityName }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="bg-[#f39136] text-white w-fit h-[20px] rounded-md px-4 py-5 text-center flex items-center justify-center">
        {entityCount || 0}
      </div>
      <h1 className="font-semibold text-neutral-300">{entityName}</h1>
    </div>
  );
};

export default EntityLength;
