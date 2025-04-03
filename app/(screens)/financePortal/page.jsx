"use client"
import Image from "next/image"
import React, { useEffect, useState } from "react"
import { LuLayoutDashboard } from "react-icons/lu"
import { LiaProjectDiagramSolid } from "react-icons/lia"
import { GoPeople } from "react-icons/go"
import { BsPeople } from "react-icons/bs"
import { GrMoney } from "react-icons/gr"
import { IoDocumentTextOutline } from "react-icons/io5"
import { PiShieldCheck } from "react-icons/pi"
import { BiLogOutCircle } from "react-icons/bi"
import { AiOutlineNotification } from "react-icons/ai"
import { FiActivity } from "react-icons/fi"
import { TbUsersGroup } from "react-icons/tb"
import Dashboard from "@/app/components/Dashboard"
import Employees from "@/app/components/Employees"
import { FaRegBuilding } from "react-icons/fa6"
import Projects from "@/app/components/Projects"
import Clients from "@/app/components/Clients"
import Finance from "@/app/components/Finance"
import Letters from "@/app/components/Letters"
import Security from "@/app/components/Security"
import Announcement from "@/app/components/Annoucement"
import Activities from "@/app/components/Activities"
import Administrators from "@/app/components/Administrators"
import Departments from "@/app/components/Departments"
import { IoSettingsOutline } from "react-icons/io5"
import { IoFolderOpenOutline } from "react-icons/io5"
import { IoDocumentsOutline } from "react-icons/io5"
import { MdPeopleOutline } from "react-icons/md"

const FinancePortal = () => {
  // Load the last visited page from sessionStorage
  const [currentPage, setCurrentPage] = useState(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("myCurrentPage") || "dashboard"
    }
    return "dashboard" // Default value for SSR
  })

  let userFirstName
  let userLastName
  let userType

  if (typeof sessionStorage !== "undefined") {
    userFirstName = sessionStorage.getItem("userFirstName")
    userLastName = sessionStorage.getItem("userLastName")
    userType = sessionStorage.getItem("userType")
  }

  // Save currentPage to sessionStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("myCurrentPage", currentPage)
    }
  }, [currentPage])

  // Handle logout
  const handleLogout = () => {
    const res = confirm("Are you sure you want to log out?")
    if (res) {
      location.href = "/"
    }
  }

  // Render the correct component based on currentPage
  const customRender = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard />
      case "Finance":
        return <Employees />
      case "Projects":
        return <Departments />
      case "Reports":
        return <Projects />
      case "Messaging":
        return <Clients />
      case "finance":
        return <Finance />
      case "documents":
        return <Letters />
      case "security":
        return <Security />
      case "announcements":
        return <Announcement />
      case "activities":
        return <Activities />
      case "administrators":
        return <Administrators />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="flex bg-[#f9fafd] min-h-screen w-full">
      {/* sidenav */}
      <div className="flex-[0.2] py-2 px-8 bg-white shadow h-[100vh] overflow-y-scroll">
        <Image
          width={150}
          height={120}
          src="/images/complogo.png"
          quality={100}
          alt="logo"
        />

        {/* nav items */}
        <div className="flex flex-col gap-2 mt-4 sidenav">
          <div
            className={`${
              currentPage === "dashboard" ? "active" : ""
            } p-2 rounded-md flex items-center gap-3 cursor-pointer`}
            onClick={() => setCurrentPage("dashboard")}
          >
            <LuLayoutDashboard />
            <p>Dashboard</p>
          </div>
          <div
            className={`${
              currentPage === "finance" ? "active" : ""
            } p-2 rounded-md flex items-center gap-3 cursor-pointer`}
            onClick={() => setCurrentPage("finance")}
          >
            <GrMoney />
            <p>Finance</p>
          </div>
          <div
            className={`${
              currentPage === "projects" ? "active" : ""
            } p-2 rounded-md flex items-center gap-3 cursor-pointer`}
            onClick={() => setCurrentPage("projects")}
          >
            <IoFolderOpenOutline />
            <p>Projects</p>
          </div>
          <div
            className={`${
              currentPage === "reports" ? "active" : ""
            } p-2 rounded-md flex items-center gap-3 cursor-pointer`}
            onClick={() => setCurrentPage("reports")}
          >
            <IoDocumentsOutline />
            <p>Reports</p>
          </div>
          <div
            className={`${
              currentPage === "clients" ? "active" : ""
            } p-2 rounded-md flex items-center gap-3 cursor-pointer`}
            onClick={() => setCurrentPage("clients")}
          >
            <GoPeople />
            <p>Clients</p>
          </div>
          <div
            className={`${
              currentPage === "users" ? "active" : ""
            } p-2 rounded-md flex items-center gap-3 cursor-pointer`}
            onClick={() => setCurrentPage("users")}
          >
            <MdPeopleOutline />
            <p>Users</p>
          </div>
          <div
            className={`${
              currentPage === "letters" ? "active" : ""
            } p-2 rounded-md flex items-center gap-3 cursor-pointer`}
            onClick={() => setCurrentPage("letters")}
          >
            <IoDocumentTextOutline />
            <p>Letters</p>
          </div>
          <div
            className={`${
              currentPage === "activities" ? "active" : ""
            } p-2 rounded-md flex items-center gap-3 cursor-pointer`}
            onClick={() => setCurrentPage("activities")}
          >
            <FiActivity />
            <p>Tasks & Activities</p>
          </div>
          <div
            className={`${
              currentPage === "settings" ? "active" : ""
            } p-2 rounded-md flex items-center gap-3 cursor-pointer`}
            onClick={() => setCurrentPage("settings")}
          >
            <IoSettingsOutline />
            <p>Settings</p>
          </div>
          <div
            className="p-2 rounded-md flex items-center gap-3 text-[#ff5555] cursor-pointer w-fit"
            onClick={handleLogout}
          >
            <BiLogOutCircle />
            <p>Logout</p>
          </div>
        </div>
      </div>
      <div className="flex-[0.8] w-full">
        {/* nav */}
        <div className="bg-white w-full shadow h-[10vh] flex items-center justify-between px-7">
          <p></p>
          <div className="flex flex-col items-end">
            <p className="capitalize">
              {userFirstName ? userFirstName : ""}{" "}
              {userLastName ? userLastName : ""}
            </p>
            <p className="text-[#818181] text-sm capitalize">{userType}</p>
          </div>
        </div>
        <div className="p-6">{customRender()}</div>
      </div>
    </div>
  )
}

export default FinancePortal
