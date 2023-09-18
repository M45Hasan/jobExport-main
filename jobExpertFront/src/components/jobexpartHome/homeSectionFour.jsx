import axios from "axios";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import Api from "../Axios/axios";

const homeSectionFour = () => {
  const [user, setUser] = useState([]);
  const [packageList, setPackageList] = useState([]);

  // all packageList
  useEffect(() => {
    axios
      .get(`${Api.defaults.baseURL}/jobExpert/api/v1/packagelist`)
      .then((res) => {
        setPackageList(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // all user
  useEffect(() => {
    axios
      .get(`${Api.defaults.baseURL}/jobExpert/api/v1/alluser`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  const [su, setSu] = useState("")
  useEffect(() => {

    const mm = async () => {
      const mx = await Api.get( "/jobExpert/api/v1/suu")
      setSu(mx.data)
      console.log("PPPP",mx.data)
    }
   

    mm()
  }, []);

  // total student and teacherCount
  let studentCount = 0;
  let teacherCount = 0;

  user.forEach((item) => {
    if (item.role === "Student") {
      studentCount++;
    } else if (item.role === "Teacher") {
      teacherCount++;
    }
  });

  // total day of company

  const firstDate = new Date("2015-01-01"); // Set your desired first date here
  const [yearCount, setYearCount] = useState(null);

  useEffect(() => {
    // Get the current date as a Date object
    const currentDate = new Date();

    // Calculate the difference in years
    const yearDifference = currentDate.getFullYear() - firstDate.getFullYear();

    // Set the yearCount state with the result
    setYearCount(yearDifference);
  }, []);

  return (
    <>
      <h3 className="text-2xl text-center font-bold mb-10 mt-20">
        আমাদের সফলতা
      </h3>
      <section className="grid  grid-cols-1 md:grid-cols-3 lg:grid-cols-5 justify-items-center items-center gap-5 md:gap-0 mx-5">
        <div className="bg-[#EAE9E9] w-11/12 py-10 rounded-lg hover:bg-[#26A4DE] duration-500 hover:text-[#FFFFFF] cursor-pointer">
          <img
            src="https://i.ibb.co/zbQmQQ7/image-66.png"
            alt=""
            className="w-20 mx-auto"
          />
          <h3 className="text-center text-lg font-bold py-2">মোট সাব্জেক্ট</h3>
          <span className="flex justify-center font-bold text-lg">
            <CountUp end={packageList.length} duration={5} />+
          </span>
        </div>
        <div className="bg-[#EAE9E9] w-11/12 py-10 rounded-lg hover:bg-[#26A4DE] duration-500 hover:text-[#FFFFFF] cursor-pointer">
          <img
            src="https://i.ibb.co/Jqryt5c/image-67.png"
            alt=""
            className="w-20 mx-auto"
          />
          <h3 className="text-center text-lg font-bold py-2">শিক্ষার্থী</h3>
          <span className="flex justify-center font-bold text-lg">
            <CountUp end={studentCount} duration={5} />+
          </span>
        </div>
        <div className="bg-[#EAE9E9] w-11/12 py-10 rounded-lg hover:bg-[#26A4DE] duration-500 hover:text-[#FFFFFF] cursor-pointer">
          <img
            src="https://i.ibb.co/34qdQjt/image-68.png"
            alt=""
            className="w-20 mx-auto"
          />
          <h3 className="text-center text-lg font-bold py-2">সফল শিক্ষার্থী</h3>
          <span className="flex justify-center font-bold text-lg">
           {su.total}
          </span>
        </div>
        <div className="bg-[#EAE9E9] w-11/12 py-10 rounded-lg hover:bg-[#26A4DE] duration-500 hover:text-[#FFFFFF] cursor-pointer">
          <img
            src="https://i.ibb.co/zfrc12M/image-69.png"
            alt=""
            className="w-20 mx-auto"
          />
          <h3 className="text-center text-lg font-bold py-2">মেন্টর</h3>
          <span className="flex justify-center font-bold text-lg">
            <CountUp end={teacherCount} duration={5} />+
          </span>
        </div>
        <div className="bg-[#EAE9E9] w-11/12 py-10 rounded-lg hover:bg-[#26A4DE] duration-500 hover:text-[#FFFFFF] cursor-pointer">
          <img
            src="https://i.ibb.co/FmZFFVq/image-70.png"
            alt=""
            className="w-20 mx-auto"
          />
          <h3 className="text-center text-lg font-bold py-2">সাফলতার বছর</h3>
          <span className="flex justify-center font-bold text-lg">
            <CountUp end={yearCount} duration={5} />+
          </span>
        </div>
      </section>
    </>
  );
};

export default homeSectionFour;
