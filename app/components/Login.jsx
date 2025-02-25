import Image from "next/image"
import React from "react"

const Login = () => {
  return (
    <div className="w-[500px] flex flex-col">
      <div className="flex flex-col items-center">
        <Image src="/images/logo.png" width={100} height={100} alt="logo" />
        <h2 className="font-bold text-2xl">Admin Login</h2>
        <p className="text-[#818181]">Enter your credentials to continue</p>
      </div>
      <div className="bg-white p-8 rounded-lg shadow flex flex-col mt-4">
        <div className="login-box">
          <input type="text" className="login-inputs" placeholder="User ID" />
          <input
            type="password"
            className="login-inputs"
            placeholder="Password"
          />
        </div>
        <button className="bg-[#f39136] text-white p-2 rounded-md mt-7">
          Login
        </button>

        <p className="text-[14px] text-[#818181] mt-6 text-center">
          Powered by <span className="font-semibold">Kofflabs</span>
        </p>
      </div>
    </div>
  )
}

export default Login
