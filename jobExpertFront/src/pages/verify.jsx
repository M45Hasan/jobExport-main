import React, { useEffect, useState } from "react";
import Banner from "../components/Banner/Banner";
import logo from "../assets/brandLogo/logo.png";
import veifysucces from "../assets/verificationIcon/verifysuccess.png";
import icon from "../assets/verificationIcon/verifiction.png";
import JobExpart from "../components/JobExpart/JobExpart";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";
import axios from "../components/Axios/axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { activeUser } from "../userSlice/userSlice";

const verify = () => {
  let navigate = useNavigate();
  let dispathc = useDispatch();
  const [verificationStatus, setVerificationStatus] = useState(null);
  let user = useSelector((state) => state);
  console.log(user.userData.userInfo);

  const [otp, setOtp] = useState(["", "", "", ""]); // Array to hold individual digits

  const handleChange = (e, index) => {
    const { value } = e.target;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    let userverify = {
      email: user.userData.userInfo.email,
      otpmatch: enteredOtp,
    };

    try {
      // Assuming your API returns a response indicating success or failure
      const res = await axios.post(
        "/jobExpert/api/v1/emailverification",
        userverify
      );
      console.log(res.data.success);
      if (res.data.message === "Verified") {
        setVerificationStatus("success");
        setTimeout(() => {
          const updatedUserData = {
            ...user.userData.userInfo,
            hasEmailVerified: true,
            otpmatch: "",
          };
          console.log("updatedUserData", updatedUserData);
          dispathc(activeUser(updatedUserData));
          navigate("/login");
        }, 2000);
      } else {
        setVerificationStatus("error");
      }
    } catch (error) {
      console.log(error.code);
      setVerificationStatus("error");
    }
  };

  return (
    <>
      <Navbar />
      {/* banner section  */}
      <Banner />
      <div className="w-11/12 md:w-1/2 text-center mx-auto py-16">
        <p>
          Job Expert বাংলাদেশের প্রথম এবং সর্ববৃহৎ Virtual Exam Center (VEC)
          বিসিএস প্রিলিমিনারি এবং অন্যান্য MCQ পরীক্ষার প্রস্তুতির জন্য হাজারো
          পরীক্ষার্থীর সাথে চূড়ান্ত পরীক্ষার আগেই LIVE মডেল টেস্ট দিয়ে নিজের
          অবস্থান যাচাই করে নিন।
        </p>
        <img src={logo} alt="" className="mx-auto py-16" />
        <div className="flex flex-col justify-center">
          <h3>মোবাইল নাম্বার ভেরিফাই করুন</h3>
          <img src={icon} alt="" className="w-44 mx-auto mt-3" />
        </div>
      </div>

      <form className="text-center" onSubmit={handleSubmit}>
        <div className="flex items-center justify-center ml-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              className="w-16 md:w-20 h-12 text-center text-xl border rounded-md mx-1 focus:outline-none"
              maxLength={1}
              pattern="[0-9]"
              name={`otp-${index}`}
              required
              value={digit}
              onChange={(e) => handleChange(e, index)}
            />
          ))}
        </div>
        <button
          type="submit"
          className="ml-4 px-24 md:px-28 py-2 bg-blue-500 text-white rounded focus:outline-none mt-10"
        >
          ভেরিফাই করুন
        </button>
      </form>

      {verificationStatus === "success" && (
        <div className="text-center mx-0">
          <img className="text-center mx-auto my-4" src={veifysucces} alt="" />
          <h2 className="text-xl">ভেরিফাই সম্পন্ন হয়েছে</h2>
        </div>
      )}

      {verificationStatus === "error" && (
        <div className="text-center mx-0">
          <h2 className="text-xl text-red-500 mt-4">ভেরিফিকেশন ব্যর্থ হয়েছে</h2>
        </div>
      )}

      {/* job expar section  */}
      <div className="mt-16">
        <JobExpart />
      </div>
      <Footer />
    </>
  );
};

export default verify;

// when verify succesfully otp match when i show  "ভেরিফাই সম্পন্ন হয়েছে", or when otp not match i will show error massage,
