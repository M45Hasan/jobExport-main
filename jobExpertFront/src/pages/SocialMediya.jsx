import React from "react";
import fb from "../assets/brandLogo/fb.png";
import { Button } from "@mui/material";
const SocialMediya = () => {
  return (
    <>
      <div className=" flex flex-col sm:flex-row rounded-lg mt-3 p-6 justify-around items-center bg-[#EAE9E9]">
        <div className="mb-4 sm:mb-0">
          <img
            className="w-16 h-16 sm:w-24 sm:h-24 rounded-full mx-auto sm:mx-0"
            src={fb}
            alt=""
          />
        </div>
        <div className="text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">
            Job Expert Official Group
          </h1>
          <p className="text-base">25k Post Today Uploaded</p>
        </div>
        <div className="text-center sm:text-right mt-4 sm:mt-0">
          <a href={`http://localhost:5000/pdfs/`} target="_blank">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
              Join Now
            </button>
          </a>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row rounded-lg mt-3 p-6 justify-around items-center bg-[#EAE9E9]">
        <div className="mb-4 sm:mb-0">
          <img
            className="w-16 h-16 sm:w-24 sm:h-24 rounded-full mx-auto sm:mx-0"
            src={fb}
            alt=""
          />
        </div>
        <div className="text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">
            ৪৩ তম বিসিএস সিলেবাস-৭ পরীক্ষা
          </h1>
          <p className="text-base">25k Post Today Uploaded</p>
        </div>
        <div className="text-center sm:text-right mt-4 sm:mt-0">
          <a href={`http://localhost:5000/pdfs/`} target="_blank">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
              Join Now
            </button>
          </a>
        </div>
      </div>
    </>
  );
};

export default SocialMediya;
