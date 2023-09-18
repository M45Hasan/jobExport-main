import React, { useState, useEffect } from "react";

import axios from "../../components/Axios/axios";

import "react-circular-progressbar/dist/styles.css";

import StudentTabs from "./StudentTabs";

import { useDispatch, useSelector } from "react-redux";
import { activeUser } from "../../userSlice/userSlice";
import  apy  from "../../components/urlBackend"

const StudentProfile = () => {
  const [img, setImg] = useState("");
  const [hide, setHide] = useState(false);
  const userDa = useSelector((state) => state);
  let dispatch = useDispatch();
  //pdf start
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    const mx = "hello";
    const formData = new FormData();
    formData.append("pdf", selectedFile);
    formData.append("email", m);
    formData.append("subject", mx);

    try {
      await axios.post("/jobExpert/api/v1/upload-pdf", formData);
      alert("File uploaded successfully.");
    } catch (error) {
      alert("Error uploading file.");
      console.error(error);
    }
  };
  //pdf end
  const handleShow = () => {
    setHide(!hide);
  };
  const handleImageChangeUser = async (e) => {
    e.preventDefault();
    console.log(e.target.files[0]);
    if (e.target.files[0]) {
      setImg(e.target.files[0]);
    } else {
      setImg(null);
    }
  };
  const m = userDa?.userData?.userInfo?.email;
  const imageLoad = async () => {
    setHide(false);
    const formData = new FormData();
    formData.append("avatar", img);
    formData.append("email", m);

    let data = await axios.post("/jobExpert/api/v1/imgupload", formData);
    try {
      if (data.data.avatar) {
        const mx = {
          ...userDa.userData.userInfo,
          userImg: data.data.avatar,
        };
        dispatch(activeUser(mx));
        localStorage.setItem("userInfo", JSON.stringify(mx));
        console.log(data.data.avatar[0]);
      }
    } catch (error) {
      console.log(error.code);
    }
  };

  const imgx = userDa.userData.userInfo.userImg.length - 1;

  const [useInfo, setUseInfo] = useState();
  const email = userDa.userData.userInfo.email;
  useEffect(() => {
    const how = async () => {
      let data = await axios.post("/jobExpert/api/v1/myexamlist", { email });
      console.log(data);
      try {
        if (data.data) {
          setUseInfo(data.data);
        }
      } catch (error) {
        console.log(error.code);
      }
    };
    how();
  }, []);
  console.log(useInfo);

  return (
    <>
      <div className="grid relative grid-cols-1 md:grid-cols-3 gap-5 justify-items-center items-center mt-16 bg-secondary p-10 w-4/5 mx-auto">
        { }
        <div onClick={handleShow}>
          <img
            className=" rounded-full shadow-2xl w-[170px] h-[170px]"
            src={`${apy}/uploads/${userDa.userData.userInfo.userImg[imgx]}`}
          />

       
        </div>

        {/* student info  */}
        {hide && (
          <div className=" w-[5%]   absolute z-20 shadow-2xl   left-[11%] border-gray-700  ">
            <div className="grid grid-cols-1 relative">
              <div className="mt-4  mb-3 ml-auto rounded-sm bg-green-400  text-sm max-w-[181px]">
                <input
                  placeholder="User image "
                  name="avatar"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChangeUser}
                />
              </div>
              <div
                onClick={imageLoad}
                className="text-center  w-full text-sm font-sans ml-[50%]  rounded-full  shadow-2xl bg-primary cursor-pointer text-red-900 font-semibold  absolute bottom-[-10px]"
              >
                Upload
              </div>
            </div>
          </div>
        )}

        <div className="  shadow-md">
          <h1 className="text-xl lg:text-4xl mb-1 font-medium text-[#gray-900] dark:text-whitepb-1">
            {userDa.userData.userInfo.name}
          </h1>
          <p className="text-md lg:text-4xl   text-[#gray-500 ]dark:text-gray-400 pb-1">
            {userDa.userData.userInfo.email}
          </p>
          <p className="text-md lg:text-4xl   text-[#gray-300 ]dark:text-gray-400 pb-1">
            User-Id:{userDa.userData.userInfo.nid}
          </p>
        </div>
      </div>

      {/* students tabs  */}

      <StudentTabs />
    </>
  );
};
export default StudentProfile;
