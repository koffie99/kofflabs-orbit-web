import { format } from "date-fns"

const formatDateTime = (date) => {
  if (!date || isNaN(new Date(date).getTime())) {
    return "Invalid date"
  }

  return format(new Date(date), "do MMMM, yyyy - h:mmaaa") // e.g. 5th May, 2025 - 10:00PM
}

export default formatDateTime
