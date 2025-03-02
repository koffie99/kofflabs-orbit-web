"use client"
import { Table } from "antd"
import Image from "next/image"
import React, { useEffect, useState } from "react"

const Projects = () => {
  const [projects, setProjects] = useState([])
  const [isClient, setIsClient] = useState(false)

  // Ensure client-side rendering only
  useEffect(() => {
    setIsClient(true)
    getAllProjects()
  }, [])

  // get all projects
  const getAllProjects = async () => {
    try {
      const response = await fetch(
        "https://api.kofflabs.com/api/v1/projects/all"
      )
      const result = await response.json()
      setProjects(result?.projects || [])
    } catch (err) {
      console.error(err)
    }
  }

  // columns
  const columns = [
    {
      title: "#",
      render: (_value, _record, index) => <p>{index + 1}</p>,
    },
    {
      title: "Photo",
      key: "photo",
      dataIndex: "photo",
      render: (_, record) =>
        record?.photo ? (
          <Image
            src={record.photo}
            alt={record.name || "Project Image"}
            width={100}
            height={100}
            unoptimized // Avoids Next.js optimizations that might cause hydration issues
            priority // Ensures the image loads immediately
            className="rounded-md"
          />
        ) : (
          <p>No Image</p>
        ),
    },
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
      render: (_, record) => <p className="capitalize">{record?.name}</p>,
    },
    {
      title: "Start Date",
      key: "startDate",
      dataIndex: "startDate",
      render: (_, record) => (
        <p>
          {record?.startDate
            ? new Date(record.startDate).toLocaleString()
            : "N/A"}
        </p>
      ),
    },
    {
      title: "End Date",
      key: "endDate",
      dataIndex: "endDate",
      render: (_, record) => (
        <p>
          {record?.endDate ? new Date(record.endDate).toLocaleString() : "N/A"}
        </p>
      ),
    },
    {
      title: "Action",
      render: () => <p>Actions go here...</p>,
    },
  ]

  return (
    <div className="bg-white w-full p-5 rounded-lg shadow">
      {/* header */}
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-xl">Projects</h2>
        <button className="bg-[#f29235] text-white py-2 px-3 rounded-md text-sm">
          + Add Project
        </button>
      </div>

      {/* content */}
      {isClient && (
        <Table className="mt-5" columns={columns} dataSource={projects} />
      )}
    </div>
  )
}

export default Projects
