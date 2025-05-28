"use client"
import { Modal, Select, Table, ConfigProvider, theme } from "antd"
import Image from "next/image"
import React, { useEffect, useState } from "react"
import { Toaster, toast } from "react-hot-toast"
import baseUrl from "../utils/baseUrl"
import EntityLength from "../uibits/EntityLength"

const Projects = () => {
  const [projects, setProjects] = useState([])
  const [isClient, setIsClient] = useState(false)
  const [openAddModal, setOpenAddModal] = useState(false)
  const [assignMembers, setAssignMembers] = useState(false)
  const [adding, setAdding] = useState(false)

  // project details
  const [projectPhoto, setProjectPhoto] = useState("")
  const [projectName, setProjectName] = useState("")
  const [projectStartDate, setProjectStartDate] = useState("")
  const [projectEndDate, setProjectEndDate] = useState("")
  const [projectAssignees, setProjectAssignees] = useState([])
  const [projectLoading, setProjectLoading] = useState(false)

  console.log("Assigned Members: ", assignMembers)

  // Ensure client-side rendering only
  useEffect(() => {
    setIsClient(true)
    getAllProjects()
  }, [])

  // get all projects
  const getAllProjects = async () => {
    try {
      setProjectLoading(true)
      const response = await fetch(`${baseUrl}/api/v1/projects/all`)
      const result = await response.json()
      setProjects(result?.projects || [])
      setProjectLoading(false)
    } catch (err) {
      console.error(err)
      setProjectLoading(false)
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
      title: "Logo",
      key: "photo",
      dataIndex: "photo",
      render: (_, record) =>
        record?.photo ? (
          <Image
            src={record.photo}
            alt={record.name || "Project Image"}
            width={40}
            height={40}
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

  // add a project
  const addProject = async () => {
    try {
      setAdding(true)
      const formdata = new FormData()
      formdata.append("photo", fileInput.files[0], projectPhoto)
      formdata.append("name", projectName.trim().toLowerCase())
      formdata.append("startDate", projectStartDate.trim())
      formdata.append("endDate", projectEndDate.trim())
      formdata.append("assignees", projectAssignees)
      formdata.append("status", "in progress")
      formdata.append("isComplete", false)

      const requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow",
      }

      await fetch(
        "https://api.kofflabs.com/api/v1/projects/create",
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          if (result.msg === "project added successfully") {
            getAllProjects()
            setAdding(false)
            toast.success("Project added successfully")
            setOpenAddModal(false)
          } else {
            toast.error(result.msg)
            setAdding(false)
          }
        })
        .catch((error) => console.error(error))
    } catch (err) {
      console.log(err)
      toast.error(err)
    }
  }

  return (
    <div className="bg-[#131313] w-full p-5 rounded-lg shadow">
      {/* header */}
      <div className="flex items-center justify-between">
        <div>
          <EntityLength entityCount={projects?.length} entityName="Projects" />
        </div>
        <button
          className="bg-[#f29235] text-white py-2 px-3 rounded-md text-sm"
          onClick={() => setOpenAddModal(true)}
        >
          + Add Project
        </button>
      </div>

      {/* content */}
      {isClient && (
        <ConfigProvider
                              theme={{
                                algorithm: theme.darkAlgorithm,
                                token: {
                                  colorPrimary: '#08807a',
                                  colorBgContainer: '#181818',
                                  colorBgElevated: '#181818',
                                  colorBgLayout: '#181818',
                                  colorBgSpotlight: '#181818',
                                  colorBgFloating: '#181818',
                                  colorBgSecondary: '#181818',
                                  colorBgSecondaryHover: '#181818',
                                  colorBgSecondaryActive: '#181818',
                                  colorBorder: '#2d2d2d',
                                  colorBorderSecondary: '#2d2d2d',
                                  colorBorderTertiary: '#2d2d2d',
                                  colorBorderQuaternary: '#2d2d2d',
                                  colorBorderHover: '#2d2d2d',
                                  colorBorderActive: '#2d2d2d',
                                  colorBorderSelected: '#2d2d2d',
                                  colorBorderSelectedHover: '#2d2d2d',
                                  colorBorderSelectedActive: '#2d2d2d',
                                  colorBorderDisabled: '#2d2d2d',
                                  colorBorderDisabledHover: '#2d2d2d',
                                  colorBorderDisabledActive: '#2d2d2d',
                                  colorText: '#ffffff',
                                  colorTextSecondary: '#ffffff',
                                  colorTextTertiary: '#ffffff',
                                  colorTextQuaternary: '#ffffff',
                                  colorTextPlaceholder: '#ffffff',
                                  colorTextDisabled: '#ffffff',
                                  colorTextHeading: '#ffffff',
                                  colorTextTitle: '#ffffff',
                                  colorTextDescription: '#ffffff',
                                  colorTextLightSolid: '#ffffff',
                                  colorTextLight: '#ffffff',
                                  colorTextMuted: '#ffffff',
                                  colorTextLighter: '#ffffff'
                                }
                              }}
                            >
        <Table className="mt-5" columns={columns} dataSource={projects} />
        </ConfigProvider>
      )}

      {/* add project modal */}
      <Modal
        open={openAddModal}
        onCancel={() => setOpenAddModal(false)}
        footer={false}
        title="Add Project"
      >
        <div className="flex flex-col gap-3">
          <input
            type="file"
            className="ring-1 ring-[#ccc] p-2 rounded-md"
            onChange={(e) => setProjectPhoto(e.target.files[0])}
          />
          <input
            type="text"
            className="ring-1 ring-[#ccc] p-2 rounded-md"
            placeholder="Project name"
            onChange={(e) => setProjectName(e.target.value)}
          />
          <input
            type="date"
            className="ring-1 ring-[#ccc] p-2 rounded-md"
            placeholder="Start Date"
            onChange={(e) => setProjectStartDate(e.target.value)}
          />
          <input
            type="date"
            className="ring-1 ring-[#ccc] p-2 rounded-md"
            placeholder="End Date"
            onChange={(e) => setProjectEndDate(e.target.value)}
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
              <Select
                mode="multiple"
                className="w-full"
                onChange={(values) => setProjectAssignees(values)}
              >
                <option value="" selected disabled>
                  Select Members
                </option>
                {/* fetch members */}
              </Select>
            </div>
          )}
          <button
            className="p-2 bg-[#f29235] rounded-lg text-white"
            onClick={() => addProject()}
          >
            {adding ? "Adding Project...." : "Add Project"}
          </button>
        </div>
      </Modal>

      <Toaster />
    </div>
  )
}

export default Projects
