import { Table } from "antd"
import React from "react"

const Clients = () => {
  return (
    <div className="bg-white w-full p-5 rounded-lg shadow">
      {/* header */}
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-xl">Clients</h2>
        <button className="bg-[#f29235] text-white py-2 px-3 rounded-md text-sm">
          + Add Client
        </button>
      </div>

      {/* content */}
      <Table className="mt-5" />
    </div>
  )
}

export default Clients
