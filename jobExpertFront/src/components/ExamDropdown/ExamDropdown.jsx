import { Icon } from "@iconify/react";
import { ChangeEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "../Axios/axios";

const ExamDropdown = ({ dataFromeChild, models, titel }) => {
  const [selectedOption, setSelectedOption] = useState("ফ্রী মডেল টেস্ট");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);

    console.log(selectedOption);
  };
  useEffect(() => {
    models(selectedOption); // Call the models function whenever selectedOption changes
  }, [selectedOption]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axios.post("/jobExpert/api/v1/categorywise", {
          examCategory: selectedOption,
        });
        if (response.data.length > 0) {
          console.log("responsexxx", response.data);
          dataFromeChild(response.data);
        } else {
          dataFromeChild(null);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        dataFromeChild("");
        // Handle the error (e.g., show an error message to the user)
      }
    };
    fetchData();
  }, [selectedOption]);

  const [datax, setData] = useState([]);
  const userData = useSelector((state) => state);
  const navigate = useNavigate();
  useEffect(() => {
    if (!userData?.userData?.userInfo?.verify) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    async function data() {
      let data = await axios.get("/jobExpert/api/v1/packagelist");
      if (data.data.length > 0) {
        console.log(data);
        setData(data.data);
      } else {
        setData(null);
      }
    }
    data();
  }, []);

  return (
    <div className=" flex items-center ">
      <label
        className="block text-gray-700 text-sm font-bold mb-2 border-2 border-primary py-2.5 px-3 mt-2"
        htmlFor="options"
      >
        {titel}
      </label>
      <div className="w-52 relative ml-2">
        <select
          id="options"
          value={selectedOption}
          onChange={handleChange}
          className="block appearance-none w-full bg-white border border-gray-300 text-gray-900 py-3 px-4 pr-8 shadow leading-tight focus:outline-none focus:shadow-outline bg-primary text-[#FFFFFF] cursor-pointer"
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
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <Icon
            icon="iconamoon:arrow-down-2-duotone"
            width={25}
            className="text-[#FFFFFF]"
          />
        </div>
      </div>
    </div>
  );
};

export default ExamDropdown;
