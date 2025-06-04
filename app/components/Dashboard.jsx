"use client";
import React, { useEffect, useState } from "react";
import DashCard from "../uibits/DashCard";
import baseUrl from "../utils/baseUrl";
import truncateToTwoDecimals from "../utils/truncateToTwoDecimals";
import { LiaProjectDiagramSolid } from "react-icons/lia";
import { GoPeople } from "react-icons/go";

const Dashboard = () => {
  const [dashboardStat, setDashboardStat] = useState({
    revenue: 0,
    project_count: 0,
    employee_count: 0,
  });

  // get dashbaord stats
  const getDashboardStats = async () => {
    try {
      const requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      await fetch(`${baseUrl}/api/v1/dashboard/stats`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          setDashboardStat(result);
        })
        .catch((error) => console.error(error));
    } catch (err) {
      console.log(err);
    }
  };

  // init
  useEffect(() => {
    getDashboardStats();
  }, []);

  return (
    <div className="bg-[#131313] w-full p-5 rounded-lg shadow">
      <div>
        <h2 className="font-semibold text-xl text-neutral-300">Dashboard</h2>
      </div>

      {/* stats */}
      <div className="mt-5">
        {/* basic stats */}
        <div className="grid grid-cols-3 gap-4">
          <DashCard
            Icon={GoPeople}
            desc="Revenue"
            type="money"
            value={`${Number(dashboardStat?.revenue).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`}
          />
          <DashCard
            Icon={LiaProjectDiagramSolid}
            desc="Projects"
            value={dashboardStat?.project_count || 0}
          />
          <DashCard
            Icon={GoPeople}
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
  );
};

export default Dashboard;
