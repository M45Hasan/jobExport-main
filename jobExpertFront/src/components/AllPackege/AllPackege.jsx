import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "../Axios/axios";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
const AllPackege = () => {
  let data = useSelector((state) => state);
  let [packages, setPackages] = useState([]);
  let [rander, setRander] = useState(false);
  let fatch = async () => {
    try {
      let packege = await axios.post("/jobExpert/api/v1/mypackage", {
        email: data.userData.userInfo.email,
      });
      setPackages(packege.data[0].examPackageId);
      console.log(packege.data[0].examPackageId);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fatch();
  }, [rander]);

  const [visiblePackages, setVisiblePackages] = useState(10);
  const handleMoreQuestions = () => {
    setVisiblePackages((prevVisiblePackages) => prevVisiblePackages + 10);
  };

  const [dedata, setDeData] = useState("");
  let deletes = async (packageid, nid) => {
    try {
      let res = await axios.post("/jobExpert/api/v1/packagedelete", {
        packageUid: packageid,
        nid: nid,
      });
      setDeData(res.data);
      setRander(!rander);
      console.log(dedata);
    } catch (error) {
      console.log(error);
    }
  };

  // mypackagedelete
  return (
    <>
      {packages?.slice(0, visiblePackages).map((item) => (
        <div
          key={item.index}
          className="flex md:flex-row flex-col mb-[20px] md:gap-x-[30px] overflow-hidden items-center border border-[#000000] p-[5px] md:p-[20px]"
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
                  Total Examinee : {item.packageBuyer}
                </p>
              </div>
              <Link to={`examPaper/${item._id}`}>
                <button className="bg-primary mx-auto mt-[10px] md:mt-0 text-[#FFFFFF] flex justify-center items-center py-3 gap-2 px-16 rounded-lg">
                  {item.premium == true ? (
                    <img
                      src="https://i.ibb.co/H7wjCk9/image-56.png"
                      alt=""
                      className="w-5"
                    />
                  ) : (
                    ""
                  )}
                  See Detials
                </button>
              </Link>
              <Button
                onClick={() => deletes(item.packageUid, item.nid)}
                variant="outlined"
                startIcon={<DeleteIcon />}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      ))}

      {visiblePackages < packages.length && (
        <Button
          onClick={handleMoreQuestions}
          sx={{ textAlign: "center", display: "block", margin: "0 auto" }}
          variant="contained"
        >
          More Exam
        </Button>
      )}
    </>
  );
};

export default AllPackege;
