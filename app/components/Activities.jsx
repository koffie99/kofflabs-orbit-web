import React, { useState, useEffect } from "react"
import { Table } from "antd"
import baseUrl from "../utils/baseUrl"
import formatDateTime from "../utils/formatDateTime"

const Activities = () => {
  const [activities, setActivities] = useState([])

  // get all activities
  const getAllActivities = async () => {
    try {
      const requestOptions = {
        method: "GET",
        redirect: "follow",
      }

      await fetch(`${baseUrl}/api/v1/activities/all`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          setActivities(result.activities || [])
        })
        .catch((error) => console.error(error))
    } catch (err) {
      console.log(err)
    }
  }

  // init
  useEffect(() => {
    getAllActivities()
  }, [])

  // columns
  const columns = [
    {
      title: "Activity Type",
      dataIndex: "activityType",
      key: "activityType",
    },
    {
      title: "Performed By",
      dataIndex: "performedBy",
      key: "performedBy",
    },
    {
      title: "User Phone",
      dataIndex: "userPhone",
      key: "userPhone",
    },
    {
      title: "Date Created",
      dataIndex: "dateCreated",
      render: (_, record) => <p>{formatDateTime(record.dateCreated)}</p>,
    },
  ]

  return (
    <div className="bg-white w-full p-5 rounded-lg shadow">
      <div>
        <h2 className="font-semibold text-xl">Activities</h2>
      </div>
      <Table columns={columns} dataSource={activities} className="mt-3" />
    </div>
  )
}

export default Activities
