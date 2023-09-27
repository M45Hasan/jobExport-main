// import Slider from "../../components/Slider/Slider";
// import JobExpart from "../../components/JobExpart/JobExpart";
// import { useState, useEffect } from "react";
// import axios from "../../components/Axios/axios";
// import { useSelector } from "react-redux";

// const Bank = () => {
// const userDa = useSelector((state) => state);
// const email = userDa?.userData?.userInfo?.email;
// const id = userDa?.userData?.userInfo?.id;
// const [datax, setDatax] = useState([]);
// const [show, setShow] = useState(false);
// const [dx, setx] = useState([]);
// const [pk, sePk] = useState([]);
// const [useInfo, setUseInfo] = useState([]);
// const [displayedCategories, setDisplayedCategories] = useState([]);

// useEffect(() => {
//   const muo = async () => {
//     try {
//       const response = await axios.post("/jobExpert/api/v1/get-bank", { id });
//       if (response?.data) {
//         setUseInfo(response?.data);
//       } else {
//         console.log(id);
//       }
//     } catch (err) {
//       console.log(err.code);
//     }
//   };

//   muo();
// }, []);



// useInfo.forEach((item, key) => {
//   console.log(item.examCategory)
// })


// const handleCLick = async (a) => {
//   setx(a)
//   console.log(a);
// };



// return (
//   <>
//     <div className="mx-auto mt-2">
//       <div className="min-h-screen flex flex-row bg-gray-100">
//         <div className="flex flex-col w-60 bg-white rounded-r-3xl overflow-hidden">
//           <p className="text-xl font-semibold text-[#gray-700] text-start">List</p>
//           <ul className="flex flex-col py-2">
//             {useInfo?.map((info, fi) => (
//               // Add the category to the displayed list
//               (
//                 <li key={fi} className="mt-2">
//                   <div
//                     onClick={() => handleCLick(info)}
//                     className="flex cursor-pointer flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 hover:bg-blue-200 text-gray-500 hover:text-[#9D0C09]"
//                   >
//                     <span className="text-sm font-medium">{info.examCategory}</span>
//                   </div>
//                 </li>)

//             ))}
//           </ul>
//         </div>







// <div
//   className={`w-11/12 md:w-4/5 mx-auto bg-white ml-2 rounded-lg my-4`}
// >
//   <p className="flex item gap-x-4">

//     <h1 className="text-xl font-bold mb-4">
//       <div
//         dangerouslySetInnerHTML={{
//           __html: dx.whatIsTheQuestion,
//         }}
//       ></div>
//     </h1>
//   </p>
//   <div className="">
//     <div>
//       <div className=" ">
//         <span>(ক) </span>


//         <label
//           htmlFor={`question-option-${"index"}-A`}
//         >
//           {dx.optionA}
//         </label>
//       </div>
//       <div className=" mt-2">
//         <span>(খ) </span>


//         <label
//           htmlFor={`question-option-${dx}-B`}
//         >
//           {dx.optionB}
//         </label>
//       </div>
//     </div>

//     <div>
//       <div className=" ">
//         <span>(গ) </span>


//         <label
//           htmlFor={`question-option-${"index"}-C`}
//         >
//           {dx.optionC}
//         </label>
//       </div>
//       <div className="flex items-center mt-2">
//         <span className="mr-2">(ঘ)</span>


//         <label
//           htmlFor={`question-option-${"index"}-D`}
//         >
//           {dx.optionD}
//         </label>
//       </div>
//       <div className="flex items-center mt-2">
//         <span className="mr-2">(ঘ)</span>


//         <label
//           htmlFor={`question-option-${"index"}-D`}
//         >
//           {dx.optionD}
//         </label>
//       </div>
//       <div className="flex items-center mt-2">
//         <span className="mr-2">Answer:</span>


//         <label
//           htmlFor={`question-option-${"index"}-D`}
//         >
//           {dx.rightAnsOne}
//         </label>
//       </div>
//       <div className="flex items-center mt-2">
//         <span className="mr-2">Details:</span>


//         <label
//           htmlFor={`question-option-${"index"}-D`}
//         >
//           {dx.ansDetail}
//         </label>
//       </div>
//       <div className="flex items-center mt-2">
//         <span className="mr-2">Reference:</span>


//         <label
//           htmlFor={`question-option-${"index"}-D`}
//         >
//           {dx.rightAnsTwo}
//         </label>
//       </div>
//     </div>
//   </div>
// </div>






//       </div>
//     </div>
//     {/* slider section */}
//     <div className="mt-16">
//       <Slider />
//     </div>
//     {/* job expert logo */}
//     <JobExpart />
//   </>
// );
// };

// export default Bank;

import Slider from "../../components/Slider/Slider";
import JobExpart from "../../components/JobExpart/JobExpart";
import { useState, useEffect } from "react";
import axios from "../../components/Axios/axios";
import { useSelector } from "react-redux";

const Bank = () => {
  const userDa = useSelector((state) => state);

  const id = userDa?.userData?.userInfo?.id;

  const [useInfo, setUseInfo] = useState([]);
  const [displayedCategories, setDisplayedCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

 
    const muo = async () => {
      try {
        const response = await axios.post("/jobExpert/api/v1/get-bank", { id });
        if (response?.data) {
          setUseInfo(response?.data);

          const uniqueCategories = [...new Set(response.data.map((info) => info.examCategory))];
          setDisplayedCategories(uniqueCategories);
        } else {
          console.log(id);
        }
      } catch (err) {
        console.log(err.code);
      }
    };

 useEffect(()=>{
  muo()
 },[])
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };
  console.log(selectedCategory)

  // delete
  const handelDel = async (info) => {
    console.log(info._id)
    if (info._id) {
      try {
        await axios.post("/jobExpert/api/v1/del-bank", { inf: info._id, id: id });


       muo();
      } catch (err) {
        console.log(err.code);
      }
    } else {
      console.log("No data found")
    }
  }
  return (
    <>
      <div className="mx-auto mt-2">
        <div className="min-h-screen flex flex-row bg-gray-100">
          <div className="flex flex-col w-60 bg-white rounded-r-3xl overflow-hidden">
            <p className="text-xl font-semibold text-[#gray-700] text-start">List</p>
            <ul className="flex flex-col py-2">
              {displayedCategories.map((category, index) => (
                (category &&
                  <li key={index} className="mt-2">
                    <div
                      onClick={() => handleCategoryClick(category)}
                      className={`flex cursor-pointer flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 hover:bg-blue-200 text-gray-500 hover:text-[#9D0C09] ${selectedCategory === category ? 'text-[#9D0C09]' : ''}`}
                    >
                      <span className="text-sm font-medium">{category}</span>
                    </div>
                  </li>)
              ))}
            </ul>
          </div>

          <div className={`w-11/12 md:w-4/5 mx-auto overflow-y-scroll h-screen bg-white ml-2 rounded-lg my-4 ${selectedCategory ? 'block' : 'hidden'}`}>
            {/* Render questions based on the selected category */}
            {useInfo
              .filter((dx) => dx.examCategory === selectedCategory).reverse()
              .map((dx, index) => (
                <div key={index} className=" border p-4 rounded-md mb-1 shadow-none">
                  <div
                    className={`w-11/12 md:w-4/5 mx-auto bg-sky-200 ml-2 rounded-lg my-4`}
                  >
                    <p className="flex item gap-x-4 ">
                      <p className=" inline-block font-bold  bg-green-600 cursor-pointer text-white rounded-md mt-1 text-center w-5 h-6">{index + 1}</p>
                      <h1 className="text-xl font-bold mb-4">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: dx.whatIsTheQuestion,
                          }}
                        ></div>
                      </h1>
                      <p onClick={() => handelDel(dx)} className=" inline-block font-bold bg-red-600 text-white cursor-pointer  rounded-md mt-1 text-center w-5 h-6">X</p>
                    </p>

                    <div className="">
                      <div>
                        <div className=" ">
                          <span>(ক) </span>


                          <label
                            htmlFor={`question-option-${"index"}-A`}
                          >
                            {dx.optionA}
                          </label>
                        </div>
                        <div className=" mt-2">
                          <span>(খ) </span>


                          <label
                            htmlFor={`question-option-${dx}-B`}
                          >
                            {dx.optionB}
                          </label>
                        </div>
                      </div>

                      <div>
                        <div className=" ">
                          <span>(গ) </span>


                          <label
                            htmlFor={`question-option-${"index"}-C`}
                          >
                            {dx.optionC}
                          </label>
                        </div>
                        <div className="flex items-center mt-2">
                          <span className="mr-2">(ঘ)</span>


                          <label
                            htmlFor={`question-option-${"index"}-D`}
                          >
                            {dx.optionD}
                          </label>
                        </div>
                        <div className="flex items-center mt-2">
                          <span className="mr-2">(ঘ)</span>


                          <label
                            htmlFor={`question-option-${"index"}-D`}
                          >
                            {dx.optionD}
                          </label>
                        </div>
                        <div className="flex items-center mt-2">
                          <span className="mr-2">Answer:</span>


                          <label htmlFor={`question-option-${"index"}-D`}>
                            {dx.rightAnsOne.split("")[6] === "A" ? <p>ক</p> :
                              dx.rightAnsOne.split("")[6] === "B" ? <p>খ</p> :
                                dx.rightAnsOne.split("")[6] === "C" ? <p>গ</p> :
                                  dx.rightAnsOne.split("")[6] === "D" ? <p>ঘ</p> : null}
                          </label>

                        </div>
                        <div className="flex items-center mt-2">
                          <span className="mr-2">Details:</span>


                          <label
                            htmlFor={`question-option-${"index"}-D`}
                          >
                            {dx.ansDetail}
                          </label>
                        </div>
                        <div className="flex items-center mt-2">
                          <span className="mr-2">Reference:</span>


                          <label
                            htmlFor={`question-option-${"index"}-D`}
                          >
                            {dx.rightAnsTwo}
                          </label>
                        </div>
                        <p className="text-base text-end font-bold text-primary">&copy; Job Expert Team</p>

                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* slider section */}
      <div className="mt-16">
        <Slider />
      </div>

      {/* job expert logo */}
      <JobExpart />
    </>
  );
};

export default Bank;
