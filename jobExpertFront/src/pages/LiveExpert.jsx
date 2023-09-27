
import Banner from "../components/Banner/Banner";
import ExamDropdown from "../components/ExamDropdown/ExamDropdown";
import { useState, useEffect } from "react";
import JobExpart from "../components/JobExpart/JobExpart";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import noexam from "../assets/brandLogo/noexam1.png";
import axios from "../components/Axios/axios";
import { ToastContainer, toast } from "react-toastify";

import Button from "@mui/material/Button";
const LiveExpert = () => {
  const [datax, setData] = useState("");
  const userData = useSelector((state) => state);
  const navigate = useNavigate();
  useEffect(() => {
    if (!userData?.userData?.userInfo?.verify) {
      navigate("/login");
    }
  }, []);

  const [todayExam, setTodTayExam] = useState("");

  async function reciveDataFromChild(data) {
    setTodTayExam(data);
    setNumQuestions(10);
  }

  const [numQuestions, setNumQuestions] = useState(10); // Number of questions to display
  const handleMoreQuestions = () => {
    setNumQuestions(numQuestions + 10); // Increase the number of questions by 10
  };

  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  // timeCOntroll
  const [isExamTime, setIsExamTime] = useState(false);

  useEffect(() => {

    const examTimeDate = new Date(todayExam[0]?.examTime);


    const currentTime = new Date();


    if (currentTime >= examTimeDate) {
      setIsExamTime(true);
    }
  }, [todayExam]);

  // match my purchase 

  const id = userData?.userData?.userInfo?.id
  console.log(id)

  const addExam = async (item) => {
    console.log(item)
    try {
      let data = await axios.post("/jobExpert/api/v1/ssl-request", {
        packageUid: item.packageUid,
        email: userData.userData.userInfo.email,
        nid: item.nid,
        name: item.name,
        packageName: item.packageName,
        examCategory: item.examCategory,
      });

      if (data.data.url) {
        window.location.replace(data.data.url);

        console.log("ajaj", data.data.url);
      }

      console.log(data);
    } catch (e) {
      console.log(e.code)
    }
  };
  // add free 

  const addExamm = async (uid) => {
    try {
      let data = await axios.post("/jobExpert/api/v1/exampurchase", {
        packageUid: uid,
        email: userData.userData.userInfo.email,
      });
      toast(`${data.data.message ? data.data.message : data.data.error}`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

    } catch (e) {
      toast(` ${e.code}`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

    }
  };

  // add fab 


  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* banner section  */}
      <Banner />
      <div className="w-11/12 md:w-4/5 mx-auto pb-16">
        <div className="pl-4 md:pl-12 mt-16 mb-[64px]">
          <ExamDropdown
            titel={"পরীক্ষা"}
            dataFromeChild={reciveDataFromChild}
            models={(selectedOption) => {

              console.log(selectedOption);
            }}
          />
        </div>

        {todayExam.length != 0
          ? todayExam.slice(0, numQuestions).map((item, k) => (
            <div
              key={k}
              className="flex md:flex-row flex-col mb-[20px] md:gap-x-[30px] items-center border border-[#000000] p-[5px] md:p-[20px]"
            >


              <div className="md:w-[20%] w-[60%]">
                <img
                  className="w-full "
                  src="https://i.ibb.co/vqbtXkJ/image-163.png"
                  alt=""
                />
              </div>
              <div className=" w-[80%] p-[15px] md:p-[30px]">
                <h2 className="text-[20px] md:text-[40px] font-semibold">
                  {item.packageName}
                </h2>
                <p className="md:text-[24px] text-[14px] my-[10px]">
                  {item.packageDetail}
                </p>
                <div className="flex md:flex-row flex-col gap-x-0 md:gap-x-10  justify-center md:justify-start items-start md:items-center">
                  <div>
                    <p className="md:text-[24px] text-[14px] ">
                      পরীক্ষা শুরুঃ {item.examDate}
                    </p>
                    <p className="md:text-[24px] text-[14px] ">
                      {" "}

                      পরীক্ষার ফি {item.packageFee}
                    </p>
                    <p className="md:text-[24px] text-[14px] ">
                      Total Examinee : {item.packageBuyer.length}
                    </p>
                  </div>


                  {item.premium ? (
                    todayExam.some((exam) => exam.packageUid === item.packageUid && exam.packageBuyer.includes(id)) ? (
                      <Link to={`examPaper/${item._id}`}>
                        <button className="bg-primary mx-auto mt-[10px] md:mt-0 text-[#FFFFFF] flex justify-center items-center py-3 gap-x-2 px-16 rounded-lg">
                          <img
                            src="https://i.ibb.co/H7wjCk9/image-56.png"
                            alt=""
                            className="w-5"
                          />
                          Start Now
                        </button>
                      </Link>
                    ) : (
                      <button
                        onClick={() => addExam(item)}
                        className="bg-primary mx-auto mt-[10px] md:mt-0 text-[#FFFFFF] flex justify-center items-center py-3 gap-x-2 px-16 rounded-lg"
                      >
                        <img
                          src="https://i.ibb.co/H7wjCk9/image-56.png"
                          alt=""
                          className="w-5"
                        />
                        Buy Now
                      </button>
                    )
                  ) : (
                    todayExam.some((exam) => exam.packageUid === item.packageUid && exam.packageBuyer.includes(id)) ? (
                      <Link to={`examPaper/${item._id}`}>
                        <button className="bg-primary mx-auto mt-[10px] md:mt-0 text-[#FFFFFF] flex justify-center items-center py-3 gap-2 px-16 rounded-lg">
                          Start Now
                        </button>
                      </Link>
                    ) : (
                      <button
                        onClick={() => addExamm(item.packageUid)}
                        className="bg-primary mx-auto mt-[10px] md:mt-0 text-[#FFFFFF] flex justify-center items-center py-3 gap-2 px-16 rounded-lg"
                      >
                        Add
                      </button>
                    )
                  )}




                </div>
              </div>
            </div>
          ))
          : show && (
            <>
              <h2 className="text-center text-xl font-bold mb-10">
                NO Exams Available{" "}
              </h2>
              <img
                className="block mx-auto text-center"
                src={noexam}
                alt="No Exams Available"
              />
            </>
          )}
      </div>
      {todayExam.length > 0 ? (
        <Button
          onClick={handleMoreQuestions}
          sx={{ textAlign: "center", display: "block", margin: "0 auto" }}
          variant="contained"
        >
          More Exam
        </Button>
      ) : (
        ""
      )}

      {/* job expert section  */}
      <JobExpart />
    </>
  );
};

export default LiveExpert;

