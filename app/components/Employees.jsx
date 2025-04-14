import React, { useState, useEffect } from "react"
import EntityLength from "../uibits/EntityLength"
import { Table, Popconfirm, Modal } from "antd"
import baseUrl from "../utils/baseUrl"
import formatDate from "../utils/formatDate"

// icons
import { MdOutlineVisibility } from "react-icons/md"
import { CiEdit } from "react-icons/ci"
import { GoTrash } from "react-icons/go"
import Image from "next/image"
import PersonaList from "../uibits/PersonaList"
import { GoPerson } from "react-icons/go"

const Employees = () => {
  const [employees, setEmployees] = useState([])
  const [openEmployeeDetailModal, setOpenEmployeeDetailModal] = useState(false)
  const [openAddEmployeeModal, setOpenAddEmployeeModal] = useState(false)
  const [openUpdateEmployeeModal, setOpenUpdateEmployeeModal] = useState(false)

  // selected employee
  const [selectedEmployeeFirstName, setSelectedEmployeeFirstName] = useState("")
  const [selectedEmployeeLastName, setSelectedEmployeeLastName] = useState("")
  const [selectedEmployeePhoto, setSelectedEmployeePhoto] = useState("")
  const [selectedEmployeeCV, setSelectedEmployeeCV] = useState("")
  const [selectedEmployeeGender, setSelectedEmployeeGender] = useState("")
  const [selectedEmployeeEmail, setSelectedEmployeeEmail] = useState("")
  const [selectedEmployeePhone, setSelectedEmployeePhone] = useState("")
  const [selectedEmployeeAddress, setSelectedEmployeeAddress] = useState("")
  const [selectedEmployeeNationality, setSelectedEmployeeNationality] =
    useState("")
  const [
    selectedEmployeeEmployementStartDate,
    setSelectedEmployeeEmployementStartDate,
  ] = useState("")
  const [selectedEmployeeRole, setSelectedEmployeeRole] = useState("")
  const [selectedEmployeeSalary, setSelectedEmployeeSalary] = useState("")
  const [selectedEmployeeStatus, setSelectedEmployeeStatus] = useState("")
  const [selectedEmployeeIsFired, setSelectedEmployeeIsFired] = useState(null)
  const [selectedEmployeeBankName, setSelectedEmployeeBankName] = useState("")
  const [selectedEmployeeBankBranch, setSelectedEmployeeBankBranch] =
    useState("")
  const [selectedEmployeeAccountName, setSelectedEmployeeAccountName] =
    useState("")
  const [selectedEmployeeAccountNumber, setSelectedEmployeeAccountNumber] =
    useState("")
  const [selectedEmployeeEmployeeId, setSelectedEmployeeEmployeeId] =
    useState("")
  const [selectedEmployeeDateCreated, setSelectedEmployeeDateCreated] =
    useState("")

  // open employee details modal
  const handleOpenEmployeeDetailsModal = (employee) => {
    setSelectedEmployeeFirstName(employee.firstName)
    setSelectedEmployeeLastName(employee.lastName)
    setSelectedEmployeePhoto(employee.photo)
    setSelectedEmployeeCV(employee.cv)
    setSelectedEmployeeGender(employee.gender)
    setSelectedEmployeeEmail(employee.email)
    setSelectedEmployeePhone(employee.phone)
    setSelectedEmployeeAddress(employee.address)
    setSelectedEmployeeNationality(employee.nationality)
    setSelectedEmployeeEmployementStartDate(employee.employmentStartDate)
    setSelectedEmployeeRole(employee.role)
    setSelectedEmployeeSalary(employee.salary)
    setSelectedEmployeeStatus(employee.status)
    setSelectedEmployeeIsFired(employee.isFired)
    setSelectedEmployeeBankName(employee.bankName)
    setSelectedEmployeeBankBranch(employee.bankBranch)
    setSelectedEmployeeAccountName(employee.accountName)
    setSelectedEmployeeAccountNumber(employee.accountNumber)
    setSelectedEmployeeEmployeeId(employee.employeeId)
    setSelectedEmployeeDateCreated(employee.dateCreated)
    setOpenEmployeeDetailModal(true)
  }

  // get all employees
  const getAllEmployees = async () => {
    try {
      const requestOptions = {
        method: "GET",
        redirect: "follow",
      }

      await fetch(`${baseUrl}/api/v1/employees/all`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          setEmployees(result.employees || [])
        })
        .catch((error) => console.error(error))
    } catch (err) {
      console.log(err)
    }
  }

  // init
  useEffect(() => {
    getAllEmployees()
  }, [])

  // columns
  const columns = [
    {
      title: "Name",
      render: (_, record) => (
        <p className="capitalize">
          {record?.firstName} {record?.lastName}
        </p>
      ),
    },
    // {
    //   title: "Email",
    //   key: "email",
    //   dataIndex: "email",
    // },
    {
      title: "Phone",
      key: "phone",
      dataIndex: "phone",
    },
    {
      title: "Role",
      render: (_, record) => <p className="capitalize">{record?.role}</p>,
    },
    // {
    //   title: "Date Employed",
    //   render: (_, record) => <p>{formatDate(record.employmentDate)}</p>,
    // },
    {
      title: "Status",
      render: (_, record) => {
        const isStatus = record?.status === "active"
        const statusClass = isStatus ? "bg-green" : "bg-orange"

        return (
          <p className={`${statusClass} p-2 rounded-full`}>{record?.status}</p>
        )
      },
    },
    {
      title: "Actions",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <div
            className="p-2 rounded-full hover:ring-1 hover:ring-[#ccc] cursor-pointer"
            onClick={() => handleOpenEmployeeDetailsModal(record)}
          >
            <MdOutlineVisibility className="text-md" />
          </div>
          <div className="p-2 rounded-full hover:ring-1 hover:ring-[#ccc] cursor-pointer">
            <CiEdit className="text-md" />
          </div>
          <Popconfirm
            description="Wanna delete this client?"
            okText="Delete"
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
    <div className="bg-white rounded-lg shadow">
      {/* heading */}
      <div className="p-5 flex items-center justify-between">
        <EntityLength entityName="Employees" entityCount={employees.length} />
        <button
          className="bg-[#f29235] text-white py-2 px-3 rounded-md text-sm"
          onClick={() => setOpenAddEmployeeModal(true)}
        >
          + Add Employee
        </button>
      </div>

      {/* table */}
      <div className="p-3 pb-6">
        <Table
          dataSource={employees}
          columns={columns}
          rowKey={(record) => record._id}
        />
      </div>

      {/* details modal */}
      <Modal
        open={openEmployeeDetailModal}
        title={
          <p className="capitalize">
            {selectedEmployeeFirstName} {selectedEmployeeLastName}
          </p>
        }
        footer={false}
        onCancel={() => setOpenEmployeeDetailModal(false)}
      >
        <div>
          <Image
            width={300}
            height={300}
            alt={selectedEmployeeFirstName}
            src={selectedEmployeePhoto}
            quality={100}
            className="h-[80vh] w-full object-cover rounded-lg"
          />
        </div>
        <div className="mt-3">
          <PersonaList
            name={selectedEmployeeFirstName}
            icon={GoPerson}
            desc="Full Name"
          />
        </div>
      </Modal>
    </div>
  )
}

export default Employees
