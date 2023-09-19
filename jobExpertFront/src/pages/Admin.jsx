import React, { useState, useEffect } from "react";
import axios from "axios";
import apy from "../components/urlBackend"



const Admin = () => {
  const [productsData, setProductsData] = useState("");

  const [histo, setHisto] = useState("");
  const [can, setCan] = useState("");
  const [push, setPush] = useState("");
  const [userShow, setUserShow] = useState(false)
  const [userSho, setUserSho] = useState(false)
  const [userSh, setUserSh] = useState(false)



  useEffect(() => {
    const getApplication = async () => {
      const how = await axios.get(`${apy}/jobExpert/api/v1/allUser`);
      if (how.data.length > 0) {
        setProductsData(how.data);
      }
    };
    getApplication();

  }, [push]);

  useEffect(() => {
    const getApplication = async () => {
      const how = await axios.get(` ${apy}/jobExpert/api/v1/packagelist`);
      if (how.data.length > 0) {
        setHisto(how.data);
      }
    };
    getApplication();
  }, [push]);


  useEffect(() => {
    const getApplication = async () => {
      const how = await axios.get(`${apy}/jobExpert/api/v1/wait-for-result`);
      if (how.data.length > 0) {
        setCan(how.data);
      }
    };
    getApplication();
  }, []);

  console.log(can)
 
  
    const handleProductCli = async (product, can) => {
      setPush(product)
      for (const item of can) {
        if (item.packageBuyer && item.packageBuyer.length > 0) {
          for (const packageBuyer of item.packageBuyer) {

            await axios.post(`${apy}/jobExpert/api/v1/result`, {
              examineeId: packageBuyer,
              examTrack: can[0].packageUid
            });
           

          }
        }
      }
    };




    const handleProductClick = (product) => {
      setPush(product);

    };
    const handleProductClic = (product) => {
      setPush(product);

    };

    const handleDelete = async (product) => {

      await axios.post(`${apy}/jobExpert/api/v1/deleteuser`, { email: product.email });
    };
    const handleDelet = async (product) => {

      await axios.post(`${apy}/jobExpert/api/v1/packagedelete`, { packageUid: product.packageUid, nid: product.nid });
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
                    <p className="text-[14px] font-semibold font-sans ">
                      Result list:{push.result.length}
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
                {push.packageUid &&
                  <>



                    <p className="text-[14px] font-semibold font-sans mb-[2px]">
                      {push.packageName}
                    </p>
                    <p className="text-[14px] font-semibold font-sans mb-[2px]">
                      {push.examCategory}
                    </p>
                    <p className="text-[14px] font-semibold font-sans mb-[2px]">
                      Fee: {push.packageFee} taka
                    </p>
                    <p className="text-[14px] font-semibold font-sans mb-[2px]">
                      Total Examinee: {push.packageBuyer.length}
                    </p>
                    <p className="text-[14px] font-semibold font-sans mb-[2px]">
                      Total Income: {push.packageBuyer.length * parseInt(push.packageFee)}
                    </p>
                    <p className="text-[14px] font-semibold font-sans mb-[2px]">
                      Teacher Email:{push.packageCreaterEmail}
                    </p>
                  </>
                }

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
            <h2 onClick={() => (setUserShow(!userShow), setUserSho(false))} className="text-2xl font-bold mb-4">User:{productsData.length}</h2>

            {userShow &&
              <div className=" h-[400px] w-[250px]  overflow-auto  rounded-md shadow-md  ml-2 relative ">
                {productsData &&
                  productsData.reverse().map(
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
                          <p onClick={() => handleDelete(product)} className="text-[16px] cursor-pointer text-end mr-2 font-bold text-red-600 mb-1">
                            X
                          </p>
                        </div>


                      </div>

                  )}
              </div>
            }

            <h2 onClick={() => (setUserSho(!userSho), setUserShow(false))} className="text-2xl font-bold mb-4">Exam List:{histo.length}</h2>
            {userSho &&
              <div className=" h-[400px] w-[250px]  overflow-auto  rounded-md shadow-md  ml-2 relative ">
                {histo &&
                  histo.reverse().map(
                    (product) =>

                      <div
                        key={product.id}
                        className="bg-[#085140] text-white   border-cyan-400 border-[1px] flex  "
                        onClick={() => handleProductClic(product)}
                      >
                        <div className="bg-[#1F2937] border-gray-400 border-r-[1px]  w-full">
                          <p className="text-[12px] font-medium mb-2">
                            Id: {product.packageUid}
                          </p>
                          <p className="text-[12px] font-medium mb-1">
                            {product.examCategory}
                          </p>
                          <p className="text-[12px] font-medium mb-1">
                            {product.examDate}
                          </p>
                          <p className="text-[12px] font-medium mb-1">
                            {product.premium}
                          </p>
                          <p onClick={() => handleDelet(product)} className="text-[16px] cursor-pointer text-end mr-2 font-bold text-red-600 mb-1">
                            X
                          </p>
                        </div>


                      </div>

                  )}

              </div>
            }
            <h2 onClick={() => (setUserSh(!userSh), setUserSho(false), setUserShow(false))} className="text-2xl font-bold mb-4">Result Publish</h2>

            {userSh && (
              <div className="h-[400px] w-[250px] overflow-auto rounded-md shadow-md ml-2 relative">
                {histo &&
                  histo

                    .filter((product, index) => can[index] && can[index].packageUid === product.packageUid && product.packageBuyer.length !== 0)
                    .map((product) => (
                      <div
                        key={product.id}
                        className="bg-[#085140] text-white cursor-pointer border-cyan-400 border-[1px] flex"
                        onClick={() => handleProductCli(product, can)}
                      >
                        <div className="bg-[#1F2937] border-gray-400 border-r-[1px] w-full">
                          <p className="text-[12px] font-medium mb-2">
                            Id: {product.packageUid}
                          </p>
                          <p className="text-[12px] font-medium mb-1">
                            {product.examCategory}
                          </p>
                          <p className="text-[12px] font-medium mb-1">
                            {product.examDate}
                          </p>
                          <p className="text-[12px] font-medium mb-1">
                            {product.premium}
                          </p>
                          <p className="text-[12px] text-end font-medium mb-1">
                            Click to publish
                          </p>
                        </div>
                      </div>
                    ))}
              </div>
            )}




          </div>




        </div>
      </div>

    );
  }


export default Admin;