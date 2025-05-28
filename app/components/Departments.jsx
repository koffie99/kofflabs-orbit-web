"use client"
import { Modal, Popconfirm, Table, ConfigProvider, theme } from "antd"
import Image from "next/image"
import React, { useEffect, useState } from "react"
// import { ToastContainer, toast } from "react-toastify"
import { Toaster, toast } from "react-hot-toast"
import { CiEdit } from "react-icons/ci"
import { GoTrash } from "react-icons/go"
import EntityLength from "../uibits/EntityLength"
import baseUrl from "../utils/baseUrl"
import formatDate from "../utils/formatDate"

const Departments = () => {
  const [departments, setDepartments] = useState([])
  const [openAddModal, setOpenAddModal] = useState(false)
  const [openUpdateModal, setOpenUpdateModal] = useState(false)
  const [deptName, setDeptName] = useState("")
  const [adding, setAdding] = useState(false)
  const [loading, setLoading] = useState(false)
  const [selectedDeptName, setSelectedDeptName] = useState("")
  const [selectedDeptId, setSelectedDeptId] = useState("")
  const [newDeptName, setNewDeptName] = useState("")

  // reset new dept name
  useEffect(() => {
    setNewDeptName(selectedDeptName)
  }, [selectedDeptName])

  // handle add department
  const addDepartment = async () => {
    if (!deptName) {
      toast.error("Please enter department name")
      setAdding(false)
    } else {
      try {
        setAdding(true)
        const myHeaders = new Headers()
        myHeaders.append("Content-Type", "application/json")

        const raw = JSON.stringify({
          name: deptName.trim().toLowerCase(),
        })

        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        }

        await fetch(`${baseUrl}/api/v1/departments/create`, requestOptions)
          .then((response) => response.json())
          .then((result) => {
            if (result.msg === "department created successfully") {
              toast.success(`${deptName} added successfull`)
              setOpenAddModal(false)
              setDeptName("")
              setAdding(false)
              getAllDepartments()
            } else {
              toast.error(result.msg)
            }
          })
          .catch((error) => console.error(error))
      } catch (err) {
        console.log(err)
        toast.error(`Error: ${err}`)
      }
    }
  }

  // get all departments
  const getAllDepartments = async () => {
    try {
      const requestOptions = {
        method: "GET",
        redirect: "follow",
      }

      await fetch(
        "https://api.kofflabs.com/api/v1/departments/all",
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          setDepartments(result?.departments)
        })
        .catch((error) => console.error(error))
    } catch (err) {
      console.log(err)
    }
  }

  // delete a department
  const deleteDepartment = async (deptId) => {
    try {
      const requestOptions = {
        method: "DELETE",
        redirect: "follow",
      }

      await fetch(
        `https://api.kofflabs.com/api/v1/departments/delete/${deptId}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          if (result.msg === "department deleted successfully") {
            toast.success("Department deleted successfully")
            getAllDepartments()
          } else {
            toast.error(result.msg)
          }
        })
        .catch((error) => console.error(error))
    } catch (err) {
      console.log(err)
    }
  }

  // update a department
  const updateDepartment = async () => {
    try {
      setLoading(true)
      const myHeaders = new Headers()
      myHeaders.append("Content-Type", "application/json")

      const raw = JSON.stringify({
        name: newDeptName.trim().toLowerCase(),
      })

      const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      }

      await fetch(
        `https://api.kofflabs.com/api/v1/departments/update/${selectedDeptId}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          if (result.msg === "department updated successfully") {
            getAllDepartments()
            setLoading(false)
            toast.success("Department updated successfully")
            setOpenUpdateModal(false)
          } else {
            toast.error(result.msg)
            setLoading(false)
          }
        })
        .catch((error) => console.error(error))
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  }

  // init
  useEffect(() => {
    getAllDepartments()
  }, [])

  // columns
  const columns = [
    {
      title: "#",
      key: "index",
      render: (_value, _record, index) => <p>{index + 1}</p>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_, record) => (
        <div>
          <p className="capitalize">{record?.name}</p>
        </div>
      ),
    },
    {
      title: "No. of employees",
      dataIndex: "numEmployees",
      key: "numEmployees",
    },
    {
      title: "Date Created",
      dataIndex: "dateCreated",
      key: "dateCreated",
      render: (_, record) => <p>{formatDate(record?.dateCreated)}</p>,
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <div className="flex gap-x-2">
          <button
            className="py-2 px-3 rounded-md text-sm"
            onClick={() => {
              setSelectedDeptName(record.name)
              setSelectedDeptId(record._id)
              setOpenUpdateModal(true)
            }}
          >
            <CiEdit />
          </button>
          <Popconfirm
            title={`Wanna delete ${record.name}`}
            okText="Delete Department"
            okButtonProps={{
              style: { backgroundColor: "tomato", color: "white" },
            }}
            onConfirm={() => deleteDepartment(record._id)}
          >
            <button className="py-1 px-3 rounded-md text-sm">
              <GoTrash />
            </button>
          </Popconfirm>
        </div>
      ),
    },
  ]

  return (
    <div className="bg-[#131313] w-full p-5 rounded-lg shadow">
      {/* header */}
      <div className="flex items-center justify-between">
        <div>
          <EntityLength
            entityCount={departments?.length}
            entityName="Departments"
          />
        </div>
        <button
          className="bg-[#f29235] text-white py-2 px-3 rounded-md text-sm"
          onClick={() => setOpenAddModal(true)}
        >
          + Add Department
        </button>
      </div>

      {/* content */}
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
          <Table className="mt-5" columns={columns} dataSource={departments} />
      </ConfigProvider>

      {/* add department modal */}
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
      <Modal
        open={openAddModal}
        footer={false}
        onCancel={() => setOpenAddModal(false)}
        title="Add Department"
      >
        <div className="flex flex-col gap-3">
          <input
            type="text"
            className="bg-[#131313] rounded-lg p-2 text-neutral-300 border-none outline-none"
            placeholder="Department Name"
            onChange={(e) => setDeptName(e.target.value)}
          />
          <button
            className="bg-[#f29235] text-white p-2 rounded-lg text flex items-center justify-center"
            onClick={() => addDepartment()}
          >
            {adding ? (
              <Image
                width={30}
                height={30}
                alt="loading anim"
                src="/gifs/whiteloading.gif"
              />
            ) : (
              "Add Department"
            )}
          </button>
        </div>
      </Modal>
      </ConfigProvider>


      {/* update model */}
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
      <Modal
        open={openUpdateModal}
        title="Update Department"
        onCancel={() => setOpenUpdateModal(false)}
        footer={false}
      >
        <div className="mt-2">
          <input
            type="text"
            className="bg-neutral-800 text-neutral-300 py-2 px-2 rounded-lg w-full capitalize"
            onChange={(e) => setNewDeptName(e.target.value)}
            value={newDeptName}
          />
          <button
            className="bg-[#f29235] text-white mt-2 p-2 rounded-lg text flex items-center justify-center w-full"
            onClick={() => updateDepartment()}
          >
            {loading ? (
              <Image
                width={30}
                height={30}
                alt="loading anim"
                src="/gifs/whiteloading.gif"
              />
            ) : (
              "Update Department"
            )}
          </button>
        </div>
      </Modal>
      </ConfigProvider>

      <Toaster />
    </div>
  )
}

export default Departments
