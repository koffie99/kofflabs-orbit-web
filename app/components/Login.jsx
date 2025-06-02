"use client"
import Image from "next/image"
import React from "react"
import { useState } from "react"
import baseUrl from "../utils/baseUrl"
import {motion} from 'motion/react'
import SuccessModal from "../uibits/SuccessModal"
import ErrorModal from "../uibits/ErrorModal"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [openSuccessModal, setOpenSuccessModal] = useState(false)
  const [openErrorModal, setOpenErrorModal] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

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
            setOpenSuccessModal(true)
            sessionStorage.setItem("userId", result.user._id)
            sessionStorage.setItem("userType", result.role)
            sessionStorage.setItem("userFirstName", result.user.firstName)
            sessionStorage.setItem("userLastName", result.user.lastName)
            setLoading(false)
            // Close success modal after 2 seconds and redirect
            setTimeout(() => {
              setOpenSuccessModal(false)
              location.href = "/phoneVerification"
            }, 2000)
          } else {
            setErrorMessage("Unable to login, please try again")
            setOpenErrorModal(true)
            setLoading(false)
          }
        })
        .catch((error) => console.error(error))
    } catch (error) {
      setLoading(false)
      console.log(error)
      setErrorMessage(error.message || "An error occurred. Please try again.")
      setOpenErrorModal(true)
    }
  }

  return (
    <div className="w-[500px] flex flex-col">
      <div className="flex flex-col items-center">
        <motion.div initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}} transition={{duration: 0.2}}>
        <Image
          src="/images/logo.png"
          width={60}
          height={60}
          alt="logo"
          className="mb-4"
        />
        </motion.div>
        <motion.h2 initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}} transition={{duration: 0.3}} className="font-bold text-2xl text-neutral-300">Kofflabs Orbit</motion.h2>
        <motion.p initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}} transition={{duration: 0.5}} className="text-neutral-500">Enter your credentials to continue</motion.p>
      </div>
      <motion.form
        initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}} transition={{duration: 0.5}}
        onSubmit={handleLogin}
        className="bg-[#131313] p-8 rounded-lg shadow flex flex-col mt-4"
      >
        <div className="flex flex-col gap-3">
          <input
            type="text"
            className="bg-neutral-800 p-3 px-4 rounded text-neutral-300"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="bg-neutral-800 p-3 px-4 rounded text-neutral-300"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <motion.button
          whileTap={{scale: 0.9}}
          className="bg-[#f39136] text-white p-3 rounded-md mt-7 w-full"
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
        </motion.button>

        <p className="text-[14px] text-[#818181] mt-6 text-center">
          Powered by <span className="font-semibold">Kofflabs Systems</span>
        </p>
      </motion.form>

      <SuccessModal 
        openSuccessModal={openSuccessModal} 
        setOpenSuccessModal={setOpenSuccessModal}
        description="Login Successful"
      />

      <ErrorModal 
        openErrorModal={openErrorModal} 
        setOpenErrorModal={setOpenErrorModal}
        message={errorMessage}
      />
    </div>
  )
}

export default Login
