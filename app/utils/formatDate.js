import { format } from "date-fns"

const formatDate = (date) => {
  if (!date || isNaN(new Date(date).getTime())) {
    return "Invalid date" // or return an empty string ""
  }

  return format(new Date(date), "do MMM, yyyy")
}

export default formatDate
