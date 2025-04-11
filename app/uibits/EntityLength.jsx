import React from "react"

const EntityLength = ({ entityCount, entityName }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="bg-[#F39136] text-white w-fit h-[20px] rounded-md p-3 p py-5 text-center flex items-center justify-center">
        {entityCount || 0}
      </div>
      <h1 className="font-semibold">{entityName}</h1>
    </div>
  )
}

export default EntityLength
