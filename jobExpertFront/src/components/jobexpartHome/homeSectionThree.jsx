import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import Api from "../Axios/axios";
import axios from "axios";
import  apy  from "../../components/urlBackend"

const homeSectionThree = () => {
  const [data, setData] = useState([]);

  // jobExpert/api/v1/our-success

  useEffect(() => {
    axios
      .get(`${Api.defaults.baseURL}/jobExpert/api/v1/story-all`)
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div id="successfullyStory">
      <h3 className="text-2xl text-center font-bold mb-10 mt-20">
        Job Expert -সাকসেস স্টোরি
      </h3>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 justify-items-center items-center mt-10 mx-5">
        {data?.slice(0, 4)?.map((story) => (
          <>
            <div className="w-[300px] max-w-sm rounded overflow-hidden shadow-lg bg-[#EAE8E8]">
              <div className="w-full h-full py-5">
                <img
                  className="w-[150px] h-[150px] border-4 border-white rounded-full mx-auto"
                  src={`${apy}/jobExport/uploads/${story?.url}`}
                  alt="Sunset in the mountains"
                />
                {`${apy}/jobExpert/uploads/${story?.url}`}
              </div>
              <div className="px-6 py-4 text-center text-white bg-[#26A4DE] rounded-t-[50px]">
                <h5 className="text-lg font-bold tracking-widest mb-2 uppercase">
                  {story?.name}
                </h5>
                <p className="font-medium">{story?.email}</p>
                <p className="my-3">{story?.story}</p>

                <button className="bg-white text-black px-4 py-2 rounded-lg my-3 transition duration-500 ease-in-out hover:scale-105">
                  আরও দেখুন
                </button>
              </div>
            </div>
          </>
        ))}
      </section>
    </div>
  );
};

export default homeSectionThree;
