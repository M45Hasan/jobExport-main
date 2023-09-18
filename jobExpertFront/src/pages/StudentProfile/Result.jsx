import { useState, useEffect } from "react";
import JobExpart from "../../components/JobExpart/JobExpart";
import ExamDropdown from "../../components/ExamDropdown/ExamDropdown";
import Slider from "../../components/Slider/Slider";
import axios from "../../components/Axios/axios";
import { useSelector } from "react-redux";

const Result = () => {
  const userDa = useSelector((state) => state);

  const [useInfo ,setUseInfo]=useState()
const email=userDa?.userData?.userInfo?.email
const [cat ,getcat]=useState("")
useEffect(()=>{
  const how = async ()=>{
  let data = await axios.post("/jobExpert/api/v1/my-result", {email,cat});
  console.log(data)
  try{
    if(data.data){
      setUseInfo(data.data)
    }
  }catch(error){
    console.log(error.code)
  }
  }
  how()

},[cat,email])
console.log(useInfo)



  

 
  return (
    <>
      <div className=" flex items-center mt-16">
    
      <ExamDropdown
            titel={"পরিক্ষাঃ"}
            // dataFromeChild={reciveDataFromChild}
            models={(selectedOption) => {
              // Do something with the selectedOption
              // For example, you can log it to the console
              getcat(selectedOption);
            }}
          />
  
      </div>
      <div className="mt-16">

        {useInfo?.map((info,i)=>(
          <>
         
        <div key={i} className="border  bg-primary">
           { info.result?.map((cat ,ci)=>(
          <h1 key={ci} className="text-xl font-semibold text-[#FFFFFF] py-3 text-center">
          {cat.examCategory}
    
          </h1>
          ))}
        </div>
        <div className="mx-auto">
          <table className="table-auto mt-5 w-full text-center">
            <tbody>
              <tr>
                <td className="border px-4 py-2 ">বিষয়</td>
                <td className="border px-4 py-2 ">মোট নাম্বার</td>
                <td className="border px-4 py-2 ">সঠিক উত্তর</td>
                <td className="border px-4 py-2 ">ভুল </td>
                <td className="border px-4 py-2 ">শতকরা</td>
                <td className="border px-4 py-2 ">কমেন্ট</td>
              </tr>
              <tr>
              { info.result?.map((cat )=>(
                <>
                <td className="border px-4 py-2 ">{cat.packageName}</td>
                <td className="border px-4 py-2 ">{cat.mark}</td>
                <td className="border px-4 py-2 ">{cat.rightans }</td>
                <td className="border px-4 py-2 ">{cat.wrongans }</td>
                <td className="border px-4 py-2 ">{cat.percentage }</td>
                <td className="border px-4 py-2 ">{cat.coment }</td>
                </>
              ))}
              </tr>
            </tbody>
          </table>
        </div>
        </>
        ))}
      </div>
      {/* slider */}
      <div className="mt-16">
        <Slider />
      </div>

      {/* job expart */}
      <JobExpart />
    </>
  );
};

export default Result;
