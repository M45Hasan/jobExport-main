import JobExpart from "../../components/JobExpart/JobExpart";
import { useState, useEffect } from "react";
import ExamDropdown from "../../components/ExamDropdown/ExamDropdown";
import axios from "../../components/Axios/axios";
import { useSelector } from "react-redux";

const ExamUpdate = () => {
  const userDa = useSelector((state) => state);

  const [useInfo ,setUseInfo]=useState()
const email=userDa?.userData?.userInfo?.email
const [cat ,getcat]=useState("")
useEffect(()=>{
  const how = async ()=>{
  let data = await axios.post("/jobExpert/api/v1/myexamlist", {email,cat});
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
      <div className="mx-auto mt-5">
        <table className="table-auto w-full text-center">
          <tbody>
            <tr>
              <td className="border px-4 py-2">পরীক্ষার আইডি</td>
              {useInfo?.map((info,fi)=>(
                info?.myExam?.map((ex )=>(
              <td key={fi} className="border px-4 py-2">{ex.packageUid}</td>
                ))
              ))}
            </tr>
            <tr>
              <td className="border px-4 py-2">পরীক্ষার নাম </td>
              {useInfo?.map((info,fi)=>(
                info?.myExam?.map((ex )=>(
              <td key={fi} className="border px-4 py-2">{ex.packageName}</td>
              ))
              ))}
            </tr>
            <tr>
              <td className="border px-4 py-2">পরীক্ষার সিলেবাস </td>
              {useInfo?.map((info,fi)=>(
                info?.myExam?.map((ex )=>(
              <td key={fi} className="border px-4 py-2">{ex.examSubCategory}</td>
              ))
              ))}
            </tr>
            <tr>
              <td className="border px-4 py-2">পরীক্ষার শুরু </td> 
              {useInfo?.map((info,fi)=>(
                info?.myExam?.map((ex )=>(
              <td key={fi} className="border px-4 py-2">
                {ex.examTime}
              </td>
               ))
               ))}
            </tr>
            <tr>
              <td className="border px-4 py-2">পরীক্ষার তারিখ </td>
              {useInfo?.map((info,fi)=>(
                info?.myExam?.map((ex )=>(
              <td key={fi} className="border px-4 py-2">
                {ex.examDate}
              </td>
               ))
               ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* job expart */}
      <JobExpart />
    </>
  );
};

export default ExamUpdate;
