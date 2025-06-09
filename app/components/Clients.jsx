"use client";

import React, { useEffect, useState } from "react";
import EntityLength from "../uibits/EntityLength";
import {
  Skeleton,
  Table,
  Modal,
  Popconfirm,
  ConfigProvider,
  theme,
} from "antd";
import formatDate from "../utils/formatDate";
import { CiEdit } from "react-icons/ci";
import { GoTrash } from "react-icons/go";
import { MdOutlineVisibility } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import FormattedDate from "../uibits/FormatDate";
import baseUrl from "../utils/baseUrl";
import SweetList from "../uibits/SweetList";

// icons
import { FaRegBuilding } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { MdOutlineCall } from "react-icons/md";
import { HiOutlineLocationMarker } from "react-icons/hi";

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [loadingClients, setLoadingClients] = useState(false);
  const [openAddClientModal, setOpenAddClientModal] = useState(false);
  const [openClientDetailModal, setOpenClientDetailModal] = useState(false);
  const [openUpdateClientModal, setOpenUpdateClientModal] = useState(false);
  const [addingClient, setAddingClient] = useState(false);

  // client details
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientAddress, setClientAddress] = useState("");

  // selected client values
  const [selectedClientName, setSelectedClientName] = useState("");
  const [selectedClientEmail, setSelectedClientEmail] = useState("");
  const [selectedClientPhone, setSelectedClientPhone] = useState("");
  const [selectedClientAddress, setSelectedClientAddress] = useState("");

  // open details modal
  const openDetailsModal = (cName, cEmail, cPhone, cAddress) => {
    setSelectedClientName(cName);
    setSelectedClientEmail(cEmail);
    setSelectedClientPhone(cPhone);
    setSelectedClientAddress(cAddress);
    setOpenClientDetailModal(true);
  };

  const getAllClients = async () => {
    try {
      setLoadingClients(true);
      const res = await fetch(`${baseUrl}/clients/all`);
      const result = await res.json();
      setClients(result.clients || []);
      setLoadingClients(false);
    } catch (err) {
      console.error(err);
      setLoadingClients(false);
    }
  };

  // add a client
  const addClient = async () => {
    try {
      setAddingClient(true);

      const raw = JSON.stringify({
        name: clientName,
        email: clientEmail,
        phone: clientPhone,
        address: clientAddress,
      });

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Crucial
        },
        body: raw,
        redirect: "follow",
      };

      const res = await fetch(`${baseUrl}/clients/create`, requestOptions);

      const result = await res.json();

      if (result.msg === "client added successfully") {
        toast.success("Client added successfully");
        setAddingClient(false);
        getAllClients();
        setOpenAddClientModal(false);

        // Optional: reset form fields
        setClientName("");
        setClientEmail("");
        setClientPhone("");
        setClientAddress("");
      } else {
        toast.error(result.msg || "Failed to add client");
        setAddingClient(false);
      }
    } catch (err) {
      console.error("Add Client Error:", err);
      toast.error("An error occurred while adding client");
      setAddingClient(false);
    }
  };

  // delete client
  const deleteClient = async (clientId) => {
    try {
      const requestOptions = {
        method: "DELETE",
        redirect: "follow",
      };

      await fetch(`${baseUrl}/clients/delete/${clientId}`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result.msg === "client deleted successfully") {
            toast.success("Client deleted successfully");
            getAllClients();
          } else {
            toast.error("Unable to delele client");
          }
        })
        .catch((error) => console.error(error));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllClients();
  }, []);

  const columns = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
      render: (_, record) => <p className="capitalize">{record?.name}</p>,
    },
    { title: "Email", key: "email", dataIndex: "email" },
    { title: "Phone", key: "phone", dataIndex: "phone" },
    {
      title: "Address",
      key: "address",
      dataIndex: "address",
      render: (_, record) => <p className="capitalize">{record?.address}</p>,
    },
    {
      title: "Date Added",
      key: "dateCreated",
      dataIndex: "dateCreated",
      render: (_, record) => <FormattedDate date={record?.dateCreated} />,
    },
    {
      title: "Actions",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          {/* <div className="p-2 rounded-full hover:ring-1 hover:ring-[#ccc] cursor-pointer">
            <MdOutlineVisibility
              className="text-md"
              onClick={() =>
                openDetailsModal(
                  record.name,
                  record.email,
                  record.phone,
                  record.address
                )
              }
            />
          </div> */}
          <div className="p-2 rounded-full hover:ring-1 hover:ring-[#ccc] cursor-pointer">
            <CiEdit className="text-md" />
          </div>
          <Popconfirm
            description="Wanna delete this client?"
            onConfirm={() => deleteClient(record._id)}
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
  ];

  return (
    <div className="bg-[#131313] shadow rounded-lg">
      <div className="p-5 flex items-center justify-between">
        <EntityLength entityName="Clients" entityCount={clients.length} />
        <button
          className="bg-[#30508a] text-white py-2 px-3 rounded-md text-sm"
          onClick={() => setOpenAddClientModal(true)}
        >
          + Add Client
        </button>
      </div>

      <div className="p-3 pb-6">
        {loadingClients ? (
          <Skeleton active />
        ) : (
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
              dataSource={clients}
              rowKey={(record) => record._id}
            />
          </ConfigProvider>
        )}
      </div>

      {/* add client modal */}
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
          open={openAddClientModal}
          onCancel={() => setOpenAddClientModal(false)}
          title="Add Client"
          footer={false}
        >
          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Name"
              className="bg-neutral-800 text-neutral-300 p-2 rounded-md"
              onChange={(e) => setClientName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Email"
              className="bg-neutral-800 text-neutral-300 p-2 rounded-md"
              onChange={(e) => setClientEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="Phone"
              className="bg-neutral-800 text-neutral-300 p-2 rounded-md"
              onChange={(e) => setClientPhone(e.target.value)}
            />
            <input
              type="text"
              placeholder="Address"
              className="bg-neutral-800 text-neutral-300 p-2 rounded-md"
              onChange={(e) => setClientAddress(e.target.value)}
            />
            <button
              className="bg-[#30508a] text-white p-2 mt-1 rounded-lg text flex items-center justify-center"
              onClick={() => addClient()}
            >
              {addingClient ? (
                <Image
                  width={30}
                  height={30}
                  alt="loading anim"
                  src="/gifs/whiteloading.gif"
                />
              ) : (
                "Add Client"
              )}
            </button>
          </div>
        </Modal>

        {/* client detail modal */}
        <Modal
          open={openClientDetailModal}
          title={selectedClientName}
          onCancel={() => setOpenClientDetailModal(false)}
          footer={true}
        >
          <div className="flex flex-col gap-2 mt-3">
            <SweetList Icon={FaRegBuilding} name={selectedClientName} />
            <SweetList Icon={MdOutlineMailOutline} name={selectedClientEmail} />
            <SweetList Icon={MdOutlineCall} name={selectedClientPhone} />
            <SweetList
              Icon={HiOutlineLocationMarker}
              name={selectedClientAddress}
            />

            <button className="mt-5 ring-1 ring-[#ccc] text-[#313131] p-2 rounded">
              Send Message
            </button>
          </div>
        </Modal>
      </ConfigProvider>

      <Toaster />
    </div>
  );
};

export default Clients;
