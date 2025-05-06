"use client"
import { Table, Modal, Select, Popconfirm } from "antd"
import React, { useEffect, useState } from "react"
import { HiOutlineDotsVertical } from "react-icons/hi"
import baseUrl from "../utils/baseUrl"
import { Toaster, toast } from "react-hot-toast"
import { MdOutlineVisibility } from "react-icons/md"
import { CiEdit } from "react-icons/ci"
import { GoTrash } from "react-icons/go"

const Administrators = () => {
  const [admins, setAdmins] = useState([])
  const [openAddModal, setOpenAddModal] = useState(false)
  const [openEditModal, setOpenEditModal] = useState(false)
  const [userTypes, setUserTypes] = useState([])
  const [adding, setAdding] = useState(false)

  // user details
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    userType: "",
    phone: "",
  })

  // add staff
  const addStaff = async (e) => {
    e.preventDefault()
    try {
      setAdding(true)
      const myHeaders = new Headers()
      myHeaders.append("Content-Type", "application/json")

      const raw = JSON.stringify({
        firstName: userDetails.firstName.trim(),
        lastName: userDetails.lastName.trim(),
        email: userDetails.email.trim(),
        userType: userDetails.userType,
        phone: userDetails.phone.trim(),
      })

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      }

      await fetch(`${baseUrl}/api/v1/admins/create`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result.msg === "staff added successfully") {
            setAdding(false)
            toast.success("Staff added successfully")
            setOpenAddModal(false)
            setUserDetails({
              firstName: "",
              lastName: "",
              email: "",
              userType: "",
              phone: "",
            })
            getAllAdmins()
          }
        })
        .catch((error) => console.error(error))
    } catch (err) {
      setAdding(false)
      console.log(err)
    }
  }

  // get all admins
  const getAllAdmins = async () => {
    try {
      const requestOptions = {
        method: "GET",
        redirect: "follow",
      }

      await fetch(`${baseUrl}/api/v1/admins/all`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          setAdmins(result?.admins)
        })
        .catch((error) => console.error(error))
    } catch (err) {
      console.log(err)
    }
  }

  // get user types
  const getUserTypes = async () => {
    try {
      const requestOptions = {
        method: "GET",
        redirect: "follow",
      }

      await fetch(`${baseUrl}/api/v1/userTypes/all`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          setUserTypes(result.userTypes || [])
        })
        .catch((error) => console.error(error))
    } catch (err) {
      console.log(err)
    }
  }

  // init
  useEffect(() => {
    getAllAdmins()
    getUserTypes()
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
        <div className="flex items-center gap-1">
          <div className="p-2 rounded-full hover:ring-1 hover:ring-[#ccc] cursor-pointer">
            <MdOutlineVisibility className="text-md" />
          </div>
          <div className="p-2 rounded-full hover:ring-1 hover:ring-[#ccc] cursor-pointer">
            <CiEdit className="text-md" />
          </div>
          <Popconfirm
            description="Wanna delete this client?"
            okText="Delete"
            onConfirm={() => {}}
            okButtonProps={{
              style: { backgroundColor: "tomato", color: "white" },
            }}
            className="cursor-pointer hover:ring-1 hover:ring-[#ccc] p-2 rounded-full"
          >
            <GoTrash className="text-3xl" />
          </Popconfirm>
        </div>
      ),
    },
  ]

  return (
    <div className="bg-white w-full p-5 rounded-lg shadow">
      {/* header */}
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-xl">Staff</h2>
        <button
          className="bg-[#f29235] text-white py-2 px-3 rounded-md text-sm"
          onClick={() => setOpenAddModal(true)}
        >
          + Add Staff Member
        </button>
      </div>

      {/* content */}
      <Table
        className="mt-5"
        columns={columns}
        dataSource={admins}
        rowKey={(record) => record._id}
      />

      <Modal
        open={openAddModal}
        onCancel={() => setOpenAddModal(false)}
        title="Add Staff"
        footer={false}
      >
        <form onSubmit={addStaff} className="flex flex-col gap-2 w-full">
          <input
            type="text"
            placeholder="First Name"
            className="ring-1 ring-[#ccc] rounded-md py-1 px-2"
            onChange={(e) =>
              setUserDetails({ ...userDetails, firstName: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Last Name"
            className="ring-1 ring-[#ccc] rounded-md py-1 px-2"
            onChange={(e) =>
              setUserDetails({ ...userDetails, lastName: e.target.value })
            }
          />
          <input
            type="email"
            placeholder="Email"
            className="ring-1 ring-[#ccc] rounded-md py-1 px-2"
            onChange={(e) =>
              setUserDetails({ ...userDetails, email: e.target.value })
            }
          />
          <Select
            defaultValue="Select User Type"
            style={{ width: "100%" }}
            options={userTypes.map((type) => ({
              value: type._id,
              label: type.name.charAt(0).toUpperCase() + type.name.slice(1),
            }))}
            onChange={(value) =>
              setUserDetails({ ...userDetails, userType: value })
            }
          />
          <input
            type="text"
            placeholder="Phone"
            className="ring-1 ring-[#ccc] rounded-md py-1 px-2"
            onChange={(e) =>
              setUserDetails({ ...userDetails, phone: e.target.value })
            }
          />
          <button
            type="submit"
            className="p-2 bg-[#f39136] text-white rounded-md"
          >
            {adding ? (
              <Image
                width={30}
                height={30}
                alt="loading anim"
                src="/gifs/whiteloading.gif"
              />
            ) : (
              "Add Staff"
            )}
          </button>
        </form>
      </Modal>

      <Toaster />
    </div>
  )
}

export default Administrators
