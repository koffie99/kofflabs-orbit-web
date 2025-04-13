import React, { useEffect, useState } from "react"
import { format } from "date-fns"

const FormattedDate = ({ date }) => {
  const [formatted, setFormatted] = useState("")

  useEffect(() => {
    if (date) {
      const newFormatted = format(new Date(date), "do MMM, yyyy")
      setFormatted(newFormatted)
    }
  }, [date])

  return <p>{formatted}</p>
}

export default FormattedDate
