import { Table } from "antd"
import React, { useState, useEffect } from "react"
import {Modal} from 'antd'
import baseUrl from "../utils/baseUrl"
import formatDate from "../utils/formatDate"
import EntityLength from "../uibits/EntityLength"
import { CiEdit } from "react-icons/ci"
import { GoTrash } from "react-icons/go"
import { MdOutlineVisibility } from "react-icons/md"

const Clients = () => {
  const [clients, setClients] = useState("")
  const [clientsLoading, setClientsLoading] = useState(false)
  const [openAddClientModal, setOpenAddClientModal] = useState(false)

  // get all clients
  const getAllClients = async () => {
    try {
      setClientsLoading(true)
      const requestOptions = {
        method: "GET",
        redirect: "follow",
      }

      await fetch(`${baseUrl}/api/v1/clients/all`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          setClients(result?.clients)
          setClientsLoading(true)
        })
        .catch((error) => console.error(error))
    } catch (err) {
      console.log(err)
    }
  }

  // table columns
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone No.",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Date Added",
      dataIndex: "dateCreated",
      key: "dateCreated",
      render: (_, record) => <p>{formatDate(record?.dateCreated)}</p>,
    },
    {
      title: "Action",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <MdOutlineVisibility />
          <CiEdit />
          <GoTrash />
        </div>
      ),
    },
  ]

  // init
  useEffect(() => {
    getAllClients()
  }, [])

  return (
    <div className="bg-white w-full p-5 rounded-lg shadow">
      {/* header */}
      <div className="flex items-center justify-between">
        <div>
          <EntityLength entityCount={clients?.length} entityName="Clients" />
        </div>
        <button className="bg-[#f29235] text-white py-2 px-3 rounded-md text-sm" onClick={(e) => setOpenAddClientModal(true)}>
          + Add Client
        </button>
      </div>

      {/* content */}
      <Table className="mt-5" columns={columns} dataSource={clients} />

      {/* add client modal */}
      <Modal open={openAddClientModal} title="Add Client" footer={false}>
        <div>
          <input type="text" placeholder="Name"/>
          <input type="text" placeholder="Email"/>
        </div>
      </Modal>

    </div>
  )
}

export default Clients
