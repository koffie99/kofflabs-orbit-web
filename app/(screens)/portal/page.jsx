import Sidenav from "@/app/components/Sidenav"
import navItems from "@/app/utils/navItems"
import Image from "next/image"
import React from "react"
import { LuLayoutDashboard } from "react-icons/lu"
import { LiaProjectDiagramSolid } from "react-icons/lia"
import { GoPeople } from "react-icons/go"
import { BsPeople } from "react-icons/bs"
import { TbAnalyze } from "react-icons/tb"
import { GrMoney } from "react-icons/gr"
import { IoDocumentTextOutline } from "react-icons/io5"
import { PiShieldCheck } from "react-icons/pi"
import { BiLogOutCircle } from "react-icons/bi"
import { AiOutlineNotification } from "react-icons/ai"
import { IoAnalytics } from "react-icons/io5"
import { FiActivity } from "react-icons/fi"
import { TbUsersGroup } from "react-icons/tb"

const page = () => {
  return (
    <div className="flex bg-[#f9fafd] min-h-screen w-full">
      {/* sidenav */}
      <div className="flex-[0.2] py-2 px-8 bg-white shadow">
        <Image
          width={150}
          height={120}
          src="/images/complogo.png"
          quality={100}
          alt="logo"
        />

        {/* nav items */}
        <div className="flex flex-col gap-1 mt-4">
          <div className="bg-[#fff7f0] p-2 rounded-md flex items-center gap-3 text-[#f39236] cursor-pointer ml-7">
            <LuLayoutDashboard />
            <p>Dashboard</p>
          </div>
          <div className="p-2 rounded-md flex items-center gap-3 cursor-pointer">
            <GoPeople />
            <p>Employees</p>
          </div>
          <div className="p-2 rounded-md flex items-center gap-3 cursor-pointer">
            <LiaProjectDiagramSolid />
            <p>Projects & Tasks</p>
          </div>
          <div className="p-2 rounded-md flex items-center gap-3 cursor-pointer">
            <BsPeople />
            <p>Clients</p>
          </div>
          <div className="p-2 rounded-md flex items-center gap-3 cursor-pointer">
            <TbAnalyze />
            <p>Marketing</p>
          </div>
          <div className="p-2 rounded-md flex items-center gap-3 cursor-pointer">
            <GrMoney />
            <p>Finance & Accounting</p>
          </div>
          <div className="p-2 rounded-md flex items-center gap-3 cursor-pointer">
            <IoDocumentTextOutline />
            <p>Documents</p>
          </div>
          <div className="p-2 rounded-md flex items-center gap-3 cursor-pointer">
            <LiaProjectDiagramSolid />
            <p>Assets & Liablities</p>
          </div>
          <div className="p-2 rounded-md flex items-center gap-3 cursor-pointer">
            <PiShieldCheck />
            <p>System & Security</p>
          </div>
          <div className="p-2 rounded-md flex items-center gap-3 cursor-pointer">
            <IoAnalytics />
            <p>Analytics & Insights</p>
          </div>
          <div className="p-2 rounded-md flex items-center gap-3 cursor-pointer">
            <AiOutlineNotification />
            <p>Announcements</p>
          </div>
          <div className="p-2 rounded-md flex items-center gap-3 cursor-pointer">
            <FiActivity />
            <p>Activities</p>
          </div>
          <div className="p-2 rounded-md flex items-center gap-3 cursor-pointer">
            <TbUsersGroup />
            <p>Administrators</p>
          </div>
          <div className="p-2 rounded-md flex items-center gap-3 text-[tomato] cursor-pointer">
            <BiLogOutCircle />
            <p>Logout</p>
          </div>
        </div>
      </div>
      <div className="flex-[0.7]"></div>
    </div>
  )
}

export default page
