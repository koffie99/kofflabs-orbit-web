import React from "react"
import { GoPeople } from "react-icons/go"

const DashCard = ({ icon, color, desc, value }) => {
  return (
    <div className="bg-[#ffeddc] flex items-center gap-3 p-6 rounded-lg">
      <div>
        <GoPeople className="text-2xl text-[#f39136]" />
      </div>
      <div>
        <h3 className="text-xl text-[#f39136] font-bold">{value}</h3>
        <p>{desc}</p>
      </div>
    </div>
  )
}

export default DashCard
