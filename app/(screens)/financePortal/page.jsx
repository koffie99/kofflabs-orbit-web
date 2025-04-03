"use client"
import Image from "next/image"
import React, { useEffect, useState } from "react"
import { LuLayoutDashboard } from "react-icons/lu"
import { GrMoney } from "react-icons/gr"
import { IoDocumentTextOutline } from "react-icons/io5"
import { AiOutlineNotification } from "react-icons/ai"
import { FiActivity } from "react-icons/fi"
import { BiLogOutCircle } from "react-icons/bi"

import FinanceDashboard from "@/app/(financeModules)/financeDashboard/page"
import FinanceFinance from "@/app/(financeModules)/financeFinance/page"
import FinanceProjects from "@/app/(financeModules)/financeProjects/page"
import FinanceReports from "@/app/(financeModules)/financeReports/page"
import FinanceClients from "@/app/(financeModules)/financeClients/page"
import FinanceUsers from "@/app/(financeModules)/financeUsers/page"
import FinanceLetters from "@/app/(financeModules)/financeLetters/page"
import FinanceActivities from "@/app/(financeModules)/financeActivities/page"
import FinanceSettings from "@/app/(financeModules)/financeSettings/page"
import FinanceNotices from "@/app/(financeModules)/financeNotices/page"

const FinancePortal = () => {
  const [currentPage, setCurrentPage] = useState(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("myCurrentPage") || "dashboard"
    }
    return "dashboard"
  })

  const [userFirstName, setUserFirstName] = useState("")
  const [userLastName, setUserLastName] = useState("")
  const [userType, setUserType] = useState("")

  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("myCurrentPage", currentPage)
    }
  }, [currentPage])

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUserFirstName(sessionStorage.getItem("userFirstName") || "")
      setUserLastName(sessionStorage.getItem("userLastName") || "")
      setUserType(sessionStorage.getItem("userType") || "")
    }
  }, [])

  const handleLogout = () => {
    if (confirm("Are you sure you want to log out?")) {
      location.href = "/"
    }
  }

  const customRender = () => {
    switch (currentPage) {
      case "dashboard":
        return <FinanceDashboard />
      case "finance":
        return <FinanceFinance />
      case "projects":
        return <FinanceProjects />
      case "reports":
        return <FinanceReports />
      case "clients":
        return <FinanceClients />
      case "users":
        return <FinanceUsers />
      case "letters":
        return <FinanceLetters />
      case "activities":
        return <FinanceActivities />
      case "settings":
        return <FinanceSettings />
      case "notices":
        return <FinanceNotices />
      default:
        return <FinanceDashboard />
    }
  }

  return (
    <div className="flex w-full h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="flex-[0.2] py-2 px-8 bg-white shadow h-[100vh] overflow-y-scroll">
        <Image
          width={150}
          height={120}
          src="/images/complogo.png"
          quality={100}
          alt="logo"
        />

        {/* Navigation Items (Finance Portal-Specific) */}
        <div className="flex flex-col gap-2 mt-4 sidenav">
          {[
            {
              key: "dashboard",
              label: "Dashboard",
              icon: <LuLayoutDashboard />,
            },
            { key: "finance", label: "Finance", icon: <GrMoney /> },
            {
              key: "projects",
              label: "Projects",
              icon: <IoDocumentTextOutline />,
            },
            {
              key: "reports",
              label: "Reports",
              icon: <IoDocumentTextOutline />,
            },
            {
              key: "clients",
              label: "Clients",
              icon: <IoDocumentTextOutline />,
            },
            { key: "users", label: "Users", icon: <IoDocumentTextOutline /> },
            {
              key: "letters",
              label: "Letters",
              icon: <IoDocumentTextOutline />,
            },
            { key: "activities", label: "Activities", icon: <FiActivity /> },
            {
              key: "notices",
              label: "Notices",
              icon: <AiOutlineNotification />,
            },
            {
              key: "settings",
              label: "Settings",
              icon: <IoDocumentTextOutline />,
            },
          ].map(({ key, label, icon }) => (
            <div
              key={key}
              className={`p-2 rounded-md flex items-center gap-3 cursor-pointer ${
                currentPage === key ? "active" : ""
              }`}
              onClick={() => setCurrentPage(key)}
            >
              {icon} <p>{label}</p>
            </div>
          ))}

          {/* Logout Button */}
          <div
            className="p-2 rounded-md flex items-center gap-3 text-[#ff5555] cursor-pointer w-fit"
            onClick={handleLogout}
          >
            <BiLogOutCircle /> <p>Logout</p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-[0.8] flex flex-col h-screen">
        {/* Top Navigation */}
        <div className="bg-white text-black w-auto  h-[10vh] flex items-center px-7 fixed top-0 right-0 ml-[20%] z-50">
          <div className="capitalize ml-auto">
            <p className="font-semibold text-sm">
              Hi {userFirstName} {userLastName}
            </p>
            <p className="text-[#818181] text-sm">{userType}</p>
          </div>
        </div>

        {/* Scrollable Content Area */}
        <div className="p-6 mt-[10vh] h-[90vh] overflow-y-auto">
          {customRender()}
        </div>
      </div>
    </div>
  )
}

export default FinancePortal
