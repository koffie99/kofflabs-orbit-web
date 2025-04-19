import React, { useState, useEffect } from "react"
import MoneyCard from "../uibits/MoneyCard"
import { Modal, Select } from "antd"
import { toast, Toaster } from "react-hot-toast"
import baseUrl from "../utils/baseUrl"
import Image from "next/image"
const { Option } = Select

// imports
import { IoCopyOutline } from "react-icons/io5"
import { FiExternalLink } from "react-icons/fi"
import copyText from "../utils/copyText"

const Finance = () => {
  const [openPaymentLinkModal, setOpenPaymentLinkModal] = useState(false)
  const [openLinkModal, setOpenLinkModal] = useState(false)
  const [projects, setProjects] = useState([])
  const [clients, setClients] = useState([])
  const [projectId, setProjectId] = useState("")
  const [clientId, setClientId] = useState("")
  const [amount, setAmount] = useState("")
  const [description, setDescription] = useState("")
  const [generating, setGenerating] = useState(false)
  const [paymentLink, setPaymentLink] = useState("")
  const [clientName, setClientName] = useState("")
  const [clientAmount, setClientAmount] = useState(0)
  const [paymentDescription, setPaymentDescription] = useState("")
  const [projectName, setProjectName] = useState("")

  // get all projects
  const getProjects = async () => {
    try {
      const requestOptions = {
        method: "GET",
        redirect: "follow",
      }

      await fetch(
        "https://api.kofflabs.com/api/v1/projects/all",
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          setProjects(result.projects || [])
        })
        .catch((error) => console.error(error))
    } catch (err) {
      console.log(err)
    }
  }

  // get all clients
  const getClients = async () => {
    try {
      const requestOptions = {
        method: "GET",
        redirect: "follow",
      }

      await fetch(`${baseUrl}/api/v1/clients/all`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          setClients(result.clients || [])
        })
        .catch((error) => console.error(error))
    } catch (err) {
      console.log(err)
    }
  }

  // create payment link
  const createPaymentLink = async (e) => {
    e.preventDefault()
    try {
      setGenerating(true)
      const myHeaders = new Headers()
      myHeaders.append("Content-Type", "application/json")

      const raw = JSON.stringify({
        projectId: projectId.trim(),
        clientId: clientId.trim(),
        amount: amount.trim(),
        description: description.trim(),
      })

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      }

      await fetch(
        "https://api.kofflabs.com/api/v1/payments/create",
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          if (result.msg === "payment initialized successfully") {
            setPaymentLink(result.paymentUrl)
            setClientName(result.paymentData.clientName)
            setClientAmount(result.paymentData.amount)
            setPaymentDescription(result.paymentData.description)
            setProjectName(result.paymentData.projectName)
            toast.success("Payment link created successfully")
            setGenerating(false)
            setOpenPaymentLinkModal(false)
            setOpenLinkModal(true)
          } else {
            toast.error("Unable to create payment link")
            setGenerating(false)
          }
        })
        .catch((error) => console.error(error))
    } catch (err) {
      console.log(err)
      toast.error("Unable to create payment link")
      setGenerating(false)
    }
  }

  // init
  useEffect(() => {
    getClients()
    getProjects()
  }, [])

  return (
    <div className="">
      <div className="flex items-center justify-between bg-white w-full p-5 rounded-lg shadow">
        <h2 className="font-semibold text-xl">Finance</h2>
        <div className="#f29235">
          <button
            className="bg-[#f39136] text-white text-sm rounded-lg px-4 py-2"
            onClick={() => setOpenPaymentLinkModal(true)}
          >
            + Create Payment Link
          </button>
        </div>
      </div>

      {/* payment stats */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        <MoneyCard title="Total Sales (2025)" amount={100000} type="gross" />
        <MoneyCard title="Sales This Month" amount={30000} type="monthly" />
        <MoneyCard title="Sales Today" amount={20000} type="today" />
      </div>

      <Modal
        open={openPaymentLinkModal}
        onCancel={() => setOpenPaymentLinkModal(false)}
        footer={false}
        title="Create Payment Link"
      >
        <form onSubmit={createPaymentLink} className="flex flex-col gap-2">
          <Select
            showSearch
            className="w-full"
            placeholder="Select a project"
            onChange={(value) => setProjectId(value)}
          >
            {projects.map((project) => (
              <Option key={project._id} value={project._id}>
                {project.name}
              </Option>
            ))}
          </Select>
          <Select
            showSearch
            className="w-full"
            placeholder="Select a client"
            onChange={(value) => setClientId(value)}
          >
            {clients.map((client) => (
              <Option key={client._id} value={client._id}>
                {client.name}
              </Option>
            ))}
          </Select>
          <input
            type="number"
            placeholder="Amount"
            className="w-full rounded-md p-[6px] ring-1 ring-[#ccc]"
            onChange={(e) => setAmount(e.target.value)}
          />
          <textarea
            placeholder="Description"
            className="w-full rounded-md p-[6px] ring-1 ring-[#ccc]"
            onChange={(e) => setDescription(e.target.value)}
          />
          <button
            className="bg-[#f29235] text-white py-2 px-3 rounded-md text-sm flex items-center justify-center"
            type="submit"
          >
            {generating ? (
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
        </form>
      </Modal>

      <Modal
        open={openLinkModal}
        title="Payment Link"
        onCancel={() => setOpenLinkModal(false)}
        footer={false}
      >
        <p>
          {clientName} is about to make a payment of{" "}
          <span className="font-bold text-[#F39136]"> GHS {clientAmount}</span>{" "}
          for{" "}
          <span className="lowercase">
            {paymentDescription} under the {projectName} division.
          </span>
        </p>
        <div className="flex items-center gap-3 mt-3">
          <button
            className="flex-[0.5] flex items-center justify-center hover:ring-0 gap-2 ring-1 ring-[#ccc] p-2 rounded-lg text-center hover:bg-[#F39136] hover:text-white"
            onClick={() => copyText(paymentLink)}
          >
            <IoCopyOutline />
            <p>Copy payment link</p>
          </button>
          <a
            href={paymentLink}
            target="_blank"
            className="flex-[0.5] flex items-center justify-center hover:ring-0 gap-2 ring-1 ring-[#ccc] p-2 rounded-lg text-center hover:bg-[#F39136] hover:text-white"
          >
            <FiExternalLink />
            <p>Open payment link</p>
          </a>
        </div>
      </Modal>

      <Toaster />
    </div>
  )
}

export default Finance
