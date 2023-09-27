import JobExpart from "../../components/JobExpart/JobExpart";
import { useState, useEffect } from "react";

import axios from "../../components/Axios/axios";
import { useSelector } from "react-redux";

const Favourite = () => {
  const userDa = useSelector((state) => state);

  const [useInfo, setUseInfo] = useState([])
  const email = userDa?.userData?.userInfo?.email
  const id = userDa?.userData?.userInfo?.id

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
  const [ck, setCk] = useState(false)
  const [datax, setDatax] = useState([])
  const [dx, setx] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [check, setCheck] = useState(null);
  const handleCLick = async (a) => {
    setShow(!show)
    setDatax(a)


    if (id && a.packageUid) {
      let exampaperid = a.packageUid;
      let examineeId = id;
      try {
        const response = await axios.post("/jobExpert/api/v1/check", { exampaperid, examineeId });
        if (response?.data) {
          setx(response?.data)
        }

      } catch (err) {
        console.log(err.code)
      }
    } else {
      console.log(id, a.packageUid)
    }


  }
  console.log("click", datax)
  console.log("ami dx:", dx)
  console.log("ami userInfo:", useInfo)

  const deleteFun = (del) => {
    const how = async () => {
      try {
        const response = await axios.post('/jobExpert/api/v1/del-fab', { del, email });
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    how();
  }


  const addQ = async (info) => {
    console.log(info._id)
    console.log(id)

    if (info._id) {

      try {
        await axios.post("/jobExpert/api/v1/bank", { inf: info._id, id: id });

      } catch (err) {
        console.log(err.code)
      }
    } else {
      console.log("not found", info.Id)

    }
  }
  return (

    <>
      <div className="mx-auto mt-2">

        <div className="min-h-screen flex flex-row bg-gray-100">
          <div className="flex flex-col w-60 bg-white rounded-r-3xl overflow-hidden">
            <p className="text-xl font-semibold text-[#gray-700] text-start">List </p>
            <ul className="flex flex-col py-2">
              {useInfo.myFab?.map((info, fi) => (
                <li key={fi} className="mt-2">
                  <div
                    onClick={() => handleCLick(info)}
                    className="flex cursor-pointer flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 hover:bg-blue-200 text-gray-500 hover:text-[#9D0C09]"
                  >
                    <span className="text-sm font-medium">{info.packageName.slice(0, 30)}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex-grow p-4 max-h-screen overflow-y-auto  mr-[10%]">
            {useInfo?.myFab?.map((info, fi) => (


              <div
                key={fi}
                className=" relative rounded-lg bg-slate-200 shadow-md p-4 mb-4"
              >
                <h2 className="text-lg inline cursor-pointer font-semibold">
                  {info.examCategory} : {info.examSubCategory}
                </h2>
                <button
                  className="text-base absolute right-2 top-1 font-medium text-[#f14242]"
                  onClick={() => deleteFun(info._id)}
                >
                  X
                </button>

                {
                  dx?.map((itm) => (
                    <>
                      {datax?.qestionList?.map((question, qi) => {

                        const isMatchingSerial = itm.serial === question.serial;


                        if (isMatchingSerial) {

                          itm.rendered = true;


                          return (
                            <div key={qi} className="mb-4 border-[4px] border-salte-800 p-4 rounded-md shadow-lg">
                              <p className="text-base inline-block font-semibold">
                                {`Question ${qi + 1}:`} {itm.serial}{question.serial}
                              </p>
                              <div
                                dangerouslySetInnerHTML={{ __html: question.whatIsTheQuestion }}
                                className="text-gray-700"
                              />
                              <div className="w-[600px]">

                                <div className=" w-full">
                                  {['a', 'b', 'c', 'd'].map((option) => (
                                    <div key={option}>

                                      {itm.answer.split("")[6].toLowerCase() === option ? (


                                        <>
                                          {question.rightAnsOne.split("")[6].toLowerCase() === itm.answer.split("")[6].toLowerCase() &&
                                            <>
                                              <div className="circle-option circle mr-2 my-2  bg-green-500 text-white flex items-center justify-center w-6 h-6 font-semibold">
                                                {option}
                                              </div>
                                              <p className="text-gray-800 bg-green-600 inline-block font-semibold" >
                                                {question[`option${option.toUpperCase()}`]}
                                              </p>
                                            </>}
                                          {question.rightAnsOne.split("")[6].toLowerCase() !== itm.answer.split("")[6].toLowerCase() &&
                                            <>
                                              <div className="circle-option circle mr-2 my-2  bg-red-500 text-white flex items-center justify-center w-6 h-6 font-semibold">
                                                {option}
                                              </div>
                                              <p className="text-gray-800 bg-red-600 inline-block font-semibold" >
                                                {question[`option${option.toUpperCase()}`]}
                                              </p>
                                            </>}


                                        </>
                                      ) : (
                                        <>

                                          <div className="circle-option circle mr-2 my-2 bg-blue-500 text-white flex items-center justify-center w-6 h-6 font-semibold">
                                            {option}
                                          </div>
                                          <p className="text-gray-800 inline-block font-semibold" >
                                            {question[`option${option.toUpperCase()}`]}
                                          </p>

                                          {question.rightAnsOne.split("")[6].toLowerCase() === option &&
                                            <div className="translate-y-[-40px] ">
                                              <div className="circle-option circle mr-2 my-2  bg-green-500 text-white flex items-center justify-center w-6 h-6 font-semibold">
                                                {option}
                                              </div>
                                              <p className="text-gray-800 bg-green-600 inline-block font-semibold" >
                                                {question[`option${option.toUpperCase()}`]}
                                              </p>
                                            </div>}

                                        </>

                                      )}

                                    </div>
                                  ))}
                                </div>

                              </div>

                              <div className="flex gap-x-8 mt-4 ">
                                <button
                                  className="circle-button-bank  text-cyan-700 hover:text-green-500 focus:outline-none"
                                  onClick={() => (setCheck("kk"), setCk("kk"), setCurrentQuestion(question))}
                                >
                                  Details
                                </button>

                                <button
                                  className="circle-button text-cyan-700 hover:text-green-500 focus:outline-none"
                                  onClick={() => addQ(question)}
                                >
                                  add
                                </button>
                              </div>


                              {currentQuestion === question && (
                                <div className="mt-4 mb-4 w-[50%] p-2 rounded-sm border shadow-lg  border-primary bg-[#a4af86]">

                                  <p className="font-semibold">বিবরণ: {question.ansDetail} </p>
                                  <p className=" text-[14px] font-bold text-red-500 mt-6"> &copy;  Job Expert Team </p>
                                  {question.rightAnsTwo !== " " &&
                                    <p className="mt-2 font-semibold">  রেফারেন্স: {question.rightAnsTwo}</p>
                                  }
                                </div>
                              )}

                              <div className="flex justify-between  mt-4 w-[65%] bg-[#a4af86]">
                                <div className="flex gap-x-4 items-center">
                                  <p className=" mb-2">
                                    সঠিক উত্তর:
                                  </p>
                                  <div className="circle-option circle bg-green-500 text-white flex items-center justify-center w-6 h-6 font-semibold">
                                    {question.rightAnsOne.split("")[6]}
                                  </div>
                                </div>
                                <div className="flex gap-x-4 items-center">
                                  <p className=" mb-2">
                                    আপনার উত্তর:
                                  </p>
                                  {itm.answer.split("")[6] === question.rightAnsOne.split("")[6] ?
                                    <div className="circle-option circle bg-green-500 text-white flex items-center justify-center w-6 h-6 font-semibold">
                                      {itm.answer.split("")[6]}
                                    </div> : <div className="circle-option circle bg-orange-500 text-white flex items-center justify-center w-6 h-6 font-semibold">
                                      {itm.answer.split("")[6]}
                                    </div>}
                                </div>
                                <div className="flex gap-x-4 items-center">
                                  {itm.answer.split("")[6] === question.rightAnsOne.split("")[6] ?
                                    <>

                                      <p className="circle-option circle bg-green-600 text-white flex items-center justify-center  font-semibold">
                                        আপনার উত্তর সঠিক
                                      </p>
                                    </>
                                    : <p className="circle-option circle bg-red-600 text-white flex items-center justify-center  font-semibold">আপনার উত্তর ভুল
                                    </p>}
                                </div>

                              </div>

                            </div>
                          );
                        }

                        // If it's not a match or has already been rendered, return null
                        return null;
                      })}
                    </>
                  ))}


              </div>
            ))}
          </div>

        </div>
      </div>




      < JobExpart />
    </>
  );
};

export default Favourite;






