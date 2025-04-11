"use client"
import { useEffect, useState } from "react"

const Hydrated = ({ children }) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null
  return children
}

export default Hydrated
