import React, { useState, useEffect } from "react";
import axios from "axios";
import apy from "../components/urlBackend"

import Api from "../components/Axios/axios";

const Admin = () => {
  const [productsData, setProductsData] = useState("");

  const [histo, setHisto] = useState("");
  const [can, setCan] = useState("");
  const [push, setPush] = useState("");
  console.log(apy)
  //push data
  const handlePush = (info) => {


    setPush(info);
  };

  useEffect(() => {
    const getApplication = async () => {
      const how = await axios.get(`${apy}/jobExpert/api/v1/allUser`);
      if (how.data.length > 0) {
        setProductsData(how.data);
      }
    };
    getApplication();

  }, []);

  useEffect(() => {
    const getApplication = async () => {
      const how = await axios.get(" http://localhost:5000/lostFound/histoget");
      if (how.data.length > 0) {
        setHisto(how.data);
      }
    };
    getApplication();
  }, []);
  console.log(histo);

  useEffect(() => {
    const getApplication = async () => {
      const how = await axios.get(" http://localhost:5000/lostFound/cancelget");
      if (how.data.length > 0) {
        setCan(how.data);
      }
    };
    getApplication();
  }, []);
  console.log(can);

  const handleProductClick = (product) => {
    setPush(product);

  };

  return (
    <div className="bg-[#767889] w-full flex   h-screen">
      <div className="w-64 bg-gray-800 h-screen text-white p-4">
        <div className=" mt-8 ">
          {push && (
            <>

              <p className="text-[14px] font-semibold font-sans ">
                {push.name}
              </p>
              <p className="text-[14px] font-semibold font-sans ">
                {push.email}
              </p>
              {push.role === "Student" &&
                <>
                  <p className="text-[14px] font-semibold font-sans ">
                    {push.role}
                  </p>
                  <p className="text-[14px] font-semibold font-sans ">
                    Total Exam:{push.myExam.length}
                  </p>
                </>
              }
              {push.role === "Teacher" &&
                <>
                  <p className="text-[14px] font-semibold font-sans ">
                    {push.role}
                  </p>
                  <p className="text-[14px] font-semibold font-sans ">
                    Total Exam Pacakge:{push.examPackageId.length}
                  </p>
                  <p className="text-[14px] font-semibold font-sans mb-[2px]">
                    PDF:{push.pdf.length}
                  </p>
                  <p className="text-[14px] font-semibold font-sans mb-[2px]">
                    VIDEO:{push.video.length}
                  </p>
                  <p className="text-[14px] font-semibold font-sans mb-[2px]">
                    QUIZ:{push.quiz.length}
                  </p>
                </>
              }
              <p className="text-[14px] font-semibold font-sans mb-[2px]">
                {push.fiderId}
              </p>

              <span className="text-cyan-400 mt-[2]">Product Details</span>
              <p className="text-[14px] font-semibold font-sans mb-[2px]">
                {push.category}
              </p>
              <p className="text-[14px] font-semibold font-sans mb-[2px]">
                {push.subcat}
              </p>
              <p className="text-[14px] font-semibold font-sans mb-[2px]">
                {push.claimId}
              </p>
              {push.mess && (
                <p className="text-[14px] font-semibold font-sans mb-[2px]">
                  message: {push.mess}
                </p>
              )}
              {push.rate && (
                <p className="text-[14px] font-semibold font-sans mb-[2px]">
                  Rate: {push.rate}
                </p>
              )}
              {push.confirm && (
                <p className="text-[14px] font-semibold font-sans mb-[2px]">
                  status: {push.confirm}
                </p>
              )}
              {push.opt && (
                <p className="text-[14px] font-semibold font-sans mb-[2px] text-cyan-400">
                  OTP sent: {push.opt}
                </p>
              )}
            </>
          )}
        </div>
      </div>
      <div className=" flex flex-col flex-1">
        <nav className="flex items-center justify-between bg-gray-900 px-4 py-3">
          <div className="text-white font-bold text-xl">Admin Page</div>
          <div className="flex space-x-4">
            <a href="#" className="text-white hover:text-gray-300">
              Home
            </a>

            {/* Add more links for navigation */}
          </div>
        </nav>


        <div className="flex-1 bg[#CDF4E3] rounded-md   ">
          <h2 className="text-2xl font-bold mb-4">User:{productsData.length}</h2>
          <div className=" h-[400px] w-[250px]  overflow-auto  rounded-md shadow-md  ml-2 relative ">
            {productsData &&
              productsData.map(
                (product) =>

                  <div
                    key={product.id}
                    className="bg-[#085140] text-white   border-cyan-400 border-[1px] flex  "
                    onClick={() => handleProductClick(product)}
                  >
                    <div className="bg-[#1F2937] border-gray-400 border-r-[1px]  w-full">
                      <p className="text-[12px] font-medium mb-2">
                        {product.name}
                      </p>
                      <p className="text-[12px] font-medium mb-1">
                        {product.email}
                      </p>
                      <p className="text-[12px] font-medium mb-1">
                        {product.role}
                      </p>
                      <p className="text-[12px] text-end font-medium mb-1">
                        X
                      </p>
                    </div>


                  </div>

              )}
          </div>
        </div>


      </div>
    </div>

  );
};

export default Admin;