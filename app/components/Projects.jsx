"use client";
import {
  Modal,
  Select,
  Table,
  ConfigProvider,
  theme,
  Popconfirm,
  message,
} from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  CalendarOutlined,
  UserOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import baseUrl from "../utils/baseUrl";
import EntityLength from "../uibits/EntityLength";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [isClient, setIsClient] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [assignMembers, setAssignMembers] = useState(false);
  const [adding, setAdding] = useState(false);

  // project details
  const [projectPhoto, setProjectPhoto] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editing, setEditing] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projectStartDate, setProjectStartDate] = useState("");
  const [projectEndDate, setProjectEndDate] = useState("");
  const [projectAssignees, setProjectAssignees] = useState([]);
  const [projectSenderId, setProjectSenderId] = useState("");
  const [projectEmail, setProjectEmail] = useState("");
  const [projectLoading, setProjectLoading] = useState(false);
  const [employees, setEmployees] = useState([]);

  console.log("Assigned Members: ", assignMembers);

  const getEmployees = async () => {
    try {
      const requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      await fetch(`${baseUrl}/employees/all`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          setEmployees(result?.employees || []);
        })
        .catch((error) => console.error(error));
    } catch (err) {
      console.log(err);
    }
  };

  // Ensure client-side rendering only
  useEffect(() => {
    setIsClient(true);
    getAllProjects();
    getEmployees();
  }, []);

  // get all projects
  const getAllProjects = async () => {
    try {
      setProjectLoading(true);
      const response = await fetch(`${baseUrl}/projects/all`);
      const result = await response.json();
      setProjects(result?.projects || []);
      setProjectLoading(false);
    } catch (err) {
      console.error(err);
      setProjectLoading(false);
    }
  };

  // delete project
  const handleDelete = async (projectId) => {
    try {
      const requestOptions = {
        method: "DELETE",
        redirect: "follow",
      };

      await fetch(`${baseUrl}/projects/delete/${projectId}`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result.msg === "project deleted successfully") {
            getAllProjects();
            toast.success("Project deleted successfully");
          } else {
            toast.error(result.msg || "Failed to delete project");
          }
        })
        .catch((error) => {
          toast.error("Failed to delete project");
          console.error(error);
        });
    } catch (err) {
      toast.error("Failed to delete project");
      console.error(err);
    }
  };

  // update project
  const updateProject = async () => {
    try {
      setEditing(true);
      const formdata = new FormData();
      formdata.append("photo", projectPhoto);
      formdata.append("name", projectName.trim().toLowerCase());
      formdata.append("startDate", projectStartDate.trim());
      formdata.append("endDate", projectEndDate.trim());
      formdata.append("assignees", projectAssignees);
      formdata.append("status", "completed");
      formdata.append("isComplete", "true");

      const requestOptions = {
        method: "PUT",
        body: formdata,
        redirect: "follow",
      };

      await fetch(
        `${baseUrl}/projects/update/${selectedProject._id}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          if (result.msg === "project updated successfully") {
            getAllProjects();
            setOpenEditModal(false);
            setEditing(false);
            toast.success("Project updated successfully");
          } else {
            toast.error(result.msg || "Failed to update project");
          }
        })
        .catch((error) => {
          toast.error("Failed to update project");
          console.error(error);
        });
    } catch (err) {
      toast.error("Failed to update project");
      console.error(err);
    }
  };

  // columns
  const columns = [
    {
      title: "#",
      render: (_value, _record, index) => <p>{index + 1}</p>,
    },
    {
      title: "Logo",
      key: "photo",
      dataIndex: "photo",
      render: (_, record) =>
        record?.photo ? (
          <Image
            src={record.photo}
            alt={record.name || "Project Image"}
            width={40}
            height={40}
            unoptimized // Avoids Next.js optimizations that might cause hydration issues
            priority // Ensures the image loads immediately
            className="rounded-md"
          />
        ) : (
          <p>No Image</p>
        ),
    },
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
      render: (_, record) => <p className="capitalize">{record?.name}</p>,
    },
    {
      title: "Start Date",
      key: "startDate",
      dataIndex: "startDate",
      render: (_, record) => (
        <p>
          {record?.startDate
            ? new Date(record.startDate).toLocaleString()
            : "N/A"}
        </p>
      ),
    },
    {
      title: "End Date",
      key: "endDate",
      dataIndex: "endDate",
      render: (_, record) => (
        <p>
          {record?.endDate ? new Date(record.endDate).toLocaleString() : "N/A"}
        </p>
      ),
    },
    {
      title: "Assignees",
      key: "assignees",
      dataIndex: "assignees",
      render: (_, record) => <p>{(record?.assignees).length}</p>,
    },
    {
      title: "Actions",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <EyeOutlined
            onClick={() => {
              console.log("Selected project:", record);
              console.log("Project photo:", record.photo);
              setSelectedProject(record);
              setOpenDetailsModal(true);
            }}
            className="text-neutral-300 cursor-pointer"
          />
          <EditOutlined
            onClick={() => {
              setSelectedProject(record);
              setOpenEditModal(true);
              setProjectPhoto(record.photo);
              setProjectName(record.name);
              setProjectStartDate(record.startDate);
              setProjectEndDate(record.endDate);
              setProjectAssignees(record.assignees);
              setProjectSenderId(record.senderId);
              setProjectEmail(record.email);
            }}
            className="text-neutral-300 cursor-pointer"
          />
          <Popconfirm
            title="Are you sure you want to delete this project?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <DeleteOutlined className="text-neutral-300 cursor-pointer ml-2" />
          </Popconfirm>
        </div>
      ),
    },
  ];

  // add a project
  const addProject = async () => {
    try {
      setAdding(true);
      const formdata = new FormData();
      formdata.append("photo", projectPhoto);
      formdata.append("name", projectName.trim().toLowerCase());
      formdata.append("email", projectEmail.trim().toLowerCase());
      formdata.append("senderId", projectSenderId.trim());
      formdata.append("startDate", projectStartDate.trim());
      formdata.append("endDate", projectEndDate.trim());
      projectAssignees.forEach((assigneeId, index) => {
        formdata.append(`assignees[${index}]`, assigneeId);
      });
      formdata.append("status", "in progress");
      formdata.append("isComplete", false);

      const requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow",
      };

      await fetch(`${baseUrl}/projects/create`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result.msg === "project added successfully") {
            getAllProjects();
            setAdding(false);
            toast.success("Project added successfully");
            setOpenAddModal(false);
          } else {
            toast.error(result.msg);
            setAdding(false);
          }
        })
        .catch((error) => console.error(error));
    } catch (err) {
      console.log(err);
      toast.error(err);
    }
  };

  return (
    <div className="bg-[#131313] w-full p-5 rounded-lg shadow">
      {/* header */}
      <div className="flex items-center justify-between">
        <div>
          <EntityLength entityCount={projects?.length} entityName="Projects" />
        </div>
        <button
          className="bg-[#30508a] text-white py-2 px-3 rounded-md text-sm"
          onClick={() => setOpenAddModal(true)}
        >
          + Add Project
        </button>
      </div>

      {/* content */}
      {isClient && (
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
          <Table className="mt-5" columns={columns} dataSource={projects} />
        </ConfigProvider>
      )}

      {/* details modal */}
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
          open={openDetailsModal}
          onCancel={() => setOpenDetailsModal(false)}
          footer={false}
          title="Project Details"
        >
          <div className="flex flex-col gap-6 mt-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <CalendarOutlined className="text-neutral-300" />
                <div>
                  <span className="text-neutral-300">Start Date</span>
                  <p className="text-white">
                    {new Date(selectedProject?.startDate).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <ClockCircleOutlined className="text-neutral-300" />
                <div>
                  <span className="text-neutral-300">End Date</span>
                  <p className="text-white">
                    {new Date(selectedProject?.endDate).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <UserOutlined className="text-neutral-300" />
                <div>
                  <span className="text-neutral-300">Assignees</span>
                  <ul className="text-white space-y-1">
                    {selectedProject?.assignees?.map((assigneeId) => {
                      const employee = employees?.find(
                        (emp) => String(emp._id) === assigneeId
                      );
                      return employee ? (
                        <li
                          key={assigneeId}
                          className="flex items-center gap-2"
                        >
                          <span className="text-neutral-300">•</span>
                          <span>{`${employee.firstName} ${employee.lastName}`}</span>
                        </li>
                      ) : null;
                    })}
                  </ul>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <CheckCircleOutlined
                  className={`text-${
                    selectedProject?.status === "completed"
                      ? "green-500"
                      : "yellow-500"
                  }`}
                />
                <div>
                  <span className="text-neutral-300">Status</span>
                  <p
                    className={`text-${
                      selectedProject?.status === "completed"
                        ? "green-500"
                        : "yellow-500"
                    }`}
                  >
                    {selectedProject?.status}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <CalendarOutlined className="text-neutral-300" />
              <div>
                <span className="text-neutral-300">Project Name</span>
                <p className="text-white">{selectedProject?.name}</p>
              </div>
            </div>
          </div>
        </Modal>
      </ConfigProvider>

      {/* edit modal */}
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
          open={openEditModal}
          onCancel={() => {
            setOpenEditModal(false);
            setEditing(false);
          }}
          footer={false}
          title="Edit Project"
        >
          <div className="flex flex-col gap-3 mt-3">
            <input
              type="file"
              className="bg-neutral-800 text-neutral-300 p-2 rounded-md"
              onChange={(e) => setProjectPhoto(e.target.files[0])}
            />
            <input
              type="text"
              className="bg-neutral-800 text-neutral-300 p-2 rounded-md"
              placeholder="Project name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
            <input
              type="date"
              className="bg-neutral-800 text-neutral-300 p-2 rounded-md"
              value={projectStartDate}
              onChange={(e) => setProjectStartDate(e.target.value)}
            />
            <input
              type="date"
              className="bg-neutral-800 text-neutral-300 p-2 rounded-md"
              value={projectEndDate}
              onChange={(e) => setProjectEndDate(e.target.value)}
            />
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={assignMembers}
                onChange={(e) => setAssignMembers(e.target.checked)}
              />
              <p>Assign project members</p>
            </div>
            {assignMembers && (
              <div>
                <Select
                  mode="multiple"
                  className="w-full"
                  placeholder="Select employees"
                  value={projectAssignees}
                  options={employees?.map((employee) => ({
                    value: String(employee._id),
                    label: `${employee.firstName} ${employee.lastName}`,
                  }))}
                  onChange={(values) => setProjectAssignees(values)}
                  allowClear
                />
              </div>
            )}
            <button
              className="p-2 bg-[#30508a] rounded-lg text-white"
              onClick={() => updateProject()}
            >
              {editing ? "Updating Project...." : "Update Project"}
            </button>
          </div>
        </Modal>
      </ConfigProvider>

      {/* add project modal */}
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
          open={openAddModal}
          onCancel={() => setOpenAddModal(false)}
          footer={false}
          title="Add Project"
        >
          <div className="flex flex-col gap-3 mt-3">
            <input
              type="file"
              className="bg-neutral-800 text-neutral-300 p-2 rounded-md"
              onChange={(e) => setProjectPhoto(e.target.files[0])}
            />
            <input
              type="text"
              className="bg-neutral-800 text-neutral-300 p-2 rounded-md"
              placeholder="Project name"
              onChange={(e) => setProjectName(e.target.value)}
            />
            <input
              type="text"
              className="bg-neutral-800 text-neutral-300 p-2 rounded-md"
              placeholder="Project Email"
              onChange={(e) => setProjectEmail(e.target.value)}
            />
            <input
              type="text"
              className="bg-neutral-800 text-neutral-300 p-2 rounded-md"
              placeholder="Project Sender Id"
              onChange={(e) => setProjectSenderId(e.target.value)}
            />
            <input
              type="date"
              className="bg-neutral-800 text-neutral-300 p-2 rounded-md"
              placeholder="Start Date"
              onChange={(e) => setProjectStartDate(e.target.value)}
            />
            <input
              type="date"
              className="bg-neutral-800 text-neutral-300 p-2 rounded-md"
              placeholder="End Date"
              onChange={(e) => setProjectEndDate(e.target.value)}
            />
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                onChange={(e) => setAssignMembers(e.target.checked)}
              />
              <p>Assign project members</p>
            </div>
            {assignMembers && (
              <div>
                <Select
                  mode="multiple"
                  className="w-full"
                  placeholder="Select employees"
                  value={projectAssignees}
                  options={employees?.map((employee) => ({
                    value: String(employee._id),
                    label: `${employee.firstName} ${employee.lastName}`,
                  }))}
                  onChange={(values) => setProjectAssignees(values)}
                  allowClear
                />
              </div>
            )}
            <button
              className="p-2 bg-[#30508a] rounded-lg text-white"
              onClick={() => addProject()}
            >
              {adding ? "Adding Project...." : "Add Project"}
            </button>
          </div>
        </Modal>
      </ConfigProvider>

      <Toaster />
    </div>
  );
};

export default Projects;
