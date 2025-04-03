"use client"
import baseUrl from "@/app/utils/baseUrl"
import Image from "next/image"
import React, { useState } from "react"
import toast, { Toaster } from "react-hot-toast"

const PhoneVerification = () => {
  const [code, setCode] = useState("")
  const [loading, setLoading] = useState(false)

  // get current admin id
  let userId

  if (typeof sessionStorage !== "undefined") {
    userId = sessionStorage.getItem("userId")
  }

  // handle code verification
  const verifyCode = async () => {
    try {
      setLoading(true)

      const raw = JSON.stringify({
        userId: userId,
        otp: code.trim(),
      })

      const requestOptions = {
        method: "POST",
        body: raw,
        headers: { "Content-Type": "application/json" },
        redirect: "follow",
      }

      await fetch(
        `${baseUrl}/api/v1/verifications/megaOTPVerification`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          if (result.msg === "otp verified successfully") {
            toast.success("OTP Verification Successful")
            setLoading(false)
            location.href = "/portal"
          } else {
            toast.error("Invalid OTP, Please retry")
            setLoading(false)
          }
        })
        .catch((error) => {
          console.error(error)
          toast.error("Something went wrong, please try again.")
          setLoading(false)
        })
    } catch (err) {
      console.log(err)
      toast.error("An error occurred")
      setLoading(false)
    }
  }

  return (
    <div className="bg-[#f9fafd] min-h-screen w-full flex items-center justify-center">
      <div className="w-[400px] flex flex-col gap-5 items-center">
        <div className="flex items-center flex-col">
          <Image
            height={60}
            width={60}
            src="/images/logo.png"
            alt="logo"
            className="mb-5"
          />
          <h2 className="font-bold text-2xl">Phone Verification</h2>
          <p>Enter verification code sent to your phone</p>
        </div>
        <div className="w-full p-7 rounded-lg shadow bg-white flex flex-col gap-3">
          <input
            type="text"
            placeholder="Enter verification code"
            className="ring-1 ring-[#ccc] p-2 rounded-md"
            onChange={(e) => setCode(e.target.value)}
          />
          <button
            className="bg-[#f39136] text-white p-2 rounded-md w-full"
            onClick={verifyCode}
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <Image
                  width={20}
                  height={20}
                  src="/gifs/whiteloading.gif"
                  alt="loading gif"
                  className="text-center flex items-center justify-center"
                />
              </div>
            ) : (
              "Verify"
            )}
          </button>
        </div>
      </div>

      <Toaster />
    </div>
  )
}

export default PhoneVerification
