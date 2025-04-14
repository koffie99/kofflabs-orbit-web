import React from "react"

const PersonaList = ({ Icon, name, desc }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center justify-center p-3 rounded bg-[#ffecda] text-[#F39136]">
        {Icon && <Icon />}
      </div>
      <div className="flex flex-col">
        <p className="font-semibold">{name}</p>
        <p className="text-sm text-[#818181] font-normal">{desc}</p>
      </div>
    </div>
  )
}

export default PersonaList
