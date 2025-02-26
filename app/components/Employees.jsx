import React from "react"

const Employees = () => {
  return (
    <div className="bg-white w-full p-5 rounded-lg shadow">
      {/* header */}
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-xl">Employees</h2>
        <button className="bg-[#f29235] text-white py-2 px-3 rounded-md text-sm">
          + Add employee
        </button>
      </div>
    </div>
  )
}

export default Employees
