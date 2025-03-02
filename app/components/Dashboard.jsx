"use client"
import React, { useEffect, useState } from "react"
import DashCard from "../uibits/DashCard"
import { Chart } from "primereact/chart"

const Dashboard = () => {
  const [chartData, setChartData] = useState({})
  const [chartOptions, setChartOptions] = useState({})

  useEffect(() => {
    const data = {
      labels: ["Q1", "Q2", "Q3", "Q4"],
      datasets: [
        {
          label: "Sales",
          data: [540, 325, 702, 620],
          backgroundColor: [
            "rgba(255, 159, 64, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(153, 102, 255, 0.2)",
          ],
          borderColor: [
            "rgb(255, 159, 64)",
            "rgb(75, 192, 192)",
            "rgb(54, 162, 235)",
            "rgb(153, 102, 255)",
          ],
          borderWidth: 1,
        },
      ],
    }
    const options = {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    }

    setChartData(data)
    setChartOptions(options)
  }, [])

  return (
    <div className="bg-white w-full p-5 rounded-lg shadow">
      <div>
        <h2 className="font-semibold text-xl">Dashboard</h2>
      </div>

      {/* stats */}
      <div className="mt-5">
        {/* basic stats */}
        <div className="grid grid-cols-4 gap-4">
          <DashCard desc="Revenue" value={`GHS ${30000}`} />
          <DashCard desc="Employees" value={3} />
          <DashCard desc="Projects" value={1} />
          <DashCard desc="Clients" value={1} />
        </div>

        {/* financial growth stats */}
        <div className="mt-6">
          <h2>Financial Growth</h2>
          <div className="h-full">
            <Chart type="bar" data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
