"use client"
import { Modal, Table } from "antd"
import Image from "next/image"
import React, { useEffect, useState } from "react"
import { ToastContainer, toast } from "react-toastify"

const Departments = () => {
  const [departments, setDepartments] = useState([])
  const [openAddModal, setOpenAddModal] = useState(false)
  const [deptName, setDeptName] = useState("")
  const [adding, setAdding] = useState(false)

  // handle add department
  const addDepartment = async () => {
    if (!deptName) {
      toast.error("Please enter deptarment name")
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

        await fetch(
          "https://api.kofflabs.com/api/v1/departments/create",
          requestOptions
        )
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
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <div className="flex gap-x-2">
          <button className="bg-[#f29235] text-white py-2 px-3 rounded-md text-sm">
            Edit
          </button>
          <button
            className="bg-red-500 text-white py-2 px-3 rounded-md text-sm"
            onClick={() => handleDelete(record._id)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ]

  return (
    <div className="bg-white w-full p-5 rounded-lg shadow">
      {/* header */}
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-xl">Departments</h2>
        <button
          className="bg-[#f29235] text-white py-2 px-3 rounded-md text-sm"
          onClick={() => setOpenAddModal(true)}
        >
          + Add Department
        </button>
      </div>

      {/* content */}
      <Table className="mt-5" columns={columns} dataSource={departments} />

      {/* add department modal */}
      <Modal
        open={openAddModal}
        footer={false}
        onCancel={() => setOpenAddModal(false)}
        title="Add Department"
      >
        <div className="flex flex-col gap-3">
          <input
            type="text"
            className="bg-[#f9fafd] rounded-lg p-2 border-[1px] border-[#ccc]"
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

      <ToastContainer />
    </div>
  )
}

export default Departments
