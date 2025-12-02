import React, { useState, useEffect } from "react";
import {
  Table,
  Tag,
  Space,
  Spin,
  Button,
  ConfigProvider,
  theme,
  Popconfirm,
} from "antd";
import toast from "react-hot-toast";
import {
  EditOutlined,
  DeleteOutlined,
  LinkOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { format } from "date-fns";
import EntityLength from "../uibits/EntityLength";
import baseUrl from "../utils/baseUrl";
import { Modal, Form, Input, InputNumber, Divider, Select } from "antd";

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [items, setItems] = useState([
    { description: "", price: 0, quantity: 1, total: 0 },
  ]);

  const handleAddItem = () => {
    setItems([...items, { description: "", price: 0, quantity: 1, total: 0 }]);
  };

  const handleRemoveItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const calculateTotal = (items) => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const [createdInvoice, setCreatedInvoice] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCloseSuccessModal = () => {
    setCreatedInvoice(null);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

    try {
      // Validate all form fields
      const values = await form.validateFields();
      const subTotal = calculateTotal(items);
      const tax = 0; // Tax is now 0 as per requirements
      const totalAmount = subTotal + (subTotal * tax) / 100;

      // Find the selected client
      const selectedClient = clients.find(
        (client) => client._id === values.clientId
      );

      if (!selectedClient) {
        throw new Error("Please select a client");
      }

      // Validate items
      if (
        items.length === 0 ||
        items.some(
          (item) => !item.description || item.price <= 0 || item.quantity <= 0
        )
      ) {
        throw new Error("Please add at least one valid item to the invoice");
      }

      const payload = {
        invoiceTo: {
          name: selectedClient.name,
          address: selectedClient.address || "",
        },
        date: new Date().toISOString(),
        items: items.map((item) => ({
          description: item.description,
          price: parseFloat(item.price),
          quantity: parseInt(item.quantity),
          total: parseFloat((item.price * item.quantity).toFixed(2)),
        })),
        subTotal: parseFloat(subTotal.toFixed(2)),
        tax: parseFloat(tax.toFixed(2)),
        paymentInfo: {
          accountNumber: "6013101450",
          accountName: "Kofflabs",
        },
        totalAmount: parseFloat(totalAmount.toFixed(2)),
      };

      console.log("Sending payload:", JSON.stringify(payload, null, 2));

      // Remove /api/v1 from the URL since baseUrl already includes it
      const apiUrl = `${baseUrl}/invoices/create`;
      console.log("API URL:", apiUrl);

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server error:", errorText);
        throw new Error(
          `Server responded with status ${response.status}: ${errorText}`
        );
      }

      const result = await response.json();
      console.log("API Response:", result);

      if (result.msg === "Invoice added successfully") {
        toast.success("Invoice created successfully!");
        setCreatedInvoice(result);
        setIsModalVisible(false);
        form.resetFields();
        setItems([{ description: "", price: 0, quantity: 1, total: 0 }]);

        // Refresh the invoices list
        try {
          const invoicesResponse = await fetch(`${baseUrl}/invoices/all`);
          if (!invoicesResponse.ok) {
            console.error("Failed to refresh invoices list");
          } else {
            const data = await invoicesResponse.json();
            setInvoices(data.invoices || []);
          }
        } catch (refreshError) {
          console.error("Error refreshing invoices:", refreshError);
        }
      }
    } catch (error) {
      console.error("Error creating invoice:", error);
      if (error.name === "AbortError") {
        toast.error(
          "Invoice generation is taking longer than expected. Please check back in a moment."
        );
      } else {
        toast.error(error.message || "Failed to create invoice");
      }
    } finally {
      clearTimeout(timeoutId);
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setDeletingId(id);
      const response = await fetch(`${baseUrl}/invoices/delete/${id}`, {
        method: "DELETE",
        redirect: "follow",
      });

      if (!response.ok) {
        throw new Error("Failed to delete invoice");
      }

      const result = await response.json();
      if (result.msg === "invoice deleted successfully") {
        toast.success("Invoice deleted successfully");
        setInvoices((prevInvoices) =>
          prevInvoices.filter((invoice) => invoice._id !== id)
        );
      } else {
        throw new Error(result.msg || "Failed to delete invoice");
      }
    } catch (err) {
      console.error("Error deleting invoice:", err);
      toast.error(err.message || "Failed to delete invoice");
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch invoices
        const [invoicesRes, clientsRes] = await Promise.all([
          fetch(`${baseUrl}/invoices/all`),
          fetch(`${baseUrl}/clients/all`),
        ]);

        if (!invoicesRes.ok) throw new Error("Failed to fetch invoices");
        if (!clientsRes.ok) throw new Error("Failed to fetch clients");

        const [invoicesData, clientsData] = await Promise.all([
          invoicesRes.json(),
          clientsRes.json(),
        ]);

        setInvoices(invoicesData.invoices || []);
        setClients(clientsData.clients || []);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
                toast.error("This invoice does not have a PDF link available");
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
          <Popconfirm
            title={
              <div className="text-white">
                <div className="mb-2 font-medium">Delete Invoice</div>
                <p className="text-gray-300">
                  Are you sure you want to delete this invoice?
                </p>
              </div>
            }
            okText="Delete"
            okButtonProps={{ danger: true }}
            cancelText="Cancel"
            onConfirm={() => handleDelete(record._id)}
            cancelButtonProps={{
              className: "hover:bg-gray-700",
            }}
            overlayClassName="[&_.ant-popover-inner]:bg-[#1e1e1e] [&_.ant-popover-arrow]:border-t-[#1e1e1e] [&_.ant-popover-arrow]:border-l-[#1e1e1e]"
          >
            <Button
              type="text"
              icon={
                <DeleteOutlined
                  className={`${
                    deletingId === record._id
                      ? "text-red-200"
                      : "text-red-400 hover:text-red-300"
                  }`}
                />
              }
              loading={deletingId === record._id}
              disabled={!!deletingId}
            />
          </Popconfirm>
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
          onClick={() => setIsModalVisible(true)}
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

      <Modal
        title={<span className="text-white">Create New Invoice</span>}
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
        }}
        footer={[
          <Button key="cancel" onClick={() => setIsModalVisible(false)}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleSubmit}
            loading={isSubmitting}
            className="bg-[#f39136] hover:bg-[#e68632] border-none"
          >
            {isSubmitting ? "Generating Invoice..." : "Create Invoice"}
          </Button>,
        ]}
        width={800}
        className="[&_.ant-modal-content]:bg-[#1e1e1e] [&_.ant-modal-header]:bg-[#1e1e1e] [&_.ant-modal-title]:text-white"
      >
        <Form
          form={form}
          layout="vertical"
          className="text-white"
          initialValues={{
            clientId: undefined,
          }}
        >
          <div className="grid grid-cols-1 gap-4 mb-6">
            <Form.Item
              name="clientId"
              label={<span className="text-white">Select Client</span>}
              rules={[{ required: true, message: "Please select a client!" }]}
            >
              <Select
                placeholder="Select a client"
                className="w-full [&_.ant-select-selector]:bg-gray-100 [&_.ant-select-selector]:border-gray-300 [&_.ant-select-selector]:text-gray-800 [&_.ant-select-arrow]:text-gray-500 [&_.ant-select-selection-item]:bg-gray-100 [&_.ant-select-selector]:h-10 [&_.ant-select-selection-item]:flex [&_.ant-select-selection-item]:items-center"
                options={clients.map((client) => ({
                  value: client._id,
                  label: client.name,
                }))}
                showSearch
                optionFilterProp="label"
                filterOption={(input, option) =>
                  option.label.toLowerCase().includes(input.toLowerCase())
                }
              />
            </Form.Item>
          </div>

          <Divider className="border-gray-600" />

          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-white">Items</h4>
              <Button
                type="primary"
                onClick={handleAddItem}
                icon={<PlusOutlined />}
                className="bg-[#f39136] hover:bg-[#e68632] border-none text-white"
              >
                Add Item
              </Button>
            </div>

            {items.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-12 gap-2 mb-2 items-start"
              >
                <div className="col-span-5">
                  <Input
                    placeholder="Description"
                    value={item.description}
                    onChange={(e) => {
                      const newItems = [...items];
                      newItems[index].description = e.target.value;
                      setItems(newItems);
                    }}
                    className="bg-[#2d2d2d] border border-gray-600 text-black hover:border-gray-400 focus:border-gray-400 [&:hover]:border-gray-400 [&:focus]:border-gray-400 [&:focus]:shadow-none [&::placeholder]:text-gray-500"
                  />
                </div>
                <div className="col-span-2">
                  <InputNumber
                    placeholder="Price"
                    value={item.price}
                    onChange={(value) => {
                      const newItems = [...items];
                      newItems[index].price = value;
                      newItems[index].total = value * newItems[index].quantity;
                      setItems(newItems);
                    }}
                    min={0}
                    step={0.01}
                    className="w-full bg-[#2d2d2d] border border-gray-600 text-black hover:border-gray-400 focus:border-gray-400 [&:hover]:border-gray-400 [&:focus]:border-gray-400 [&:focus]:shadow-none [&::placeholder]:text-gray-500"
                  />
                </div>
                <div className="col-span-2">
                  <InputNumber
                    placeholder="Qty"
                    value={item.quantity}
                    onChange={(value) => {
                      const newItems = [...items];
                      newItems[index].quantity = value;
                      newItems[index].total = value * newItems[index].price;
                      setItems(newItems);
                    }}
                    min={1}
                    className="w-full bg-[#2d2d2d] border border-gray-600 text-black hover:border-gray-400 focus:border-gray-400 [&:hover]:border-gray-400 [&:focus]:border-gray-400 [&:focus]:shadow-none [&::placeholder]:text-gray-500"
                  />
                </div>
                <div className="col-span-2 flex items-center h-full">
                  <span className="text-white">
                    GHS {item.price * item.quantity}
                  </span>
                </div>
                <div className="col-span-1 flex justify-center">
                  {items.length > 1 && (
                    <MinusCircleOutlined
                      className="text-red-500 text-lg cursor-pointer mt-1"
                      onClick={() => handleRemoveItem(index)}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>

          <Divider className="border-gray-600" />

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="col-span-2"></div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>GHS {calculateTotal(items).toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg">
                <span>Total:</span>
                <span>GHS {calculateTotal(items).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </Form>
      </Modal>

      {/* Success Modal */}
      <Modal
        title={<span className="text-white">Invoice Created Successfully</span>}
        open={!!createdInvoice}
        onCancel={handleCloseSuccessModal}
        footer={[
          <Button key="close" onClick={handleCloseSuccessModal}>
            Close
          </Button>,
          createdInvoice?.pdfUrl && (
            <Button
              key="view"
              type="primary"
              onClick={() => window.open(createdInvoice.pdfUrl, "_blank")}
              className="bg-[#f39136] hover:bg-[#e68632] border-none"
            >
              View PDF
            </Button>
          ),
        ]}
        className="[&_.ant-modal-content]:bg-[#1e1e1e] [&_.ant-modal-header]:bg-[#1e1e1e] [&_.ant-modal-title]:text-white"
      >
        {createdInvoice && (
          <div className="text-white">
            <p>Invoice Number: {createdInvoice.invoice?.invoiceNumber}</p>
            <p>Client: {createdInvoice.invoice?.invoiceTo?.name}</p>
            <p>
              Total Amount: GHS{" "}
              {createdInvoice.invoice?.totalAmount?.toFixed(2)}
            </p>
            {createdInvoice.pdfUrl && (
              <div className="mt-4">
                <p>PDF Link:</p>
                <a
                  href={createdInvoice.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  {createdInvoice.pdfUrl}
                </a>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Invoices;
