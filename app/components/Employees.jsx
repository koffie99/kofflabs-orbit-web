"use client"
import { Table } from "antd"
import React, { useEffect, useState } from "react"
import { CiEdit } from "react-icons/ci"
import { GoTrash } from "react-icons/go"
import baseUrl from "../utils/baseUrl"

const Employees = () => {
  const [employees, setEmployees] = useState("")

  // get all employees
  const getAllEmployess = async () => {
    try {
      const requestOptions = {
        method: "GET",
        redirect: "follow",
      }

      await fetch(`${baseUrl}/api/v1/employees/all`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          setEmployees(result?.employees)
        })
        .catch((error) => console.error(error))
    } catch (err) {
      console.log(err)
    }
  }

  // init
  useEffect(() => {
    getAllEmployess()
  }, [])

  // columns
  const columns = [
    {
      title: "#",
      render: (_value, _record, index) => <p>{index + 1}</p>,
    },
    {
      title: "Name",
      render: (_, record) => (
        <div>
          <p className="capitalize">
            {record?.firstName} {record?.lastName}
          </p>
        </div>
      ),
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
      render: (_, record) => (
        <div>
          <p className="lowercase">{record?.email}</p>
        </div>
      ),
    },
    {
      title: "Phone",
      key: "phone",
      dataIndex: "phone",
    },
    {
      title: "Role",
      key: "role",
      dataIndex: "role",
      render: (_, record) => (
        <div>
          <p className="capitalize">{record?.role}</p>
        </div>
      ),
    },
    {
      title: "Actions",
      render: (_, record) => (
        <div>
          <button>
            <CiEdit />
          </button>
          <button>
            <GoTrash />
          </button>
        </div>
      ),
    },
  ]

  return (
    <div className="bg-white w-full p-5 rounded-lg shadow">
      {/* header */}
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-xl">Employees</h2>
        <button className="bg-[#f29235] text-white py-2 px-3 rounded-md text-sm">
          + Add Employee
        </button>
      </div>

      {/* content */}
      <Table className="mt-5" columns={columns} dataSource={employees} />
    </div>
  )
}

export default Employees
