import React from "react"


const SweetList = ({ Icon, name }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center justify-center p-3 rounded bg-[#ffecda] text-[#F39136]">
        {Icon && <Icon />}
      </div>
      <div>{name}</div>
    </div>
  )
}

export default SweetList
