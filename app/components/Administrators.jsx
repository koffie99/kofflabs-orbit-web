"use client"
import { Table } from "antd"
import React, { useEffect, useState } from "react"
import { HiOutlineDotsVertical } from "react-icons/hi"

const Administrators = () => {
  const [admins, setAdmins] = useState([])

  // get all admins
  const getAllAdmins = async () => {
    try {
      const requestOptions = {
        method: "GET",
        redirect: "follow",
      }

      await fetch("https://api.kofflabs.com/api/v1/admins/all", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          setAdmins(result?.admins)
        })
        .catch((error) => console.error(error))
    } catch (err) {
      console.log(err)
    }
  }

  // init
  useEffect(() => {
    getAllAdmins()
  }, [])

  // columns
  const columns = [
    {
      title: "#",
      render: (_value, _record, index) => <p>{index + 1}</p>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_, record) => (
        <div className="flex items-center">
          <p className="capitalize">
            {record.firstName} {record.lastName}
          </p>
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (_, record) => <p className="lowercase">{record?.email}</p>,
    },
    {
      title: "Status",
      dataIndex: "isBlocked",
      key: "isBlocked",
      render: (_, record) => (
        <p className={`text-${record.status === "active" ? "green" : "red"}`}>
          {record?.isBlocked ? "Blocked" : "Active"}
        </p>
      ),
    },
    {
      title: "Actions",
      render: (_, record) => (
        <div>
          <HiOutlineDotsVertical />
        </div>
      ),
    },
  ]

  return (
    <div className="bg-white w-full p-5 rounded-lg shadow">
      {/* header */}
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-xl">Administrators</h2>
        <button className="bg-[#f29235] text-white py-2 px-3 rounded-md text-sm">
          + Add Administrator
        </button>
      </div>

      {/* content */}
      <Table className="mt-5" columns={columns} dataSource={admins} />
    </div>
  )
}

export default Administrators
