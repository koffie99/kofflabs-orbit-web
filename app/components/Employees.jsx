import React, { useState, useEffect, useRef } from "react"
import EntityLength from "../uibits/EntityLength"
import { Table, Popconfirm, Modal, Divider, Skeleton } from "antd"
import baseUrl from "../utils/baseUrl"
import formatDate from "../utils/formatDate"
import { toast, Toaster } from "react-hot-toast"

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
  const [loadingEmployees, setLoadingEmployees] = useState(false)
  const [openAddEmployeeModal, setOpenAddEmployeeModal] = useState(false)
  const [openUpdateEmployeeModal, setOpenUpdateEmployeeModal] = useState(false)
  const [addingEmployee, setAddingEmployee] = useState(false)
  const [updatingEmployee, setUpdatingEmployee] = useState(false)

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

  // adding a new employee details
  const fileInputPhoto = useRef(null)
  const fileInputCV = useRef(null)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    address: "",
    nationality: "",
    employmentDate: "",
    employmentTerminationDate: "",
    role: "",
    salary: "",
    status: "",
    isFired: "",
    promotedTo: "",
    bankName: "",
    bankBranch: "",
    accountName: "",
    accountNumber: "",
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

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
    setSelectedEmployeeEmployementStartDate(employee.employmentDate)
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
      setLoadingEmployees(true)
      const requestOptions = {
        method: "GET",
        redirect: "follow",
      }

      await fetch(`${baseUrl}/api/v1/employees/all`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          setEmployees(result.employees || [])
          setLoadingEmployees(false)
        })
        .catch((error) => console.error(error))
    } catch (err) {
      console.log(err)
      setLoadingEmployees(false)
    }
  }

  // delete employee
  // const deleteEmployee = async (employeeId) => {
  //   try {
  //     const requestOptions = {
  //       method: "DELETE",
  //       redirect: "follow",
  //     }

  //     await fetch(
  //       `https://api.kofflabs.com/api/v1/employees/delete/${employeeId}`,
  //       requestOptions
  //     )
  //       .then((response) => response.json())
  //       .then((result) => {
  //         if (result.msg === "employee deleted successfully") {
  //           toast.success("Employee deleted successfully")
  //           getAllEmployees()
  //         } else {
  //           toast.error("Unable to delete employee")
  //         }
  //       })
  //       .catch((error) => console.error(error))
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  const deleteEmployee = async (employeeId) => {
    try {
      const requestOptions = {
        method: "DELETE",
        redirect: "follow",
      }

      const res = await fetch(
        `https://api.kofflabs.com/api/v1/employees/delete/${employeeId}`,
        requestOptions
      )
      const result = await res.json()

      if (result.msg === "employee deleted successfully") {
        toast.success("Employee deleted successfully")
        getAllEmployees()
      } else {
        toast.error("unable to delete employee")
      }
    } catch (err) {
      console.error(err)
      toast.error("an error occurred")
    }
  }

  // init
  useEffect(() => {
    getAllEmployees()
  }, [])

  // update employee
  const updateEmployee = async () => {
    try {
      setUpdatingEmployee(true)
      const formdata = new FormData()
      if (fileInputPhoto.current?.files[0]) {
        formdata.append("photo", fileInputPhoto.current.files[0])
      }
      if (fileInputCV.current?.files[0]) {
        formdata.append("cv", fileInputCV.current.files[0])
      }

      for (const key in formData) {
        formdata.append(key, formData[key])
      }

      const requestOptions = {
        method: "PUT",
        body: formdata,
        redirect: "follow",
      }

      const response = await fetch(
        `https://api.kofflabs.com/api/v1/employees/update/${selectedEmployeeEmployeeId}`,
        requestOptions
      )
      const result = await response.json()

      if (result.msg === "employee updated successfully") {
        toast.success("Employee updated successfully")
        setOpenUpdateEmployeeModal(false)
        setUpdatingEmployee(false)
        getAllEmployees()
      } else {
        toast.error("unable to update employee")
        setUpdatingEmployee(false)
      }
    } catch (err) {
      console.error(err)
      toast.error("an error occurred")
      setUpdatingEmployee(false)
    }
  }

  // add an employee
  const addEmployee = async () => {
    try {
      setAddingEmployee(true)
      const formdata = new FormData()
      formdata.append("photo", fileInputPhoto.current.files[0])
      formdata.append("cv", fileInputCV.current.files[0])
      for (const key in formData) {
        formdata.append(key, formData[key])
      }

      const requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow",
      }

      const response = await fetch(
        "https://api.kofflabs.com/api/v1/employees/create",
        requestOptions
      )
      const result = await response.json()
      if (result.msg === "employee added successfully") {
        toast.success("Employee added successfully")
        setOpenAddEmployeeModal(false)
        setAddingEmployee(false)
        getAllEmployees()
      } else {
        toast.error("Unable to add employee")
        setAddingEmployee(false)
      }
    } catch (err) {
      console.error(err)
      setAddingEmployee(false)
    }
  }

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
        <div className="flex items-center gap-1">
          <div
            className="p-2 rounded-full hover:ring-1 hover:ring-[#ccc] cursor-pointer"
            onClick={() => handleOpenEmployeeDetailsModal(record)}
          >
            <MdOutlineVisibility className="text-md" />
          </div>
          <div
            className="p-2 rounded-full hover:ring-1 hover:ring-[#ccc] cursor-pointer"
            onClick={() => {
              setFormData({
                firstName: record.firstName,
                lastName: record.lastName,
                email: record.email,
                phone: record.phone,
                gender: record.gender,
                address: record.address,
                nationality: record.nationality,
                employmentDate: record.employmentDate,
                role: record.role,
                salary: record.salary,
                status: record.status,
                isFired: record.isFired,
                promotedTo: record.promotedTo,
                bankName: record.bankName,
                bankBranch: record.bankBranch,
                accountName: record.accountName,
                accountNumber: record.accountNumber,
              })
              setSelectedEmployeeEmployeeId(record._id)
              setOpenUpdateEmployeeModal(true)
            }}
          >
            <CiEdit className="text-md" />
          </div>
          <Popconfirm
            description="Wanna delete this client?"
            okText="Delete"
            onConfirm={() => deleteEmployee(record._id)}
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
    <div className="bg-[#131313] rounded-lg shadow">
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
        {loadingEmployees ? (
          <Skeleton active />
        ) : (
          <Table
            dataSource={employees}
            columns={columns}
            rowKey={(record) => record._id}
          />
        )}
      </div>

      {/* add employee modal */}
      <Modal
        title="Add New Employee"
        open={openAddEmployeeModal}
        onCancel={() => setOpenAddEmployeeModal(false)}
        onOk={addEmployee}
        okText={
          addingEmployee ? (
            <Image
              width={10}
              height={10}
              alt="loading anim"
              src="/gifs/whiteloading.gif"
            />
          ) : (
            "Add Employee"
          )
        }
        okButtonProps={{
          style: { backgroundColor: "#F29235", color: "white" },
        }}
        cancelText="Cancel"
        width={800}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[70vh] overflow-y-auto pr-2">
          {[
            { name: "firstName", label: "First Name" },
            { name: "lastName", label: "Last Name" },
            { name: "email", label: "Email", type: "email" },
            { name: "phone", label: "Phone" },
            { name: "gender", label: "Gender" },
            { name: "address", label: "Address" },
            { name: "nationality", label: "Nationality" },
            { name: "employmentDate", label: "Employment Date", type: "date" },
            // {
            //   name: "employmentTerminationDate",
            //   label: "Termination Date",
            //   type: "date",
            // },
            { name: "role", label: "Role" },
            { name: "salary", label: "Salary" },
            // { name: "status", label: "Status" },
            // { name: "isFired", label: "Is Fired" },
            // { name: "promotedTo", label: "Promoted To" },
            { name: "bankName", label: "Bank Name" },
            { name: "bankBranch", label: "Bank Branch" },
            { name: "accountName", label: "Account Name" },
            { name: "accountNumber", label: "Account Number" },
          ].map(({ name, label, type = "text" }) => (
            <div key={name}>
              <label className="block mb-1 text-sm font-medium">{label}</label>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="w-full ring-1 ring-[#ccc] p-2 rounded-md"
              />
            </div>
          ))}

          <div>
            <label className="block mb-1 text-sm font-medium">Photo</label>
            <input
              type="file"
              ref={fileInputPhoto}
              accept="image/*"
              className="w-full ring-1 ring-[#ccc] p-2 rounded-md"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">CV (PDF)</label>
            <input
              type="file"
              ref={fileInputCV}
              accept="application/pdf"
              className="w-full ring-1 ring-[#ccc] p-2 rounded-md"
            />
          </div>
        </div>
      </Modal>

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
        <div className="mt-5 flex flex-col gap-3">
          <PersonaList
            name={`${selectedEmployeeFirstName} ${selectedEmployeeLastName}`}
            Icon={GoPerson}
            desc="Full Name"
          />
          <PersonaList
            name={selectedEmployeeEmail}
            Icon={GoPerson}
            desc="Email"
          />
          <PersonaList
            name={selectedEmployeePhone}
            Icon={GoPerson}
            desc="Phone"
          />
          <PersonaList
            name={selectedEmployeeAddress}
            Icon={GoPerson}
            desc="Address"
          />
          <PersonaList
            name={selectedEmployeeRole}
            Icon={GoPerson}
            desc="Role"
          />
          <PersonaList
            name={`GHS ${selectedEmployeeSalary || 0.0}`}
            Icon={GoPerson}
            desc="Salary"
          />
          <PersonaList
            name={formatDate(selectedEmployeeEmployementStartDate)}
            Icon={GoPerson}
            desc="Employment Date"
          />
          <Divider className="my-4" />
          <div className="flex items-center justify-stretch w-full gap-2">
            <button className="ring-1 ring-[#ccc] p-2 rounded-md w-full hover:bg-[#F39136] hover:ring-0 hover:text-white employee-action-btn">
              Send Message
            </button>
            <button className="ring-1 ring-[#ccc] p-2 rounded-md w-full  hover:bg-[#F39136] hover:ring-0 hover:text-white employee-action-btn">
              Send Money
            </button>
            <button className="ring-1 ring-[#ccc] p-2 rounded-md w-full  hover:bg-[#F39136] hover:ring-0 hover:text-white employee-action-btn">
              Assign Task
            </button>
          </div>
        </div>
      </Modal>

      {/* update employee modal */}
      <Modal
        title="Update Employee"
        open={openUpdateEmployeeModal}
        onCancel={() => setOpenUpdateEmployeeModal(false)}
        onOk={updateEmployee}
        okText={
          updatingEmployee ? (
            <Image
              width={10}
              height={10}
              alt="loading anim"
              src="/gifs/whiteloading.gif"
            />
          ) : (
            "Update Employee"
          )
        }
        okButtonProps={{
          style: { backgroundColor: "#F29235", color: "white" },
        }}
        cancelText="Cancel"
        width={800}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[70vh] overflow-y-auto">
          <input
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            className="border p-2 rounded"
          />
          <input
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className="border p-2 rounded"
          />
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="border p-2 rounded"
          />
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="border p-2 rounded"
          />
          <input
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            className="border p-2 rounded"
          />
          <input
            name="nationality"
            value={formData.nationality}
            onChange={handleChange}
            placeholder="Nationality"
            className="border p-2 rounded"
          />
          <input
            name="employmentDate"
            type="date"
            value={formData.employmentDate}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            name="employmentTerminationDate"
            type="date"
            value={formData.employmentTerminationDate}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            name="role"
            value={formData.role}
            onChange={handleChange}
            placeholder="Role"
            className="border p-2 rounded"
          />
          <input
            name="promotedTo"
            value={formData.promotedTo}
            onChange={handleChange}
            placeholder="Promoted To"
            className="border p-2 rounded"
          />
          <input
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            placeholder="Salary"
            className="border p-2 rounded"
          />
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="">Select Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <select
            name="isFired"
            value={formData.isFired}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="false">Not Fired</option>
            <option value="true">Fired</option>
          </select>
          <input
            name="bankName"
            value={formData.bankName}
            onChange={handleChange}
            placeholder="Bank Name"
            className="border p-2 rounded"
          />
          <input
            name="bankBranch"
            value={formData.bankBranch}
            onChange={handleChange}
            placeholder="Bank Branch"
            className="border p-2 rounded"
          />
          <input
            name="accountName"
            value={formData.accountName}
            onChange={handleChange}
            placeholder="Account Name"
            className="border p-2 rounded"
          />
          <input
            name="accountNumber"
            value={formData.accountNumber}
            onChange={handleChange}
            placeholder="Account Number"
            className="border p-2 rounded"
          />
          <input
            type="file"
            name="photo"
            onChange={(e) =>
              setFileData((prev) => ({ ...prev, photo: e.target.files[0] }))
            }
            className="border p-2 rounded"
          />
          <input
            type="file"
            name="cv"
            onChange={(e) =>
              setFileData((prev) => ({ ...prev, cv: e.target.files[0] }))
            }
            className="border p-2 rounded"
          />
        </div>
      </Modal>
      <Toaster />
    </div>
  )
}

export default Employees
