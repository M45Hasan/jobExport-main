// import React, { useState, useEffect, useRef } from "react";
// import Banner from "../components/Banner/Banner";
// import { useParams, Link } from "react-router-dom";
// import axios from "../components/Axios/axios";
// import { useSelector } from "react-redux";
// import { ToastContainer, toast } from "react-toastify";
// import veifysucces from "../assets/verificationIcon/verifysuccess.png";

// const ExamPaper = () => {
//   const { id } = useParams();
//   const selector = useSelector((state) => state);
//   const [data, setData] = useState({});
//   const [selectedOptions, setSelectedOptions] = useState({});
//   const [isExamSubmitted, setIsExamSubmitted] = useState(false);

//   useEffect(() => {
//     async function fetchQuestions() {
//       try {
//         let response = await axios.post("/jobExpert/api/v1/whocanexam", {
//           id: id,
//           myId: selector.userData.userInfo.id,
//         });
//         setData(response.data);
//         const initialSelectedOptions = {};
//         response.data.qestionList?.forEach((item, index) => {
//           initialSelectedOptions[`question-${index}`] = "";
//         });
//         setSelectedOptions(initialSelectedOptions);
//       } catch (e) {
//         console.log(e);
//       }
//     }
//     fetchQuestions();
//   }, [id, selector.userData.userInfo.id]);

//   const [paper, setPaper] = useState({});
//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const pushData = await axios.post("/jobExpert/api/v1/exampaper", {
//           std: selector.userData.userInfo.id,
//           packageUid: data.packageUid,
//           packageName: data.packageName,
//           examCategory: data.examCategory,
//         });

//         setPaper(pushData.data);
//       } catch (error) {
//         console.error("Error:", error);
//       }
//     }

//     fetchData();
//   }, [
//     selector.userData.userInfo.id,
//     data.packageUid,
//     data.packageName,
//     data.examCategory,
//   ]);

//   const selectedRadioStyle = {
//     backgroundColor: "red",
//   };
//   const [optn, setOptn] = useState({});

//   const handleRadioChange = (event, questionIndex) => {
//     const { name, value } = event.target;
//     setOptn({
//       ...optn,
//       [name]: value,
//     });
//     setSelectedOptions({
//       ...selectedOptions,
//       [name]: value,
//     });
//   };

//   let [show, setShow] = useState(false);
//   const handeleStore = async (puid) => {
//     await axios
//       .post("/jobExpert/api/v1/examinee-paper-push", {
//         puid: puid,
//         id: selector.userData.userInfo.id,
//         optn,
//       })
//       .then(async () => {
//         await axios
//           .post("/jobExpert/api/v1/myfab", {
//             packageUid: puid,
//             std: selector.userData.userInfo.id,
//           })
//           .then(() => {
//             setShow(!show);
//           });
//       });
//   };

//   // ======================

//   const examDuration = parseInt(data?.examDuration);

//   const initialTimeRemaining = examDuration * 60;
//   const [timeRemaining, setTimeRemaining] = useState(0);

//   useEffect(() => {
//     setTimeRemaining(initialTimeRemaining);

//     let timer;

//     if (initialTimeRemaining > 0 && !isExamSubmitted) {
//       timer = setInterval(() => {
//         setTimeRemaining((prevTime) => {
//           if (prevTime <= 0) {
//             clearInterval(timer);
//             // Use the selectedOptions directly here
//             const selectedAnswers = { ...selectedOptions };
//             handeleStore(data.packageUid, selectedAnswers);
//             setIsExamSubmitted(true); // Update
//             return 0;
//           }
//           return prevTime - 1;
//         });
//       }, 1000);
//     }

//     return () => {
//       clearInterval(timer);
//     };
//   }, [initialTimeRemaining, isExamSubmitted, data.packageUid, selectedOptions]);

//   return (
// <div>
//   <Banner />
//   <ToastContainer
//     position="top-right"
//     autoClose={2000}
//     hideProgressBar={false}
//     newestOnTop={false}
//     closeOnClick
//     rtl={false}
//     pauseOnFocusLoss
//     draggable
//     pauseOnHover
//     theme="light"
//   />

//   <div className="w-11/12 md:w-4/5 mx-auto text-left relative">
//     {show ? (
//       <div className="text-center mx-0">
//         <img
//           className="text-center mx-auto my-4"
//           src={veifysucces}
//           alt=""
//         />
//         <h2 className="text-xl">Exam Submited</h2>
//         <Link to="/jobexpart">
//           <button className="text-xl text-blue-700">Go To Home</button>
//         </Link>
//       </div>
//     ) : (
//       <>
//         <>
//           <div className="text-center my-10">
//             <h1 className="text-2xl font-bold">{data.examSerial}</h1>
//             <h3 className="my-3">{data.examTitle}</h3>
//             <p>সময়-{data.examDuration} মিনিট</p>
//             {paper.error ? (
//               ""
//             ) : (
//               <div className="text-center   absolute top-[1%] md:top-0 right-0 ">
//                 <div className="bg-white w-[80px] h-[80px]  md:w-[150px] md:h-[150px] rounded-full flex items-center justify-center p-4 shadow-md mx-auto max-w-xs border border-[#26A4DE] ">
//                   <p className="md:text-4xl text-lg font-bold mb-4">
//                     {Math.floor(timeRemaining / 60)}:
//                     {(timeRemaining % 60).toString().padStart(2, "0")}
//                   </p>
//                 </div>
//               </div>
//             )}
//           </div>
//           <div className="  text-left flex justify-between md:flex-row flex-col clearfix">
//             <div className="left-side md:w-[50%]">
//               <ul>
//                 {data.qestionList?.map((item, index) => {
//                   // Render even-numbered questions on the left side
//                   if (index % 2 === 0) {
//                     return (
//                       <li key={index}>
//                         <div
//                           className={`w-11/12 md:w-4/5 mx-auto bg-white ml-2 rounded-lg my-4`}
//                         >
//                           <p className="flex item gap-x-4">
//                             <span>{index + 1}</span>
//                             <h1 className="text-xl font-bold mb-4">
//                               <div
//                                 dangerouslySetInnerHTML={{
//                                   __html: item.whatIsTheQuestion,
//                                 }}
//                               ></div>
//                             </h1>
//                           </p>
//                           <div className="">
//                             <div>
//                               <div className=" ">
//                                 <span>(ক) </span>
//                                 <input
//                                   type="radio"
//                                   id={`question-option-${index}-optionA`}
//                                   name={`question-${index}`}
//                                   value="optionA"
//                                   checked={
//                                     selectedOptions[`question-${index}`] ===
//                                     "optionA"
//                                   }
//                                   onChange={(e) =>
//                                     handleRadioChange(e, index)
//                                   }
//                                   className="mr-2"
//                                   style={
//                                     selectedOptions[`question-${index}`] ===
//                                       "optionA"
//                                       ? selectedRadioStyle
//                                       : {}
//                                   }
//                                 />

//                                 <label
//                                   htmlFor={`question-option-${index}-A`}
//                                 >
//                                   {item.optionA}
//                                 </label>
//                               </div>
//                               <div className=" mt-2">
//                                 <span>(খ) </span>
//                                 <input
//                                   type="radio"
//                                   id={`question-option-${index}-optionB`}
//                                   name={`question-${index}`}
//                                   value="optionB"
//                                   checked={
//                                     selectedOptions[`question-${index}`] ===
//                                     "optionB"
//                                   }
//                                   onChange={(e) =>
//                                     handleRadioChange(e, index)
//                                   }
//                                   className="mr-2"
//                                   style={
//                                     selectedOptions[`question-${index}`] ===
//                                       "optionB"
//                                       ? selectedRadioStyle
//                                       : {}
//                                   }
//                                 />

//                                 <label
//                                   htmlFor={`question-option-${index}-B`}
//                                 >
//                                   {item.optionB}
//                                 </label>
//                               </div>
//                             </div>

//                             <div>
//                               <div className=" ">
//                                 <span>(গ) </span>
//                                 <input
//                                   type="radio"
//                                   id={`question-option-${index}-optionC`}
//                                   name={`question-${index}`}
//                                   value="optionC"
//                                   checked={
//                                     selectedOptions[`question-${index}`] ===
//                                     "optionC"
//                                   }
//                                   onChange={(e) =>
//                                     handleRadioChange(e, index)
//                                   }
//                                   className="mr-2"
//                                   style={
//                                     selectedOptions[`question-${index}`] ===
//                                       "optionC"
//                                       ? selectedRadioStyle
//                                       : {}
//                                   }
//                                 />

//                                 <label
//                                   htmlFor={`question-option-${index}-C`}
//                                 >
//                                   {item.optionC}
//                                 </label>
//                               </div>
//                               <div className="flex items-center mt-2">
//                                 <span className="mr-2">(ঘ)</span>
//                                 <input
//                                   type="radio"
//                                   id={`question-option-${index}-optionD`}
//                                   name={`question-${index}`}
//                                   value="optionD"
//                                   checked={
//                                     selectedOptions[`question-${index}`] ===
//                                     "optionD"
//                                   }
//                                   onChange={(e) =>
//                                     handleRadioChange(e, index)
//                                   }
//                                   className="mr-2"
//                                   style={
//                                     selectedOptions[`question-${index}`] ===
//                                       "optionD"
//                                       ? selectedRadioStyle
//                                       : {}
//                                   }
//                                 />

//                                 <label
//                                   htmlFor={`question-option-${index}-D`}
//                                 >
//                                   {item.optionD}
//                                 </label>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </li>
//                     );
//                   }
//                   return null; // Skip odd-numbered questions in this column
//                 })}
//               </ul>
//             </div>
//             <div className="right-side md:w-[50%]">
//               <ul>
//                 {data.qestionList?.map((item, index) => {
//                   // Render odd-numbered questions on the right side
//                   if (index % 2 !== 0) {
//                     return (
//                       <li key={index}>
//                         <div
//                           className={` mx-auto bg-white ml-2 rounded-lg my-4`}
//                         >
//                           <p className="flex item gap-x-4">
//                             <span>{index + 1}</span>
//                             <h1 className="text-xl font-bold mb-4">
//                               <div
//                                 dangerouslySetInnerHTML={{
//                                   __html: item.whatIsTheQuestion,
//                                 }}
//                               ></div>
//                             </h1>
//                           </p>
//                           <div className="">
//                             <div>
//                               <div className="">
//                                 <span>(ক) </span>
//                                 <input
//                                   type="radio"
//                                   id={`question-option-${index}-optionA`}
//                                   name={`question-${index}`}
//                                   value="optionA"
//                                   checked={
//                                     selectedOptions[`question-${index}`] ===
//                                     "optionA"
//                                   }
//                                   onChange={(e) =>
//                                     handleRadioChange(e, index)
//                                   }
//                                   className="mr-2"
//                                   style={
//                                     selectedOptions[`question-${index}`] ===
//                                       "optionA"
//                                       ? selectedRadioStyle
//                                       : {}
//                                   }
//                                 />
//                                 <label
//                                   htmlFor={`question-option-${index}-A`}
//                                 >
//                                   {item.optionA}
//                                 </label>
//                               </div>
//                               <div className="">
//                                 <span>(খ) </span>
//                                 <input
//                                   type="radio"
//                                   id={`question-option-${index}-optionB`}
//                                   name={`question-${index}`}
//                                   value="optionB"
//                                   checked={
//                                     selectedOptions[`question-${index}`] ===
//                                     "optionB"
//                                   }
//                                   onChange={(e) =>
//                                     handleRadioChange(e, index)
//                                   }
//                                   className="mr-2"
//                                   style={
//                                     selectedOptions[`question-${index}`] ===
//                                       "optionB"
//                                       ? selectedRadioStyle
//                                       : {}
//                                   }
//                                 />
//                                 <label
//                                   htmlFor={`question-option-${index}-B`}
//                                 >
//                                   {item.optionB}
//                                 </label>
//                               </div>
//                             </div>

//                             <div>
//                               <div className="">
//                                 <span>(গ) </span>
//                                 <input
//                                   type="radio"
//                                   id={`question-option-${index}-optionC`}
//                                   name={`question-${index}`}
//                                   value="optionC"
//                                   checked={
//                                     selectedOptions[`question-${index}`] ===
//                                     "optionC"
//                                   }
//                                   onChange={(e) =>
//                                     handleRadioChange(e, index)
//                                   }
//                                   className="mr-2"
//                                   style={
//                                     selectedOptions[`question-${index}`] ===
//                                       "optionC"
//                                       ? selectedRadioStyle
//                                       : {}
//                                   }
//                                 />
//                                 <label
//                                   htmlFor={`question-option-${index}-C`}
//                                 >
//                                   {item.optionC}
//                                 </label>
//                               </div>
//                               <div className=" ">
//                                 <span>(ঘ) </span>
//                                 <input
//                                   type="radio"
//                                   id={`question-option-${index}-optionD`}
//                                   name={`question-${index}`}
//                                   value="optionD"
//                                   checked={
//                                     selectedOptions[`question-${index}`] ===
//                                     "optionD"
//                                   }
//                                   onChange={(e) =>
//                                     handleRadioChange(e, index)
//                                   }
//                                   className="mr-2"
//                                   style={
//                                     selectedOptions[`question-${index}`] ===
//                                       "optionD"
//                                       ? selectedRadioStyle
//                                       : {}
//                                   }
//                                 />
//                                 <label
//                                   htmlFor={`question-option-${index}-D`}
//                                 >
//                                   {item.optionD}
//                                 </label>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </li>
//                     );
//                   }
//                   return null; // Skip even-numbered questions in this column
//                 })}
//               </ul>
//             </div>
//           </div>
//         </>

//         {paper.error ? (
//           <h1 className="text-xl text-[red] text-center font-bold">
//             "You have already attended this exam"
//           </h1>
//         ) : (
//           <div
//             onClick={() => handeleStore(data.packageUid)}
//             className="text-center my-10"
//           >
//             <button className="px-10 py-2 mt-4 bg-primary text-[#FFFFFF] rounded-lg">
//               Submit
//             </button>
//           </div>
//         )}
//       </>
//     )}
//   </div>
// </div>
//   );
// };

// export default ExamPaper;

import React, { useState, useEffect, useRef } from "react";
import Banner from "../components/Banner/Banner";
import { useParams, Link } from "react-router-dom";
import axios from "../components/Axios/axios";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import veifysucces from "../assets/verificationIcon/verifysuccess.png";

const ExamPaper = () => {
  const { id } = useParams();
  const seletor = useSelector((state) => state);
  const [data, setData] = useState({});
  let [show, setShow] = useState(false);
  const [qShow, setQShow] = useState(true)
  const [selectedOptions, setSelectedOptions] = useState({});

  useEffect(() => {
    async function fetchQuestions() {
      try {
        let response = await axios.post("/jobExpert/api/v1/whocanexam", {
          id: id,
          myId: seletor.userData.userInfo.id,
        });
        setData(response.data);
        const initialSelectedOptions = {};
        response.data.qestionList?.forEach((item, index) => {
          initialSelectedOptions[`question-${index}`] = "";
        });
        setSelectedOptions(initialSelectedOptions);
      } catch (e) {
        console.log(e);
      }
    }
    fetchQuestions();
  }, [id, seletor.userData.userInfo.id]);

  const [paper, setPaper] = useState({});
  useEffect(() => {
    async function fetchData() {
      try {
        const pushData = await axios.post("/jobExpert/api/v1/exampaper", {
          std: seletor.userData.userInfo.id,
          packageUid: data.packageUid,
          packageName: data.packageName,
          examCategory: data.examCategory,
        });

        setPaper(pushData.data);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchData();
  }, [
    seletor.userData.userInfo.id,
    data.packageUid,
    data.packageName,
    data.examCategory,
  ]);

  const selectedRadioStyle = {
    backgroundColor: "green", // Replace with the color you want for selected radio inputs
  };
  const [optn, setOptn] = useState({});
  const optnRef = useRef(optn);

  const handleRadioChange = (event, questionIndex) => {
    const { name, value } = event.target;
    setOptn({
      ...optn,
      [name]: value,
    });
    setSelectedOptions({
      ...selectedOptions,
      [name]: value,
    });
  };


  const handeleStore = async (puid) => {
    await axios
      .post("/jobExpert/api/v1/examinee-paper-push", {
        ...{ puid: puid, id: seletor.userData.userInfo.id },
        optn,
      })

      .then(async () => {
        await axios
          .post("/jobExpert/api/v1/myfab", {
            packageUid: puid,
            std: seletor.userData.userInfo.id,
          })
      }).then(() => {
        setShow(!show);
        setOptn({});
      })
  }
  // ======================

  const examDuration = parseInt(data?.examDuration);

  const initialTimeRemaining = examDuration * 60;
  const [timeRemaining, setTimeRemaining] = useState(0);

  const [isExamSubmitted, setIsExamSubmitted] = useState(false);

  useEffect(() => {
    setTimeRemaining(initialTimeRemaining);

    let timer;

    if (initialTimeRemaining > 0 && !isExamSubmitted) {
      timer = setInterval(() => {
        setTimeRemaining((prevTime) => {
          if (prevTime <= 0) {
            clearInterval(timer);
            setQShow(false)
            setShow(false)
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [initialTimeRemaining, optnRef, isExamSubmitted]);

  return (
    <div>
      <Banner />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div className="w-11/12 md:w-4/5 mx-auto text-left relative">
        {show ? (
          <div className="text-center mx-0">
            <img
              className="text-center mx-auto my-4"
              src={veifysucces}
              alt=""
            />
            <h2 className="text-xl">Exam Submited</h2>
            <Link to="/jobexpart">
              <button className="text-xl text-blue-700">Go To Home</button>
            </Link>
          </div>
        ) : (
          <>
            <>
              <div className="text-center my-10">
                <h1 className="text-2xl font-bold">{data.examSerial}</h1>
                <h3 className="my-3">{data.examTitle}</h3>
                <p>সময়-{data.examDuration} মিনিট</p>
                {paper.error ? (
                  ""
                ) : (
                  <div className="text-center   absolute top-[1%] md:top-0 right-0 ">
                    <div className="bg-white w-[80px] h-[80px]  md:w-[150px] md:h-[150px] rounded-full flex items-center justify-center p-4 shadow-md mx-auto max-w-xs border border-[#26A4DE] ">
                      <p className="md:text-4xl text-lg font-bold mb-4">
                        {Math.floor(timeRemaining / 60)}:
                        {(timeRemaining % 60).toString().padStart(2, "0")}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {qShow &&

                <div className="  text-left flex justify-between md:flex-row flex-col clearfix">
                  <div className="left-side md:w-[50%]">
                    <ul>
                      {data.qestionList?.map((item, index) => {
                        // Render even-numbered questions on the left side
                        if (index % 2 === 0) {
                          return (
                            <li key={index}>
                              <div
                                className={`w-11/12 md:w-4/5 mx-auto bg-white ml-2 rounded-lg my-4`}
                              >
                                <p className="flex item gap-x-4">
                                  <span>{index + 1}</span>
                                  <h1 className="text-xl font-bold mb-4">
                                    <div
                                      dangerouslySetInnerHTML={{
                                        __html: item.whatIsTheQuestion,
                                      }}
                                    ></div>
                                  </h1>
                                </p>
                                <div className="">
                                  <div>
                                    <div className=" ">
                                      <span>(ক) </span>
                                      <input
                                        type="radio"
                                        id={`question-option-${index}-optionA`}
                                        name={`question-${index}`}
                                        value="optionA"
                                        checked={
                                          selectedOptions[`question-${index}`] ===
                                          "optionA"
                                        }
                                        onChange={(e) =>
                                          handleRadioChange(e, index)
                                        }
                                        className="mr-2"
                                        style={
                                          selectedOptions[`question-${index}`] ===
                                            "optionA"
                                            ? selectedRadioStyle
                                            : {}
                                        }
                                      />

                                      <label
                                        htmlFor={`question-option-${index}-A`}
                                      >
                                        {item.optionA}
                                      </label>
                                    </div>
                                    <div className=" mt-2">
                                      <span>(খ) </span>
                                      <input
                                        type="radio"
                                        id={`question-option-${index}-optionB`}
                                        name={`question-${index}`}
                                        value="optionB"
                                        checked={
                                          selectedOptions[`question-${index}`] ===
                                          "optionB"
                                        }
                                        onChange={(e) =>
                                          handleRadioChange(e, index)
                                        }
                                        className="mr-2"
                                        style={
                                          selectedOptions[`question-${index}`] ===
                                            "optionB"
                                            ? selectedRadioStyle
                                            : {}
                                        }
                                      />

                                      <label
                                        htmlFor={`question-option-${index}-B`}
                                      >
                                        {item.optionB}
                                      </label>
                                    </div>
                                  </div>

                                  <div>
                                    <div className=" ">
                                      <span>(গ) </span>
                                      <input
                                        type="radio"
                                        id={`question-option-${index}-optionC`}
                                        name={`question-${index}`}
                                        value="optionC"
                                        checked={
                                          selectedOptions[`question-${index}`] ===
                                          "optionC"
                                        }
                                        onChange={(e) =>
                                          handleRadioChange(e, index)
                                        }
                                        className="mr-2"
                                        style={
                                          selectedOptions[`question-${index}`] ===
                                            "optionC"
                                            ? selectedRadioStyle
                                            : {}
                                        }
                                      />

                                      <label
                                        htmlFor={`question-option-${index}-C`}
                                      >
                                        {item.optionC}
                                      </label>
                                    </div>
                                    <div className="flex items-center mt-2">
                                      <span className="mr-2">(ঘ)</span>
                                      <input
                                        type="radio"
                                        id={`question-option-${index}-optionD`}
                                        name={`question-${index}`}
                                        value="optionD"
                                        checked={
                                          selectedOptions[`question-${index}`] ===
                                          "optionD"
                                        }
                                        onChange={(e) =>
                                          handleRadioChange(e, index)
                                        }
                                        className="mr-2"
                                        style={
                                          selectedOptions[`question-${index}`] ===
                                            "optionD"
                                            ? selectedRadioStyle
                                            : {}
                                        }
                                      />

                                      <label
                                        htmlFor={`question-option-${index}-D`}
                                      >
                                        {item.optionD}
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </li>
                          );
                        }
                        return null; // Skip odd-numbered questions in this column
                      })}
                    </ul>
                  </div>
                  <div className="right-side md:w-[50%]">
                    <ul>
                      {data.qestionList?.map((item, index) => {
                        // Render odd-numbered questions on the right side
                        if (index % 2 !== 0) {
                          return (
                            <li key={index}>
                              <div
                                className={` mx-auto bg-white ml-2 rounded-lg my-4`}
                              >
                                <p className="flex item gap-x-4">
                                  <span>{index + 1}</span>
                                  <h1 className="text-xl font-bold mb-4">
                                    <div
                                      dangerouslySetInnerHTML={{
                                        __html: item.whatIsTheQuestion,
                                      }}
                                    ></div>
                                  </h1>
                                </p>
                                <div className="">
                                  <div>
                                    <div className="">
                                      <span>(ক) </span>
                                      <input
                                        type="radio"
                                        id={`question-option-${index}-optionA`}
                                        name={`question-${index}`}
                                        value="optionA"
                                        checked={
                                          selectedOptions[`question-${index}`] ===
                                          "optionA"
                                        }
                                        onChange={(e) =>
                                          handleRadioChange(e, index)
                                        }
                                        className="mr-2"
                                        style={
                                          selectedOptions[`question-${index}`] ===
                                            "optionA"
                                            ? selectedRadioStyle
                                            : {}
                                        }
                                      />
                                      <label
                                        htmlFor={`question-option-${index}-A`}
                                      >
                                        {item.optionA}
                                      </label>
                                    </div>
                                    <div className="">
                                      <span>(খ) </span>
                                      <input
                                        type="radio"
                                        id={`question-option-${index}-optionB`}
                                        name={`question-${index}`}
                                        value="optionB"
                                        checked={
                                          selectedOptions[`question-${index}`] ===
                                          "optionB"
                                        }
                                        onChange={(e) =>
                                          handleRadioChange(e, index)
                                        }
                                        className="mr-2"
                                        style={
                                          selectedOptions[`question-${index}`] ===
                                            "optionB"
                                            ? selectedRadioStyle
                                            : {}
                                        }
                                      />
                                      <label
                                        htmlFor={`question-option-${index}-B`}
                                      >
                                        {item.optionB}
                                      </label>
                                    </div>
                                  </div>

                                  <div>
                                    <div className="">
                                      <span>(গ) </span>
                                      <input
                                        type="radio"
                                        id={`question-option-${index}-optionC`}
                                        name={`question-${index}`}
                                        value="optionC"
                                        checked={
                                          selectedOptions[`question-${index}`] ===
                                          "optionC"
                                        }
                                        onChange={(e) =>
                                          handleRadioChange(e, index)
                                        }
                                        className="mr-2"
                                        style={
                                          selectedOptions[`question-${index}`] ===
                                            "optionC"
                                            ? selectedRadioStyle
                                            : {}
                                        }
                                      />
                                      <label
                                        htmlFor={`question-option-${index}-C`}
                                      >
                                        {item.optionC}
                                      </label>
                                    </div>
                                    <div className=" ">
                                      <span>(ঘ) </span>
                                      <input
                                        type="radio"
                                        id={`question-option-${index}-optionD`}
                                        name={`question-${index}`}
                                        value="optionD"
                                        checked={
                                          selectedOptions[`question-${index}`] ===
                                          "optionD"
                                        }
                                        onChange={(e) =>
                                          handleRadioChange(e, index)
                                        }
                                        className="mr-2"
                                        style={
                                          selectedOptions[`question-${index}`] ===
                                            "optionD"
                                            ? selectedRadioStyle
                                            : {}
                                        }
                                      />
                                      <label
                                        htmlFor={`question-option-${index}-D`}
                                      >
                                        {item.optionD}
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </li>
                          );
                        }
                        return null; // Skip even-numbered questions in this column
                      })}
                    </ul>
                  </div>
                </div>

              }

            </>

            {paper.error ? (
              <h1 className="text-xl text-[red] text-center font-bold">
                "You have already attended this exam"
              </h1>
            ) : (
              <div
                onClick={() => handeleStore(data.packageUid)}
                className="text-center my-10"
              >
                <button className="px-10 py-2 mt-4 bg-primary text-[#FFFFFF] rounded-lg">
                  Submit
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ExamPaper;