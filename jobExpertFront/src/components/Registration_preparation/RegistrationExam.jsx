import JobExpart from "../JobExpart/JobExpart";
import { useState, useEffect } from "react";

const RegistrationExam = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("registration_preparation.json")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);
  return (
    <>
      <div className="w-11/12 md:w-4/5 mx-auto pb-16">
        {/* section one */}
        <section className="flex flex-col justify-center mt-16 gap-y-10">
          {data.map((item, index) => (
            <div
              key={index}
              className="bg-[#EAE9E9] flex flex-col lg:flex-row w-11/12 py-10 rounded-lg duration-500 mx-auto px-10 gap-y-5"
            >
              <div className="flex flex-col md:flex-row items-center gap-5 gap-y-5">
                <div>
                  <img
                    src={item.icon}
                    alt=""
                    className="w-1/2 md:w-4/5 mx-auto"
                  />
                </div>
                <div className="text-center md:text-left space-y-2 w-11/12 md:w-1/2">
                  <h3 className=" text-lg font-bold py-2">{item.title}</h3>
                  <p className="">{item.description}</p>
                  <p>{item.start}</p>
                </div>
              </div>
              <div className="w-full lg:w-1/2 mx-auto">
                <h3 className="my-3 py-3 px-2 border rounded-lg inline-block">
                  {item.time_count}
                </h3>
                <button className="bg-primary text-[#FFFFFF] flex justify-center items-center py-3 gap-2 px-16 rounded-lg">
                  <img src={item.premium_icon} alt="" className="w-5" />{" "}
                  {item.button}
                </button>
              </div>
            </div>
          ))}
        </section>
      </div>

      {/* job expart section  */}
      <JobExpart />
    </>
  );
};

export default RegistrationExam;
