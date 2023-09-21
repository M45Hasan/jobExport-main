import { Button } from "@mui/material";
import Banner from "../components/Banner/Banner";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "react-tabs/style/react-tabs.css";
import ExamDropdown from "../components/ExamDropdown/ExamDropdown";
import { useSelector } from "react-redux";
import noexam from "../assets/brandLogo/noexam1.png";
import axios from "../components/Axios/axios";
import { ToastContainer, toast } from "react-toastify";
const ExamZone = () => {
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
  console.log("adfafd", todayExam);

  const [numQuestions, setNumQuestions] = useState(10); // Number of questions to display
  const handleMoreQuestions = () => {
    setNumQuestions(numQuestions + 5); // Increase the number of questions by 10
  };
  console.log(userData.userData.userInfo.email);
  const [show, setShow] = useState(false);

  const addExam = async (uid) => {
    try {
      let data = await axios.post("/jobExpert/api/v1/exampurchase", {
        packageUid: uid,
        email: userData.userData.userInfo.email,
      });
      console.log("ddd", data);
      toast("Free Exam Added", {
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
      toast("You have already", {
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
  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); //
  const day = String(currentDate.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;

  console.log(formattedDate);
  let [category, setCategory] = useState();

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
  }, [category]);

  console.log("setCategory(selectedOption)", category);
  console.log("datax", datax);

  return (
    <div>
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
      <Banner />
      <div className="w-11/12 md:w-4/5 mx-auto pb-16">
        <div className="pl-4 md:pl-12 mt-16 mb-[64px]">
          <ExamDropdown
            titel={"পরীক্ষা:"}
            dataFromeChild={reciveDataFromChild}
            models={(selectedOption) => {
              // Do something with the selectedOption
              // For example, you can log it to the console
              setCategory(selectedOption);
            }}
          />
        </div>

        {datax?.length !== 0 ? (
          <>
            {" "}
            {datax?.map((item, k) => {
              const isFutureDate =
                new Date(item.examDate) > new Date(formattedDate);
              console.log(item.examDate);

              if (
                item.premium === false &&
                item.examCategory === category &&
                isFutureDate
              ) {
                return (
                  <div
                    key={k}
                    className="flex md:flex-row flex-col mb-[20px] md:gap-x-[30px] items-center border border-[#000000] p-[5px] md:p-[20px]"
                  >
                    <div className="md:w-[20%] w-[60%]">
                      <img
                        className="w-full"
                        src="https://i.ibb.co/vqbtXkJ/image-163.png"
                        alt=""
                      />
                    </div>
                    <div className="w-[80%] p-[15px] md:p-[30px]">
                      <h2 className="text-[20px] md:text-[40px] font-semibold">
                        {item.packageName}
                      </h2>
                      <p className="md:text-[24px] text-[14px] my-[10px]">
                        {item.packageDetail}
                      </p>
                      <div className="flex md:flex-row flex-col gap-x-0 md:gap-x-10  justify-evenly md:justify-start items-start md:items-center">
                        <div>
                          <p className="md:text-[24px] text-[14px] ">
                            পরীক্ষা শুরুঃ {item.examDate}
                          </p>
                          <p className="md:text-[24px] text-[14px] ">
                            {" "}
                            পরীক্ষার সময়ঃ {item.examTime}
                          </p>
                          <p className="md:text-[24px] text-[14px] ">
                            Total Examinee : {item.packageBuyer.length}
                          </p>
                        </div>

                        <button
                          onClick={() => addExam(item.packageUid)}
                          className="bg-primary mx-auto mt-[10px] md:mt-0 text-[#FFFFFF] flex justify-center items-center py-3 gap-2 px-16 rounded-lg"
                        >
                          {item.premium === true ? (
                            <img
                              src="https://i.ibb.co/H7wjCk9/image-56.png"
                              alt=""
                              className="w-5"
                            />
                          ) : (
                            ""
                          )}
                          Participate Exam
                        </button>
                      </div>
                    </div>
                  </div>
                );
              } else {
                return null;
              }
            })}
          </>
        ) : (
          show && (
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
          )
        )}
      </div>
      {todayExam.length < 5 ? (
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
    </div>
  );
};

export default ExamZone;
