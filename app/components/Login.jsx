"use client"
import Image from "next/image"
import React from "react"
import { useState } from "react"
import toast, { Toaster } from "react-hot-toast"
import baseUrl from "../utils/baseUrl"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  // handle login
  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)

      const myHeaders = new Headers()
      myHeaders.append("Content-Type", "application/json")

      const raw = JSON.stringify({
        email: email.toLowerCase().trim(),
        password: password.trim(),
      })

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      }

      await fetch(`${baseUrl}/api/v1/logins/megaLogin`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result.msg === "login successful") {
            toast.success("Login Successful")
            sessionStorage.setItem("userId", result.user._id)
            sessionStorage.setItem("userType", result.role)
            sessionStorage.setItem("userFirstName", result.user.firstName)
            sessionStorage.setItem("userLastName", result.user.lastName)
            setLoading(false)
            location.href = "/phoneVerification"
          } else {
            toast.error("Unable to login, please try again")
            setLoading(false)
          }
        })
        .catch((error) => console.error(error))
    } catch (err) {
      setLoading(false)
      console.log(err)
      toast.error(err)
    }
  }

  return (
    <div className="w-[500px] flex flex-col">
      <div className="flex flex-col items-center">
        <Image
          src="/images/logo.png"
          width={60}
          height={60}
          alt="logo"
          className="mb-4"
        />
        <h2 className="font-bold text-2xl">Kofflabs Orbit</h2>
        <p className="text-[#818181]">Enter your credentials to continue</p>
      </div>
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg shadow flex flex-col mt-4"
      >
        <div className="login-box">
          <input
            type="text"
            className="login-inputs"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="login-inputs"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className="bg-[#f39136] text-white p-2 rounded-md mt-7 w-full"
          type="submit"
          // onClick={() => handleLogin()}
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
            "Login"
          )}
        </button>

        <p className="text-[14px] text-[#818181] mt-6 text-center">
          Powered by <span className="font-semibold">Kofflabs Systems</span>
        </p>
      </form>

      <Toaster />
    </div>
  )
}

export default Login
