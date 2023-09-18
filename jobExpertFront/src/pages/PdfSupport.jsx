import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import Banner from "../components/Banner/Banner";
import ExamDropdown from "../components/ExamDropdown/ExamDropdown";
import pdf from "../assets/brandLogo/pdf.png";
import axios from "../components/Axios/axios";

const PdfSupport = () => {
  const [todayExam, setTodTayExam] = useState("");
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
  return (
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
  );
};

export default PdfSupport;
