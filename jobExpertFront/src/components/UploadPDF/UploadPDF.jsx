import { Icon, TextField } from "@mui/material";
import Button from "@mui/material/Button";

import React, { useEffect, useState } from "react";
import axios from "../Axios/axios";
import { useSelector } from "react-redux";
import pdf from "../../assets/brandLogo/pdf.png";

import ExamDropdown from "../ExamDropdown/ExamDropdown";
const UploadPDF = () => {
  let userD = useSelector((state) => state);
  const [selectedFile, setSelectedFile] = useState(null);
  const [datas, setDatas] = useState({
    subject: "",
    text: "",
    title: "",
  });

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  console.log(datas);
  const handelInput = (e) => {
    let { name, value } = e.target;
    setDatas({ ...datas, [name]: value });
  };
  const handleDropdownChange = (e) => {
    const selectedOption = e.target.value;
    setDatas({ ...datas, subject: selectedOption }); // Update subject field
  };
  let [rander, setRander] = useState(false);

  const handleFileUpload = async () => {
    setRander(!rander);
    const formData = new FormData();
    formData.append("pdf", selectedFile);

    // Append the data fields to the formData object
    formData.append("email", userD.userData.userInfo.email);
    formData.append("subject", datas.subject);
    formData.append("text", datas.text);
    formData.append("title", datas.title);

    try {
      await axios.post("/jobExpert/api/v1/upload-pdf", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      alert("Error uploading file.");
      console.error(error);
    }
  };

  let [allPdf, setPdf] = useState();
  console.log(allPdf);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data = await axios.get(`/jobExpert/api/v1/upload-pdf`);
        setPdf(data.data);
        setRander(!rander);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData(); // Initial fetch when component mounts
  }, []);

  // Delete PDF
  const handelDelete = async (pdfUrl) => {
    try {
      await axios.delete(`/jobExpert/api/v1/upload-pdf/${pdfUrl}`);
      alert("File deleted successfully.");
    } catch (error) {
      console.error(error);
    }
  };

  // Use handleDeletePdf function to delete PDFs as needed

  //pdf end
  return (
    <>
      <div className="p-4 bg-white rounded-lg shadow-md">
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
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          onChange={handelInput}
          className="block w-full mt-2 p-2 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring focus:ring-primary focus:border-primary bg-white text-gray-900"
        />
        <input
          type="text"
          name="text"
          placeholder="Text"
          onChange={handelInput}
          className="block w-full mt-2 p-2 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring focus:ring-primary focus:border-primary bg-white text-gray-900"
        />
        <input
          type="text"
          name="title"
          placeholder="Title"
          onChange={handelInput}
          className="block w-full mt-2 p-2 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring focus:ring-primary focus:border-primary bg-white text-gray-900"
        />
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="block w-full mt-2 p-2 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring focus:ring-primary focus:border-primary bg-white text-gray-900"
        />
        <button
          onClick={handleFileUpload}
          className="mt-4 px-4 py-2 bg-primary text-white rounded-lg shadow-md hover:bg-primary-dark focus:outline-none focus:ring focus:ring-primary-dark focus:border-primary-dark"
        >
          Upload PDF
        </button>
      </div>
      {allPdf?.map((item) => (
        <div className="flex rounded-lg mt-3 p-6 justify-around items-center bg-[#EAE9E9]">
          <div>
            <img src={pdf} alt="" />
          </div>
          <div>
            <h1 className="text-3xl font-bold ">{item.title}</h1>
            <p className="text-base">{item.text}</p>
          </div>
          <div>
            <Button
              onClick={() => handelDelete(item.pdfUrl)}
              variant="contained"
            >
              Delete
            </Button>
          </div>
        </div>
      ))}
    </>
  );
};

export default UploadPDF;
