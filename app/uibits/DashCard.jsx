import React from "react"
import CountUp from "react-countup"

const DashCard = ({ Icon, color, desc, value }) => {
  return (
    <div className="bg-[#1b1b1b] flex items-center gap-3 p-6 rounded-lg shadow-2xl">
      <div>{Icon && <Icon className="text-2xl text-[#f39136]" />}</div>
      <div>
        <h3 className="text-xl text-[#f39136] font-bold">
          <CountUp end={value} duration={2.5} separator="," />
        </h3>
        <p className="text-neutral-400 text-sm">{desc}</p>
      </div>
    </div>
  )
}

export default DashCard
