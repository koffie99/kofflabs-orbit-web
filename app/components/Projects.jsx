"use client"
import { Modal, Select, Table } from "antd"
import Image from "next/image"
import React, { useEffect, useState } from "react"

const Projects = () => {
  const [projects, setProjects] = useState([])
  const [isClient, setIsClient] = useState(false)
  const [openAddModal, setOpenAddModal] = useState(false)
  const [assignMembers, setAssignMembers] = useState(false)

  console.log("Assigned Members: ", assignMembers)

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

  // delete project
  const deleteProject = async (projectId) => {
    try {
    } catch (err) {
      console.log(err)
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
      title: "Assignees",
      key: "assignees",
      dataIndex: "assignees",
      render: (_, record) => <p>{(record?.assignees).length}</p>,
    },
    {
      title: "Actions",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <button>Edit</button>
          <button>Delete</button>
        </div>
      ),
    },
  ]

  return (
    <div className="bg-white w-full p-5 rounded-lg shadow">
      {/* header */}
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-xl">Projects</h2>
        <button
          className="bg-[#f29235] text-white py-2 px-3 rounded-md text-sm"
          onClick={() => setOpenAddModal(true)}
        >
          + Add Project
        </button>
      </div>

      {/* content */}
      {isClient && (
        <Table className="mt-5" columns={columns} dataSource={projects} />
      )}

      {/* add project modal */}
      <Modal
        open={openAddModal}
        onCancel={() => setOpenAddModal(false)}
        footer={false}
        title="Add Project"
      >
        <div className="flex flex-col gap-3">
          <input type="file" className="ring-1 ring-[#ccc] p-2 rounded-md" />
          <input
            type="text"
            className="ring-1 ring-[#ccc] p-2 rounded-md"
            placeholder="Project name"
          />
          <input
            type="date"
            className="ring-1 ring-[#ccc] p-2 rounded-md"
            placeholder="Start Date"
          />
          <input
            type="date"
            className="ring-1 ring-[#ccc] p-2 rounded-md"
            placeholder="End Date"
          />
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              onChange={(e) => setAssignMembers(e.target.checked)}
            />
            <p>Assign project members</p>
          </div>
          {assignMembers && (
            <div>
              <Select mode="multiple" className="w-full">
                <option value="">Select Member</option>
                {/* fetch members */}
              </Select>
            </div>
          )}
          <input type="text" className="ring-1 ring-[#ccc] p-2 rounded-md" />
          <button className="p-2 bg-[#f29235] rounded-sm text-white">
            Add Project
          </button>
        </div>
      </Modal>
    </div>
  )
}

export default Projects
