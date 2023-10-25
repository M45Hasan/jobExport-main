import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import Banner from "../components/Banner/Banner";
import ExamDropdown from "../components/ExamDropdown/ExamDropdown";
import pdf from "../assets/brandLogo/pdf.png";
import axios from "../components/Axios/axios";
import api from "../components/Axios/nxios"
import { useSelector } from "react-redux";

const PdfSupport = () => {
  const [todayExam, setTodTayExam] = useState("");
  const userData = useSelector((state) => state);
  const handleDropdownChange = (e) => {
    const selectedOption = e.target.value;
    setTodTayExam(selectedOption);
  };

  console.log(todayExam);

  let [pdfsx, setPdfsx] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        let data = await axios.get(`/jobExpert/api/v1/upload-pdf`);
        setPdfsx(data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData(); // Initial fetch when component mounts
  }, []);
  /////////##############################################################//////////start
  const [dtt, setDtt] = useState([])
  const [dot, setDot] = useState({
    id: "",
    cid: "",
    name: "",
    email: "",
    courseName: "",
    option: "",
    startDate: "",
    routine: "",
    classTime: "",
  })
  const [dt, setDt] = useState([])
  const [sh, setSh] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data = await api.get(`/atms/api/v1/course`);
        setDtt(data.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData(); // Initial fetch when component mounts
  }, []);
  console.log(dtt)
  const handleDtt = (title) => {


    setDot((prevDot) => ({
      ...prevDot,
      id: userData?.userData?.userInfo?.id, cid: title._id, name: userData?.userData?.userInfo?.name, email: userData?.userData?.userInfo?.email, courseName: title.title, startDate: title.startDate,
    }));
    console.log(title._id)
    setDt(title)
    setSh(!sh)
    setOns(false)
    setOffs(false)


  }


  const [on, setOn] = useState([])
  const [ons, setOns] = useState(false)
  const [off, setOff] = useState([])
  const [offs, setOffs] = useState(false)
  const handleOnline = async (id) => {
    console.log(id)
    try {
      let data = await api.post(`/atms/api/v1/course/online/${id}`);
      setOn(data.data.onlineSchedule);
      setOns(!ons)
    } catch (error) {
      console.error(error);
    }
  }
  console.log(on)
  const handleOffline = async (id) => {
    try {
      let data = await api.post(`/atms/api/v1/course/offline/${id}`);
      setOff(data.data.offlineSchedule);
      setOffs(!offs)
    } catch (error) {
      console.error(error);
    }
  }



  const submitt = async () => {
    console.log(dot)
    try {

    
      let data = await api.post(`/atms/api/v1/student/purchase`, dot);

      
      console.log(dot)
    } catch (error) {
      console.error(error);

    }
  }

  const Schedule = (ii) => {

    setDot((prevDot) => ({
      ...prevDot,
      option: ii.a,

      routine: ii.oni.routine,
      classTime: ii.oni.classTime
    }));
    console.log("iim:", ii)
  }
  /////////##############################################################//////////
  return (

    <>
      <>
        <Banner />
        <div className="container mx-auto">
          <div className="my-10">
            <div className="mb-4">
              <label htmlFor="options" className="text-gray-600 font-medium">
                Select an Option
              </label>
              <div className="relative">
                <select
                  id="options"
                  onChange={handleDropdownChange}
                  className="block w-full mt-2 p-2 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring focus:ring-primary focus:border-primary bg-white text-gray-900"
                >
                  <option value="ফ্রী মডেল টেস্ট" name="Bangla" selected>
                    ফ্রী মডেল টেস্ট
                  </option>
                  <option value="বিসিএস প্রস্তুতি" name="বিসিএস প্রস্তুতি">
                    বিসিএস প্রস্তুতি
                  </option>
                  <option value="প্রাথমিক শিক্ষক প্রস্তুতি" name="প্রাথমিক">
                    প্রাথমিক শিক্ষক প্রস্তুতি
                  </option>
                  <option value="নিবন্ধন প্রস্তুতি" name="নিবন্ধন">
                    নিবন্ধন প্রস্তুতি
                  </option>
                  <option value="জব সলুশন প্রস্তুতি" name="জব">
                    জব সলুশন প্রস্তুতি
                  </option>
                  <option value="ব্যাংক প্রস্তুতি" name="ব্যাংক">
                    ব্যাংক প্রস্তুতি
                  </option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none">
                  {/* Replace with your custom icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          {pdfsx?.map((item) =>
            item.subject == todayExam ? (
              <div className="flex rounded-lg mt-3 p-6 justify-around items-center bg-[#EAE9E9]">
                <div>
                  <img src={pdf} alt="" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold ">{item.title}</h1>
                  <p className="text-base">{item.text}</p>
                </div>
                <div>
                  <a
                    href={`http://localhost:5000/pdfs/${item.pdfUrl}`}
                    target="_blank"
                  >
                    <Button
                      onClick={() => handelDelete(item.pdfUrl)}
                      variant="contained"
                    >
                      Download
                    </Button>
                  </a>
                </div>
              </div>
            ) : (
              ""
            )
          )}
        </div>
      </>



      {dtt && dtt.map((title, i) => (
        <div className=" m-10 " key={i} onClick={() => handleDtt(title)}> {title.title}</div>
      ))}

      <div className="m-10">
        <p>Hasan</p>
        <p>email@gmail.com</p>
        <>

          <div >
            <p>start date: {dt?.admissionLastDate?.split("T")[0]}</p>
            <p>Addmission fee: {dt?.mockTest}</p>
            <p>start date: {dt?.admissionLastDate?.split("T")[0]}</p>
            <div className=" mt-5 flex gap-x-10  w-full">
              <div>
                {dt.online &&
                  <>
                    <p onClick={() => handleOnline(dt?._id)}>Online</p>
                    <div className=" flex w-[400px] flex-wrap">
                      {ons && on && on.map((oni, i) => (
                        <div onClick={() => Schedule({ oni, a: i + 1 })} key={i + 1} className=" w-[180px] m-2  bg-slate-200 shadow-md hover:scale-105 duration-200 ease-in">
                          <p className="mt-2"> {oni.classTime}</p>
                          <p> {oni.routine}</p>
                          <p>Remaining Seat: {oni.remainingSeat}</p>
                        </div>
                      ))}
                    </div>
                  </>
                }
              </div>
              <div>
                {dt.offline &&
                  <>
                    <p onClick={() => handleOffline(dt?._id)}>Offline</p>
                    <div className="flex flex-wrap w-[600px] ">
                      {offs && off && off.map((oni, i) => (

                        <div key={i} onClick={() => Schedule({ oni, a: i + 5 })} className=" w-[180px] m-2 bg-slate-200 shadow-md hover:scale-105 duration-200 ease-in">
                          <p className="mt-2"> {oni.classTime}</p>
                          <p> {oni.routine}</p>
                          <p>Remaining Seat: {oni.remainingSeat}</p>
                        </div>

                      ))}  </div> </>}
              </div>

              <button onClick={submitt}>submitt</button>
            </div>
          </div>

        </>
      </div>

    </>
  )
};

export default PdfSupport;
