"use client";
import React, { useState, useEffect } from "react";
import MoneyCard from "../uibits/MoneyCard";
import { Modal, Select, Table, ConfigProvider, theme } from "antd";
import { toast, Toaster } from "react-hot-toast";
import baseUrl from "../utils/baseUrl";
import Image from "next/image";
const { Option } = Select;
import { IoLinkOutline } from "react-icons/io5";
import { motion } from "motion/react";

// imports
import { IoCopyOutline } from "react-icons/io5";
import { FiExternalLink } from "react-icons/fi";
import copyText from "../utils/copyText";
import formatDate from "../utils/formatDate";

const Finance = () => {
  const [openPaymentLinkModal, setOpenPaymentLinkModal] = useState(false);
  const [openLinkModal, setOpenLinkModal] = useState(false);
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [projectId, setProjectId] = useState("");
  const [clientId, setClientId] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [generating, setGenerating] = useState(false);
  const [paymentLink, setPaymentLink] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientAmount, setClientAmount] = useState(0);
  const [paymentDescription, setPaymentDescription] = useState("");
  const [projectName, setProjectName] = useState("");
  const [payments, setPayments] = useState([]);
  const [payRecord, setPayRecord] = useState([]);
  const [paymentInfo, setPaymentInfo] = useState({});

  // get all projects
  const getProjects = async () => {
    try {
      const requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      await fetch(`${baseUrl}/projects/all`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          setProjects(result.projects || []);
        })
        .catch((error) => console.error(error));
    } catch (err) {
      console.log(err);
    }
  };

  // get all clients
  const getClients = async () => {
    try {
      const requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      await fetch(`${baseUrl}/clients/all`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          setClients(result.clients || []);
        })
        .catch((error) => console.error(error));
    } catch (err) {
      console.log(err);
    }
  };

  // create payment link
  const createPaymentLink = async (e) => {
    e.preventDefault();
    try {
      setGenerating(true);
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        projectId: projectId,
        clientId: clientId,
        amount: amount,
        description: description,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      await fetch(`${baseUrl}/hubtelPayment/takePayment`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result.msg === "payment initiated successfully") {
            setPaymentInfo(result);
            getPayments();
            toast.success("Payment link created successfully");
            setPaymentLink(result?.payment_url);
            setGenerating(false);
            setOpenPaymentLinkModal(false);
            setOpenLinkModal(true);
          } else {
            toast.error("Unable to create payment link");
            setGenerating(false);
          }
        })
        .catch((error) => console.error(error));
    } catch (err) {
      console.log(err);
      toast.error("Unable to create payment link");
      setGenerating(false);
    }
  };

  // get all payments
  const getPayments = async () => {
    try {
      const requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      await fetch(`${baseUrl}/hubtelPayment/allPayments`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          setPayments(result.payments);
        })
        .catch((error) => console.error(error));
    } catch (err) {
      console.log(err);
    }
  };

  // init
  useEffect(() => {
    getClients();
    getProjects();
    getPayments();
  }, []);

  // table columns
  const columns = [
    {
      title: "Client Name",
      render: (_, record) => <p>{record?.client[0]?.name || "N/A"}</p>,
    },
    // {
    //   title: "Client Email",
    //   render: (_, record) => <p>{record?.client[0]?.email || "N/A"}</p>,
    // },
    {
      title: "Amount (GHS)",
      key: "amount",
      dataIndex: "amount",
    },
    {
      title: "Purpose",
      key: "description",
      dataIndex: "description",
      render: (_, record) => <p>{record.description || "Other"}</p>,
    },
    {
      title: "Status",
      render: (_, record) => {
        const status = record.status?.toLowerCase();

        const statusStyles = {
          success: {
            text: "text-emerald-700",
            bg: "bg-[rgba(5,150,105,0.1)]", // emerald-700 @ 30%
          },
          pending: {
            text: "text-amber-700",
            bg: "bg-[rgba(180,83,9,0.1)]", // amber-700 @ 30%
          },
          failed: {
            text: "text-rose-700",
            bg: "bg-[rgba(190,18,60,0.1)]", // rose-700 @ 30%
          },
          cancelled: {
            text: "text-slate-600",
            bg: "bg-[rgba(71,85,105,0.1)]", // slate-600 @ 30%
          },
        };

        const { bg, text } = statusStyles[status] || {
          bg: "bg-[rgba(67,56,202,0.3)]", // indigo-700 fallback
          text: "text-indigo-700",
        };

        return (
          <span
            className={`inline-block px-3 py-1 rounded-full text-sm font-medium capitalize ${bg} ${text}`}
          >
            {status || "unknown"}
          </span>
        );
      },
    },
    {
      title: "Division",
      key: "projectName",
      dataIndex: "projectName",
      render: (_, record) => <p>{record.project[0]?.name || "Other"}</p>,
    },
    {
      title: "Date Initiated",
      key: "dateCreated",
      dataIndex: "dateCreated",
      render: (_, record) => <p>{formatDate(record.dateCreated)}</p>,
    },
    {
      title: "Action",
      render: (_, record) => (
        <motion.button
          whileTap={{ scale: 0.8 }}
          className="p-2 bg-[rgba(243,145,54,0.1)] rounded"
        >
          <IoLinkOutline />
        </motion.button>
      ),
    },
  ];

  // open payment link modal
  const handleOpenPayRecord = (pRecord) => {
    setPayRecord(pRecord);
  };

  return (
    <div className="">
      <div className="flex items-center justify-between bg-[#131313] w-full p-5 rounded-lg shadow-2xl">
        <h2 className="font-semibold text-xl text-neutral-300">Finance</h2>
        <div className="#f29235 flex items-center gap-2">
          <button className="ring-1 ring-neutral-300 text-neutral-300 text-sm rounded-lg px-4 py-2 mr-0">
            + Add Expense
          </button>
          <button
            className="bg-[#f39136] text-white text-sm rounded-lg px-4 py-2"
            onClick={() => setOpenPaymentLinkModal(true)}
          >
            + Create Payment Link
          </button>
        </div>
      </div>

      {/* payment stats */}
      {/* <div className="grid grid-cols-3 gap-4 mt-6">
        <MoneyCard title="Total Sales (2025)" amount={100000} type="gross" />
        <MoneyCard title="Sales This Month" amount={30000} type="monthly" />
        <MoneyCard title="Sales Today" amount={20000} type="today" />
      </div> */}

      <div className="bg-[#131313] p-4 rounded-lg shadow mt-5">
        <ConfigProvider
          theme={{
            algorithm: theme.darkAlgorithm,
            token: {
              colorPrimary: "#08807a",
              colorBgContainer: "#181818",
              colorBgElevated: "#181818",
              colorBgLayout: "#181818",
              colorBgSpotlight: "#181818",
              colorBgFloating: "#181818",
              colorBgSecondary: "#181818",
              colorBgSecondaryHover: "#181818",
              colorBgSecondaryActive: "#181818",
              colorBorder: "#2d2d2d",
              colorBorderSecondary: "#2d2d2d",
              colorBorderTertiary: "#2d2d2d",
              colorBorderQuaternary: "#2d2d2d",
              colorBorderHover: "#2d2d2d",
              colorBorderActive: "#2d2d2d",
              colorBorderSelected: "#2d2d2d",
              colorBorderSelectedHover: "#2d2d2d",
              colorBorderSelectedActive: "#2d2d2d",
              colorBorderDisabled: "#2d2d2d",
              colorBorderDisabledHover: "#2d2d2d",
              colorBorderDisabledActive: "#2d2d2d",
              colorText: "#ffffff",
              colorTextSecondary: "#ffffff",
              colorTextTertiary: "#ffffff",
              colorTextQuaternary: "#ffffff",
              colorTextPlaceholder: "#ffffff",
              colorTextDisabled: "#ffffff",
              colorTextHeading: "#ffffff",
              colorTextTitle: "#ffffff",
              colorTextDescription: "#ffffff",
              colorTextLightSolid: "#ffffff",
              colorTextLight: "#ffffff",
              colorTextMuted: "#ffffff",
              colorTextLighter: "#ffffff",
            },
          }}
        >
          <Table
            columns={columns}
            dataSource={payments}
            pagination={{ pageSize: 5 }}
            rowKey={(record) => record._id}
          />
        </ConfigProvider>
      </div>

      {/* create payment link modal */}
      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
          token: {
            colorPrimary: "#08807a",
            colorBgContainer: "#181818",
            colorBgElevated: "#181818",
            colorBgLayout: "#181818",
            colorBgSpotlight: "#181818",
            colorBgFloating: "#181818",
            colorBgSecondary: "#181818",
            colorBgSecondaryHover: "#181818",
            colorBgSecondaryActive: "#181818",
            colorBorder: "#2d2d2d",
            colorBorderSecondary: "#2d2d2d",
            colorBorderTertiary: "#2d2d2d",
            colorBorderQuaternary: "#2d2d2d",
            colorBorderHover: "#2d2d2d",
            colorBorderActive: "#2d2d2d",
            colorBorderSelected: "#2d2d2d",
            colorBorderSelectedHover: "#2d2d2d",
            colorBorderSelectedActive: "#2d2d2d",
            colorBorderDisabled: "#2d2d2d",
            colorBorderDisabledHover: "#2d2d2d",
            colorBorderDisabledActive: "#2d2d2d",
            colorText: "#ffffff",
            colorTextSecondary: "#ffffff",
            colorTextTertiary: "#ffffff",
            colorTextQuaternary: "#ffffff",
            colorTextPlaceholder: "#ffffff",
            colorTextDisabled: "#ffffff",
            colorTextHeading: "#ffffff",
            colorTextTitle: "#ffffff",
            colorTextDescription: "#ffffff",
            colorTextLightSolid: "#ffffff",
            colorTextLight: "#ffffff",
            colorTextMuted: "#ffffff",
            colorTextLighter: "#ffffff",
          },
        }}
      >
        <Modal
          open={openPaymentLinkModal}
          onCancel={() => setOpenPaymentLinkModal(false)}
          footer={false}
          title="Create Payment Link"
        >
          <form
            onSubmit={createPaymentLink}
            className="flex mt-3 flex-col gap-2"
          >
            <Select
              showSearch
              className="w-full bg-neutral-800 rounded-lg"
              placeholder="Select a division "
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
              className="w-full bg-neutral-800 rounded-lg"
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
              step="any"
              placeholder="Amount"
              className="w-full rounded-md p-[6px] bg-neutral-800"
              onChange={(e) => setAmount(e.target.value)}
            />
            <input
              placeholder="Description"
              className="w-full rounded-md p-[6px] bg-neutral-800"
              onChange={(e) => setDescription(e.target.value)}
            />
            <button
              className="bg-[#f29235] text-white py-2 px-3 rounded-md text-sm flex items-center justify-center"
              type="submit"
              onClick={createPaymentLink}
            >
              {generating ? (
                <Image
                  width={30}
                  height={30}
                  alt="loading anim"
                  src="/gifs/whiteloading.gif"
                />
              ) : (
                "Create payment link"
              )}
            </button>
          </form>
        </Modal>

        {/* <Modal
          open={openPaymentLinkModal}
          onCancel={() => setOpenPaymentLinkModal(false)}
          footer={false}
          title="Payment Link"
        >
          <p>P LINK</p>
        </Modal> */}
      </ConfigProvider>

      {/* payment link modal */}
      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
          token: {
            colorPrimary: "#08807a",
            colorBgContainer: "#181818",
            colorBgElevated: "#181818",
            colorBgLayout: "#181818",
            colorBgSpotlight: "#181818",
            colorBgFloating: "#181818",
            colorBgSecondary: "#181818",
            colorBgSecondaryHover: "#181818",
            colorBgSecondaryActive: "#181818",
            colorBorder: "#2d2d2d",
            colorBorderSecondary: "#2d2d2d",
            colorBorderTertiary: "#2d2d2d",
            colorBorderQuaternary: "#2d2d2d",
            colorBorderHover: "#2d2d2d",
            colorBorderActive: "#2d2d2d",
            colorBorderSelected: "#2d2d2d",
            colorBorderSelectedHover: "#2d2d2d",
            colorBorderSelectedActive: "#2d2d2d",
            colorBorderDisabled: "#2d2d2d",
            colorBorderDisabledHover: "#2d2d2d",
            colorBorderDisabledActive: "#2d2d2d",
            colorText: "#ffffff",
            colorTextSecondary: "#ffffff",
            colorTextTertiary: "#ffffff",
            colorTextQuaternary: "#ffffff",
            colorTextPlaceholder: "#ffffff",
            colorTextDisabled: "#ffffff",
            colorTextHeading: "#ffffff",
            colorTextTitle: "#ffffff",
            colorTextDescription: "#ffffff",
            colorTextLightSolid: "#ffffff",
            colorTextLight: "#ffffff",
            colorTextMuted: "#ffffff",
            colorTextLighter: "#ffffff",
          },
        }}
      >
        <Modal
          open={openLinkModal}
          title="Payment Link"
          onCancel={() => {
            getPayments();
            setOpenLinkModal(false);
          }}
          footer={false}
        >
          <p>
            {paymentInfo?.clientName} is about to make a payment of{" "}
            <span className="font-bold text-[#F39136]">
              {" "}
              GHS {paymentInfo?.payment_data?.amount}
            </span>{" "}
            for{" "}
            <span className="lowercase">
              {paymentInfo?.payment_data?.description} under the{" "}
              {paymentInfo.projectName} division.
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
      </ConfigProvider>

      <Toaster />
    </div>
  );
};

export default Finance;
