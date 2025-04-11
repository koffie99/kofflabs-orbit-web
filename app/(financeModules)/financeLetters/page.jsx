import { Modal, Table } from "antd"
import React, { useEffect, useState } from "react"
import { Toaster, toast } from "react-hot-toast"
import { TfiWrite } from "react-icons/tfi"
import { FiEye } from "react-icons/fi"
import { FiEdit3 } from "react-icons/fi"
import { GoTrash } from "react-icons/go"
import baseUrl from "@/app/utils/baseUrl"

const FinanceLetters = () => {
  const [letters, setLetters] = useState([])
  const [openAddLetterModal, setOpenAddLetterModal] = useState(false)
  const [openLetterModal, setOpenLetterModal] = useState(false)
  const [writing, setWriting] = useState(false)
  const [letterLink, setLetterLink] = useState("")

  // data
  const [recipientName, setRecipientName] = useState("")
  const [recipientEmail, setRecipientEmail] = useState("")
  const [recipientRole, setRecipientRole] = useState("")
  const [recipientPhone, setRecipientPhone] = useState("")
  const [recipientAddress, setRecipientAddress] = useState("")
  const [salutation, setSalutation] = useState("")
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")

  // write letter
  const writeLetter = async () => {
    try {
      setWriting(true)
      setOpenLetterModal(true)
      const myHeaders = new Headers()
      myHeaders.append("Content-Type", "application/json")

      const raw = JSON.stringify({
        recipientName: recipientName.trim(),
        recipientEmail: recipientEmail.trim(),
        recipientRole: recipientRole.trim(),
        recipientPhone: recipientPhone.trim(),
        recipientAddress: recipientAddress.trim(),
        salutation: salutation,
        title: title.trim(),
        body: body.trim(),
      })

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      }

      await fetch(`${baseUrl}/api/v1/letters/create`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result.msg === "letter created successfully") {
            getAllLetters()
            setLetterLink(result.pdfUrl)
            toast.success("Letter written successfully")  

            setOpenAddLetterModal(false)
            setWriting(false)
          } else {
            toast.error("Unable to write letter")
            setWriting(false)
          }
        })
        .catch((error) => console.error(error))
    } catch (err) {
      console.log(err)
      setWriting(false)
    }
  }

  // get all letters
  const getAllLetters = async () => {
    try {
      const requestOptions = {
        method: "GET",
        redirect: "follow",
      }

      await fetch(`${baseUrl}/api/v1/letters/all`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          setLetters(result?.letters)
        })
        .catch((error) => console.error(error))
    } catch (err) {
      console.log(err)
    }
  }

  // handle open write letter modal
  const handleOpenWriteLetterModal = () => {
    setOpenAddLetterModal(true)
  }

  // init
  useEffect(() => {
    getAllLetters()
  }, [])

  const columns = [
    {
      title: "Recipient Name",
      dataIndex: "recipientName",
      key: "recipientName",
    },
    {
      title: "Recipient Email",
      dataIndex: "recipientEmail",
      key: "recipientEmail",
    },
    {
      title: "Recipient Phone",
      dataIndex: "recipientPhone",
      key: "recipientPhone",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Actions",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <FiEye />
          <FiEdit3 />
          <GoTrash />
        </div>
      ),
    },
  ]

  return (
    <div className="bg-white w-full p-5 rounded-lg shadow">
      {/* header */}
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-xl">Letters</h2>
        <button
          className="bg-[#f29235] text-white py-2 px-3 rounded-md text-sm flex items-center gap-1"
          onClick={() => handleOpenWriteLetterModal()}
        >
          <TfiWrite />
          <p>Write A Letter</p>
        </button>
      </div>

      {/* content */}
      <Table className="mt-5" columns={columns} dataSource={letters} />

      {/* write letter modal */}
      <Modal
        title="Write a letter"
        open={openAddLetterModal}
        onCancel={() => setOpenAddLetterModal(false)}
        footer={null}
      >
        <div className="mt-4 flex flex-col gap-4">
          <div className="w-full">
            <p>Recipient Name</p>
            <input
              type="text"
              placeholder="Recipient Name"
              className="ring-1 ring-[#ccc] p-2 rounded-md mt-2 w-full"
              onChange={(e) => setRecipientName(e.target.value)}
            />
          </div>
          <div className="w-full">
            <p>Recipient Email</p>
            <input
              type="text"
              placeholder="Recipient Email"
              className="ring-1 ring-[#ccc] p-2 rounded-md mt-2 w-full"
              onChange={(e) => setRecipientEmail(e.target.value)}
            />
          </div>
          <div className="w-full">
            <p>Recipient Role</p>
            <input
              type="text"
              placeholder="Recipient Role"
              className="ring-1 ring-[#ccc] p-2 rounded-md mt-2 w-full"
              onChange={(e) => setRecipientRole(e.target.value)}
            />
          </div>
          <div className="w-full">
            <p>Recipient Phone</p>
            <input
              type="text"
              placeholder="Recipient Phone"
              className="ring-1 ring-[#ccc] p-2 rounded-md mt-2 w-full"
              onChange={(e) => setRecipientPhone(e.target.value)}
            />
          </div>
          <div className="w-full">
            <p>Recipient Address</p>
            <input
              type="text"
              placeholder="Recipient Address"
              className="ring-1 ring-[#ccc] p-2 rounded-md mt-2 w-full"
              onChange={(e) => setRecipientAddress(e.target.value)}
            />
          </div>
          <div className="w-full">
            <p>Salutation</p>
            <input
              type="text"
              placeholder="Salutation"
              className="ring-1 ring-[#ccc] p-2 rounded-md mt-2 w-full"
              onChange={(e) => setSalutation(e.target.value)}
            />
          </div>
          <div className="w-full">
            <p>Title</p>
            <input
              type="text"
              placeholder="Title"
              className="ring-1 ring-[#ccc] p-2 rounded-md mt-2 w-full"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="w-full">
            <p>Body</p>
            <input
              type="text"
              placeholder="Body"
              className="ring-1 ring-[#ccc] p-2 rounded-md mt-2 w-full"
              onChange={(e) => setBody(e.target.value)}
            />
          </div>
          <button
            className="p-2 bg-[#f39136] text-white rounded-md"
            onClick={() => writeLetter()}
          >
            {writing ? "Writing Letter..." : "Write Letter"}
          </button>
        </div>
      </Modal>

      {/* generated letter page */}
      <Modal
        // title="Generated Letter"
        open={openLetterModal}
        onCancel={() => setOpenLetterModal(false)}
        footer={null}
      >
        {writing ? (
          "Writing letter..."
        ) : (
          <iframe src={letterLink} className="w-full h-[80vh]"></iframe>
        )}
      </Modal>

      <Toaster />
    </div>
  )
}

export default FinanceLetters
