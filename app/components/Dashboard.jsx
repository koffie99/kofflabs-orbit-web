"use client"
import React, { useEffect, useState } from "react"
import DashCard from "../uibits/DashCard"
import { GoPeople } from "react-icons/go"
import baseUrl from "../utils/baseUrl"
import truncateToTwoDecimals from "../utils/truncateToTwoDecimals"

const Dashboard = () => {
  const [dashboardStat, setDashboardStat] = useState({})

  // get dashbaord stats
  const getDashboardStats = async () => {
    try {
      const requestOptions = {
        method: "GET",
        redirect: "follow",
      }

      await fetch(`${baseUrl}/api/v1/dashboard/stats`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          setDashboardStat(result)
        })
        .catch((error) => console.error(error))
    } catch (err) {
      console.log(err)
    }
  }

  // init
  useEffect(() => {
    getDashboardStats()
  }, [])

  return (
    <div className="bg-white w-full p-5 rounded-lg shadow">
      <div>
        <h2 className="font-semibold text-xl">Dashboard</h2>
      </div>

      {/* stats */}
      <div className="mt-5">
        {/* basic stats */}
        <div className="grid grid-cols-3 gap-4">
          <DashCard
            Icon={GoPeople}
            desc="Revenue"
            value={`GHS ${truncateToTwoDecimals(dashboardStat?.revenue) || 0.0}`}
          />
          <DashCard desc="Projects" value={dashboardStat?.project_count || 0} />
          <DashCard
            desc="Employees"
            value={dashboardStat?.employee_count || 0}
          />
        </div>

        {/* financial growth stats */}
        <div className="mt-6">
          {/* <h2>Financial Growth</h2> */}
          <div className="h-full">
            {/* <Chart type="bar" data={chartData} options={chartOptions} /> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
