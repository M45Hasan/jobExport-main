import JobExpart from "../../components/JobExpart/JobExpart";
import { useState, useEffect } from "react";

import axios from "../../components/Axios/axios";
import { useSelector } from "react-redux";

const Favourite = () => {
  const userDa = useSelector((state) => state);

  const [useInfo, setUseInfo] = useState([])
  const email = userDa?.userData?.userInfo?.email

  useEffect(() => {
    const how = async () => {
      let data = await axios.post("/jobExpert/api/v1/get-fab", { email });
      console.log(data)
      try {
        if (data?.data) {
          setUseInfo(data?.data)
        }
      } catch (error) {
        console.log(error.code)
      }
    }
    how()

  }, [email])
  const [show, setShow] = useState(false)
  const handleCLick = (a) => {
    setShow(a)
  }
  console.log(show)

  const deleteFun =(del)=>{
    const how = async () => {
      try {
        const response = await axios.post('/jobExpert/api/v1/del-fab', { del,email });
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    how();
  }
  return (

    <>
      <div className="mx-auto mt-2">

        <div className="min-h-screen flex flex-row bg-gray-100">
          <div className="flex flex-col w-56 bg-white rounded-r-3xl overflow-hidden">
            <p className="text-xl font-semibold text-[#gray-700] text-start">List </p>
            <ul className="flex flex-col py-2">
              {useInfo.myFab?.map((info, fi) => (
                <li key={fi}>
                  <div
                    onClick={() => handleCLick(info.packageName)}
                    className="flex cursor-pointer flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 hover:bg-blue-200 text-gray-500 hover:text-[#9D0C09]"
                  >
                    <span className="text-sm font-medium">{info.packageName}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {show &&
            <div className="flex-grow p-4 max-h-[500px] overflow-y-auto scrollbar-hide mr-[10%]">
              {useInfo.myFab?.map((info, fi) => (
                <div key={fi}   className=" relative rounded-lg bg-[#33c35a] shadow-md p-4 mb-4">
                  <h2 className="text-lg inline font-semibold">{info.examCategory} : {info.examSubCategory}</h2> 
                  <button className="text-base absolute right-2 top-1 font-medium text-[#f14242]" onClick={()=>deleteFun(info._id)}>X</button>

                  {info.qestionList.map((question, qi) => (
                    <div key={qi} className=" mb-4 ">
                      <h3 className="text-base font-medium">{`Question ${qi + 1}:`}</h3>
                      <p className="text-gray-700">{question.whatIsTheQuestion}</p>
                      <h3 className="text-base font-medium">Answer:</h3>
                      <p className="text-gray-700">{question.ansDetail}</p>
                    </div>
                  ))}
                     
                </div>
              ))}
            </div>
          }
        </div>
      </div>




      < JobExpart />
    </>
  );
};

export default Favourite;
