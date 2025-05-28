"use client"
import Image from "next/image"
import dynamic from "next/dynamic"
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
import { IoSettingsOutline } from "react-icons/io5"
import { TbUsersGroup } from "react-icons/tb"
import Dashboard from "@/app/components/Dashboard"
import Employees from "@/app/components/Employees"
import { FaRegBuilding } from "react-icons/fa6"
import Projects from "@/app/components/Projects"
// import Clients from "@/app/components/Clients"
const Clients = dynamic(() => import("@/app/components/Clients"), {
  ssr: false,
})
import Finance from "@/app/components/Finance"
import Letters from "@/app/components/Letters"
import Security from "@/app/components/Security"
import Announcement from "@/app/components/Annoucement"
import Activities from "@/app/components/Activities"
import Administrators from "@/app/components/Administrators"
import Departments from "@/app/components/Departments"
import Settings from "@/app/components/Settings"

const Page = () => {
  // Load the last visited page from sessionStorage
  const [currentPage, setCurrentPage] = useState(null)

  useEffect(() => {
    const storedPage = sessionStorage.getItem("myCurrentPage") || "dashboard"
    setCurrentPage(storedPage)
  }, [])

  let currentAdmin

  if (typeof sessionStorage !== "undefined") {
    currentAdmin = JSON.parse(sessionStorage.getItem("adminUser"))
  }

  // const [adminUser, setAdminUser] = useState(currentAdmin || [])

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
      case "employees":
        return <Employees />
      case "departments":
        return <Departments />
      case "projects":
        return <Projects />
      case "clients":
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
      case "settings":
        return <Settings />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="flex bg-neutral-900 min-h-screen w-full" style={{backgroundImage: `radial-gradient(circle at 0.5px 0.5px, rgba(255,255,255,0.1) 0.5px, transparent 0)`, backgroundSize: "8px 8px", backgroundRepeat: "repeat"}}>
      {/* sidenav */}
      <div className="flex-[0.2] py-2 px-8 bg-[#131313] shadow h-[100vh]">
        <div className="flex items-center gap-3 mt-4">
        <Image
          width={30}
          height={30}
          src="/images/logo.png"
          quality={100}
          alt="logo"
        />
        <h2 className="font-bold text-neutral-300 text-xl">Kofflabs <span className="text-neutral-300">Orbit</span></h2>
        </div>

        {/* nav items */}
        <div className="flex flex-col gap-2 mt-4 sidenav">
          <div
            className={`${
              currentPage === "dashboard" ? "active" : ""
            } p-2 rounded-full text-neutral-400 pl-5 flex items-center gap-3 cursor-pointer`}
            onClick={() => setCurrentPage("dashboard")}
          >
            <LuLayoutDashboard />
            <p>Dashboard</p>
          </div>
          <div
            className={`${
              currentPage === "employees" ? "active" : ""
            } p-2 rounded-full text-neutral-400 pl-5 flex items-center gap-3 cursor-pointer`}
            onClick={() => setCurrentPage("employees")}
          >
            <GoPeople />
            <p>Employees</p>
          </div>
          <div
            className={`${
              currentPage === "departments" ? "active" : ""
            } p-2 rounded-full text-neutral-400  pl-5 flex items-center gap-3 cursor-pointer`}
            onClick={() => setCurrentPage("departments")}
          >
            <FaRegBuilding />
            <p>Departments</p>
          </div>
          <div
            className={`${
              currentPage === "projects" ? "active" : ""
            } p-2 rounded-full pl-5 text-neutral-400 flex items-center gap-3 cursor-pointer`}
            onClick={() => setCurrentPage("projects")}
          >
            <LiaProjectDiagramSolid />
            <p>Projects & Tasks</p>
          </div>
          <div
            className={`${
              currentPage === "clients" ? "active" : ""
            } p-2 rounded-full pl-5 flex text-neutral-400 items-center gap-3 cursor-pointer`}
            onClick={() => setCurrentPage("clients")}
          >
            <BsPeople />
            <p>Clients</p>
          </div>
          <div
            className={`${
              currentPage === "finance" ? "active" : ""
            } p-2 rounded-full pl-5 flex text-neutral-400 items-center gap-3 cursor-pointer`}
            onClick={() => setCurrentPage("finance")}
          >
            <GrMoney />
            <p>Finance</p>
          </div>
          <div
            className={`${
              currentPage === "documents" ? "active" : ""
            } p-2 rounded-full pl-5 flex text-neutral-400 items-center gap-3 cursor-pointer`}
            onClick={() => setCurrentPage("documents")}
          >
            <IoDocumentTextOutline />
            <p>Letters</p>
          </div>

          <div
            className={`${
              currentPage === "announcements" ? "active" : ""
            } p-2 rounded-full pl-5 flex text-neutral-400 items-center gap-3 cursor-pointer`}
            onClick={() => setCurrentPage("announcements")}
          >
            <AiOutlineNotification />
            <p>Announcements</p>
          </div>
          {/* <div
            className={`${
              currentPage === "activities" ? "active" : ""
            } p-2 rounded-md flex items-center gap-3 cursor-pointer`}
            onClick={() => setCurrentPage("activities")}
          >
            <FiActivity />
            <p>Activities</p>
          </div> */}
          <div
            className={`${
              currentPage === "administrators" ? "active" : ""
            } p-2 rounded-full pl-5 flex text-neutral-400 items-center gap-3 cursor-pointer`}
            onClick={() => setCurrentPage("administrators")}
          >
            <TbUsersGroup />
            <p>Administrators</p>
          </div>
          <div
            className={`${
              currentPage === "settings" ? "active" : ""
            } p-2 rounded-full pl-5 text-neutral-400 flex items-center gap-3 cursor-pointer`}
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
        <div className="bg-[#131313] shadow-xl w-full h-[10vh] flex items-center justify-between px-7">
          <p></p>
          <div className="flex flex-col items-end">
            <p className="capitalize">
              {currentAdmin?.firstName} {currentAdmin?.lastName}
            </p>
            <p className="text-[#818181] text-sm">{currentAdmin?.email}</p>
          </div>
        </div>
        <div className="p-6">{customRender()}</div>
      </div>
    </div>
  )
}

export default Page
