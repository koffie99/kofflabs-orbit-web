import React from "react"
import { GiTakeMyMoney } from "react-icons/gi"
import { HiMiniArrowTrendingUp } from "react-icons/hi2"

const MoneyCard = ({ title, amount, type }) => {
  return (
    <div className="p-5 bg-white rounded-lg shadow flex gap-4">
      <div className="w-[70px] bg-[#fff8f1] rounded-md flex items-center justify-center">
        <GiTakeMyMoney className="text-[#f39136] text-3xl" />
      </div>
      <div>
        <p className="text-[#f39136]">{title}</p>
        <h2 className="font-semibold text-xl">
          GHS {amount ? amount.toLocaleString() : 0}
        </h2>
        {type === "gross" && (
          <button className="text-[#f39136] bg-[#fff8f1] px-3 py-1 rounded-lg text-sm">
            Analyse
          </button>
        )}
        {type === "monthly" && (
          <div className="flex items-center justify-between gap-6">
            <button className="text-[#f39136] text-sm">
              +{2000} this month
            </button>
            <HiMiniArrowTrendingUp className="text-[#f39136]" />
          </div>
        )}
        {type === "today" && (
          <p className="text-sm text-[#f39136]">From 2 series</p>
        )}
      </div>
    </div>
  )
}

export default MoneyCard
