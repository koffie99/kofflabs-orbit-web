import React from "react"
import MoneyCard from "../uibits/MoneyCard"

const Finance = () => {
  return (
    <div className="">
      <div className="flex items-center justify-between bg-white w-full p-5 rounded-lg shadow">
        <h2 className="font-semibold text-xl">Finance</h2>
        <div className="#f29235">
          <button className="bg-[#f39136] text-white text-sm rounded-lg px-4 py-2">
            + Create Payment Link
          </button>
        </div>
      </div>

      {/* payment stats */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        <MoneyCard title="Total Sales (2025)" amount={100000} type="gross" />
        <MoneyCard title="Sales This Month" amount={30000} type="monthly" />
        <MoneyCard title="Sales Today" amount={20000} type="today" />
      </div>
    </div>
  )
}

export default Finance
