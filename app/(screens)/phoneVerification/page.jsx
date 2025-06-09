"use client";
import baseUrl from "@/app/utils/baseUrl";
import Image from "next/image";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "motion/react";

const PhoneVerification = () => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  // get current admin id
  let userId;
  let userType;

  if (typeof sessionStorage !== "undefined") {
    userId = sessionStorage.getItem("userId");
    userType = sessionStorage.getItem("userType");
  }

  // handle code verification
  const verifyCode = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const raw = JSON.stringify({
        userId: userId,
        otp: code.trim(),
      });

      const requestOptions = {
        method: "POST",
        body: raw,
        headers: { "Content-Type": "application/json" },
        redirect: "follow",
      };

      await fetch(
        `${baseUrl}/verifications/megaOTPVerification`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          if (result.msg === "otp verified successfully") {
            toast.success("OTP Verification Successful");
            setLoading(false);
            if (userType === "admin") {
              location.href = "/portal";
            } else if (userType === "finance") {
              location.href = "/financePortal";
            }
          } else {
            toast.error("Invalid OTP, Please retry");
            setLoading(false);
          }
        })
        .catch((error) => {
          console.error(error);
          toast.error("Something went wrong, please try again.");
          setLoading(false);
        });
    } catch (err) {
      console.log(err);
      toast.error("An error occurred");
      setLoading(false);
    }
  };

  // handle resend code
  const resendCode = async (e) => {
    e.preventDefault();
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        userId: userId.trim(),
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      await fetch(`${baseUrl}/verifications/resendOTP`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result.msg === "otp resent successfully") {
            toast.success("OTP Sent Successfully");
          } else {
            toast.error("Unable to send OTP, please try again");
          }
        })
        .catch((error) => console.error(error));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className="bg-neutral-900 min-h-screen w-full flex items-center justify-center"
      style={{
        backgroundImage: `radial-gradient(circle at 0.5px 0.5px, rgba(255,255,255,0.1) 0.5px, transparent 0)`,
        backgroundSize: "8px 8px",
        backgroundRepeat: "repeat",
      }}
    >
      <div className="w-[400px] flex flex-col gap-5 items-center">
        <div className="flex items-center flex-col">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Image
              height={60}
              width={60}
              src="/images/logo.png"
              alt="logo"
              className="mb-5"
            />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="font-bold text-2xl text-neutral-300"
          >
            Phone Verification
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-neutral-500"
          >
            Enter verification code sent to your phone
          </motion.p>
        </div>
        <motion.form
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onSubmit={verifyCode}
          className="w-full p-7 rounded-lg shadow bg-[#131313] flex flex-col gap-3"
        >
          <input
            type="password"
            placeholder="Enter verification code"
            className="bg-neutral-800 p-3 rounded-md text-neutral-300"
            onChange={(e) => setCode(e.target.value)}
          />
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="bg-[#30508A] mt-3 text-white p-3 rounded-md w-full"
            type="submit"
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
          </motion.button>
        </motion.form>
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          whileTap={{ scale: 0.8, transition: { duration: 0.5 } }}
          whileHover={{ scale: [1, 1.05, 1] }}
          onClick={(e) => {
            e.preventDefault();
            resendCode(e);
          }}
          className="text-neutral-400 text-sm mt-[0px]"
        >
          Resend Code
        </motion.button>
      </div>

      <Toaster />
    </div>
  );
};

export default PhoneVerification;
