import React, { useState, useEffect } from "react";
import {
  Table,
  Tag,
  Space,
  Spin,
  Button,
  ConfigProvider,
  theme,
  message,
} from "antd";
import { EditOutlined, DeleteOutlined, LinkOutlined } from "@ant-design/icons";
import { format } from "date-fns";
import EntityLength from "../uibits/EntityLength";
import baseUrl from "../utils/baseUrl";

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await fetch(`${baseUrl}/invoices/all`);
        if (!response.ok) {
          throw new Error("Failed to fetch invoices");
        }
        const data = await response.json();
        setInvoices(data.invoices || []);
      } catch (err) {
        console.error("Error fetching invoices:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  const columns = [
    {
      title: "#",
      key: "index",
      render: (_value, _record, index) => (
        <p className="text-white">{index + 1}</p>
      ),
    },
    {
      title: "Client",
      dataIndex: ["invoiceTo", "name"],
      key: "client",
      render: (text) => <p className="text-white">{text}</p>,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => (
        <p className="text-white">{format(new Date(date), "MMM dd, yyyy")}</p>
      ),
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (amount) => (
        <p className="text-white font-medium">
          GHS{" "}
          {amount.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
      ),
    },
    {
      title: "Status",
      key: "status",
      render: () => (
        <Tag
          color="#10b981"
          className="font-medium bg-opacity-10 border-0"
          style={{ background: "rgba(16, 185, 129, 0.1)" }}
        >
          <span className="text-emerald-400">Paid</span>
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="flex gap-x-2">
          <Button
            type="text"
            icon={
              <LinkOutlined className="text-blue-400 hover:text-blue-300" />
            }
            onClick={(e) => {
              e.preventDefault();
              if (record.pdfUrl) {
                window.open(record.pdfUrl, "_blank", "noopener,noreferrer");
              } else {
                message.warning(
                  "This invoice does not have a PDF link available"
                );
              }
            }}
            className="flex items-center justify-center"
          />
          <Button
            type="text"
            icon={
              <EditOutlined className="text-yellow-400 hover:text-yellow-300" />
            }
            onClick={() => console.log("Edit", record._id)}
          />
          <Button
            type="text"
            icon={
              <DeleteOutlined className="text-red-400 hover:text-red-300" />
            }
            onClick={() => console.log("Delete", record._id)}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="bg-[#131313] w-full p-5 rounded-lg shadow">
      {/* header */}
      <div className="flex items-center justify-between">
        <EntityLength entityName="Invoices" entityCount={invoices.length} />
        <button
          className="bg-[#f39136] text-white py-2 px-3 rounded-md text-sm"
          // onClick={() => setOpenAddModal(true)}
        >
          + Add Invoice
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
        <div className="mt-5">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Spin size="large" />
            </div>
          ) : error ? (
            <div className="text-red-400 text-center p-5">
              Error loading invoices: {error}
            </div>
          ) : (
            <Table
              columns={columns}
              dataSource={invoices}
              rowKey="_id"
              pagination={{
                pageSize: 10,
                className: "ant-pagination-item-link",
                itemRender: (_, type, originalElement) => {
                  if (type === "prev" || type === "next") {
                    return (
                      <span className="text-white">
                        {type === "prev" ? "←" : "→"}
                      </span>
                    );
                  }
                  return originalElement;
                },
              }}
            />
          )}
        </div>
      </ConfigProvider>
    </div>
  );
};

export default Invoices;
