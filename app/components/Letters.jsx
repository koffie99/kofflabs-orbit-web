import { Modal, Table, Popconfirm, ConfigProvider, theme } from "antd";
import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { TfiWrite } from "react-icons/tfi";
import baseUrl from "../utils/baseUrl";
import { FiEye } from "react-icons/fi";
import { FiEdit3 } from "react-icons/fi";
import { GoTrash } from "react-icons/go";
import EntityLength from "../uibits/EntityLength";
import { FiExternalLink } from "react-icons/fi";
import { motion } from "motion/react";

const Letters = () => {
  const [letters, setLetters] = useState([]);
  const [openAddLetterModal, setOpenAddLetterModal] = useState(false);
  const [openLetterModal, setOpenLetterModal] = useState(false);
  const [writing, setWriting] = useState(false);
  const [letterLink, setLetterLink] = useState("");

  // data
  const [recipientName, setRecipientName] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [recipientRole, setRecipientRole] = useState("");
  const [recipientPhone, setRecipientPhone] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");
  const [salutation, setSalutation] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  // write letter
  const writeLetter = async () => {
    try {
      setWriting(true);
      setOpenLetterModal(true);
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        recipientName: recipientName.trim(),
        recipientEmail: recipientEmail.trim(),
        recipientRole: recipientRole.trim(),
        recipientPhone: recipientPhone.trim(),
        recipientAddress: recipientAddress.trim(),
        salutation: salutation,
        title: title.trim(),
        body: body.trim(),
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      await fetch(`${baseUrl}/letters/create`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result.msg === "letter created successfully") {
            getAllLetters();
            setLetterLink(result?.pdfUrl);
            toast.success("Letter written successfully");

            setOpenAddLetterModal(false);
            setWriting(false);
          } else {
            toast.error("Unable to write letter");
            setWriting(false);
          }
        })
        .catch((error) => console.error(error));
    } catch (err) {
      console.log(err);
      setWriting(false);
    }
  };

  // get all letters
  const getAllLetters = async () => {
    try {
      const requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      await fetch(`${baseUrl}/letters/all`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          setLetters(result?.letters);
        })
        .catch((error) => console.error(error));
    } catch (err) {
      console.log(err);
    }
  };

  // handle open write letter modal
  const handleOpenWriteLetterModal = () => {
    setOpenAddLetterModal(true);
  };

  // delete a letter
  const deleteLetter = async (letter_id) => {
    try {
      const requestOptions = {
        method: "DELETE",
        redirect: "follow",
      };

      await fetch(`${baseUrl}/letters/delete/${letter_id}`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result.msg === "letter deleted successfully") {
            getAllLetters();
            toast.success("Letter deleted successfully");
          } else {
            toast.error("Unable to delete letter");
          }
        })
        .catch((error) => console.error(error));
    } catch (err) {
      console.log(err);
    }
  };

  // init
  useEffect(() => {
    getAllLetters();
  }, []);

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
          <Popconfirm
            description="Delete this letter?"
            className="cursor-pointer"
            okText="Delete"
            okButtonProps={{
              style: { backgroundColor: "tomato", color: "white" },
            }}
            onConfirm={() => deleteLetter(record._id)}
          >
            <GoTrash />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-[#131313] w-full p-5 rounded-lg shadow">
      {/* header */}
      <div className="flex items-center justify-between">
        <EntityLength entityName="Letters" entityCount={letters?.length || 0} />
        <button
          className="bg-[#f39136] text-white py-2 px-3 rounded-md text-sm flex items-center gap-1"
          onClick={() => handleOpenWriteLetterModal()}
        >
          <TfiWrite />
          <p>Write A Letter</p>
        </button>
      </div>

      {/* content */}
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
          className="mt-5"
          columns={columns}
          dataSource={letters}
          pagination={{ pageSize: 5 }}
        />
      </ConfigProvider>
      {/* write letter modal */}

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
                className="bg-neutral-800 text-neutral-300 p-2 rounded-md mt-2 w-full"
                onChange={(e) => setRecipientName(e.target.value)}
              />
            </div>
            <div className="w-full">
              <p>Recipient Email</p>
              <input
                type="text"
                placeholder="Recipient Email"
                className="bg-neutral-800 text-neutral-300 p-2 rounded-md mt-2 w-full"
                onChange={(e) => setRecipientEmail(e.target.value)}
              />
            </div>
            <div className="w-full">
              <p>Recipient Role</p>
              <input
                type="text"
                placeholder="Recipient Role"
                className="bg-neutral-800 text-neutral-300 p-2 rounded-md mt-2 w-full"
                onChange={(e) => setRecipientRole(e.target.value)}
              />
            </div>
            <div className="w-full">
              <p>Recipient Phone</p>
              <input
                type="text"
                placeholder="Recipient Phone"
                className="bg-neutral-800 text-neutral-300 p-2 rounded-md mt-2 w-full"
                onChange={(e) => setRecipientPhone(e.target.value)}
              />
            </div>
            <div className="w-full">
              <p>Recipient Address</p>
              <input
                type="text"
                placeholder="Recipient Address"
                className="bg-neutral-800 text-neutral-300 p-2 rounded-md mt-2 w-full"
                onChange={(e) => setRecipientAddress(e.target.value)}
              />
            </div>
            <div className="w-full">
              <p>Salutation</p>
              <input
                type="text"
                placeholder="Salutation"
                className="bg-neutral-800 text-neutral-300 p-2 rounded-md mt-2 w-full"
                onChange={(e) => setSalutation(e.target.value)}
              />
            </div>
            <div className="w-full">
              <p>Title</p>
              <input
                type="text"
                placeholder="Title"
                className="bg-neutral-800 text-neutral-300 p-2 rounded-md mt-2 w-full"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="w-full">
              <p>Body</p>
              <input
                type="text"
                placeholder="Body"
                className="bg-neutral-800 text-neutral-300 p-2 rounded-md mt-2 w-full"
                onChange={(e) => setBody(e.target.value)}
              />
            </div>
            <button
              className="p-2 bg-[#30508a] text-white rounded-md"
              onClick={() => writeLetter()}
            >
              {writing ? "Writing Letter..." : "Write Letter"}
            </button>
          </div>
        </Modal>
      </ConfigProvider>

      {/* generated letter page */}
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
          // title="Generated Letter"
          open={openLetterModal}
          onCancel={() => setOpenLetterModal(false)}
          footer={null}
          style={{ width: "700px" }}
        >
          <div className="flex flex-col gap-5 items-center">
            {writing ? (
              "Writing letter..."
            ) : (
              // <iframe src={letterLink} className="w-full h-[90vh]"></iframe>
              <embed
                src={letterLink}
                type="application/pdf"
                className="w-full h-[90vh]"
              />
            )}
            {/* open in a new tab button with icon */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="p-2 bg-[#30508a] text-white rounded-md mt-5 display flex items-center gap-3"
              onClick={() => window.open(letterLink, "_blank")}
            >
              <FiExternalLink className="text-xl" />
              Open in a new tab
            </motion.button>
          </div>
        </Modal>
      </ConfigProvider>

      <Toaster />
    </div>
  );
};

export default Letters;
