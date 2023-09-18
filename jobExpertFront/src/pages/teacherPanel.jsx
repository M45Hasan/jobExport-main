import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import ExamDropdown from "../components/ExamDropdown/ExamDropdown";
import axios from "../components/Axios/axios";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import Question from "../components/Creatquestion/Question";
import { activeUser } from "../userSlice/userSlice";
import { json, useNavigate } from "react-router-dom";
import AllPackege from "../components/AllPackege/AllPackege";
import UploadPDF from "../components/UploadPDF/UploadPDF";
import UploadVideo from "../components/UploadVideo/UploadVideo";
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function TeacherPanel() {
  const [value, setValue] = React.useState(0);
  const datas = useSelector((state) => state);
  const navigate = useNavigate();
  console.log("active user", datas);
  const dispatch = useDispatch();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  React.useEffect(() => {
    if (datas?.userData?.userInfo?.role == "Student") {
      navigate("/jobexpart");
    }
  }, []);
  const [todayExam, setTodTayExam] = React.useState("");

  async function reciveDataFromChild(data) {
    setTodTayExam(data);
  }

  console.log(todayExam);

  const [freeChecked, setFreeChecked] = React.useState(true);
  const [premiumChecked, setPremiumChecked] = React.useState(false);
  const [premium, setPremium] = React.useState(false);

  const handleFreeChange = () => {
    setFreeChecked(true);
    setPremiumChecked(false);
    setPremium(true);
  };

  const handlePremiumChange = () => {
    setFreeChecked(false);
    setPremiumChecked(true);
    setPremium(false);
  };
  let [catData, setCatData] = React.useState("");
  let [info, setInfo] = React.useState({
    packageName: "",
    packageDetail: "",
    examCategory: "",
    examSubCategory: "",
    examDate: "",
    examTime: "",
    examDuration: "",
    premium: premium,
    examInfo: "",
    examMark: "",
    examSerial: "",
    examTitle: "",
    packageFee: "",
  });

  let categoryData = (data) => {
    setCatData(data);
  };
  let [error, setError] = React.useState({
    packageName: "",
    packageDetail: "",
    examCategory: "",
    examSubCategory: "",
    examDate: "",
    examTime: "",
    examDuration: "",
    examInfo: "",
    examMark: "",
    examSerial: "",
    examTitle: "",
    packageFee: "",
  });

  const handetype = (e) => {
    let { name, value } = e.target;
    setInfo({
      ...info,
      examCategory: catData,
      premium: premiumChecked,
      [name]: value,
    });
    setError({ ...error, [name]: value ? "" : `${name} is required` });
    console.log(info);
  };
  console.log(info);
  let [show, setShow] = React.useState(false);

  const handelSubmit = async () => {
    setError({
      packageName: !info.packageName ? "Please Input Package Name" : "",
      packageDetail: !info.packageDetail
        ? "Please Input package Detail Name"
        : "",
      examSubCategory: !info.examSubCategory
        ? "Please Input exam SubCategory Name"
        : "",
      examDate: !info.examDate ? "Please Input exam Date" : "",
      examTime: !info.examTime ? "Please Input exam Time" : "",
      examDuration: !info.examDuration ? "Please Input exam Duration" : "",
      examInfo: !info.examInfo ? "Please Input exam Info" : "",
      examMark: !info.examMark ? "Please Input exam Mark" : "",
      examSerial: !info.examSerial ? "Please Input exam Serial" : "",
      examTitle: !info.examTitle ? "Please Input exam Title" : "",
      packageFee: !info.packageFee ? "Please Input exam packageFee" : "",
    });
    if (
      !info.packageName ||
      !info.packageDetail ||
      !info.examSubCategory ||
      !info.examDate ||
      !info.examTime ||
      !info.examDuration ||
      !info.examInfo ||
      !info.examMark ||
      !info.examSerial ||
      !info.examTitle
    ) {
      return;
    }

    try {
      const res = await axios.post("/jobExpert/api/v1/packagecreate", {
        ...info,
        nid: datas.userData.userInfo.nid,
        role: datas.userData.userInfo.role,
        packageCreaterEmail: datas.userData.userInfo.email,
        packageCreater: datas.userData.userInfo.name,
      });
      const packegData = {
        ...datas.userData.userInfo,
        packageUid: res.data.packageUid,
        nid: res.data.nid,
      };

      dispatch(activeUser(packegData));
      localStorage.setItem("userInfo", JSON.stringify(packegData));
      toast.success("Successfully Package Create", {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setShow(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box sx={{ width: "100%", marginTop: "50px" }}>
      <ToastContainer
        position="bottom-center"
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
      {/* Same as */}
      <ToastContainer />

      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Create Package" {...a11yProps(0)} />
          <Tab label="My All Package" {...a11yProps(1)} />
          <Tab label="PDF " {...a11yProps(2)} />
          <Tab label="Vidoe Upload " {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        {show ? (
          <Question
            examSerials={info.examSerial}
            NID={datas.userData.userInfo.nid}
          />
        ) : (
          <div>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <div className="max-w-4xl flex flex-col w-full gap-y-4 mt-10">
                {error.packageName && (
                  <p className="text-[red] text-lg">{error.packageName}</p>
                )}
                <TextField
                  marginTop="10px"
                  label="Name Of the Exam"
                  name="packageName"
                  fullWidth
                  onChange={handetype}
                />
                {error.packageDetail && (
                  <p className="text-[red] text-lg">{error.packageDetail}</p>
                )}
                <TextField
                  label="Syllabus"
                  name="packageDetail"
                  fullWidth
                  onChange={handetype}
                />

                <div className="flex gap-x-5">
                  <ExamDropdown
                    titel="Exam Category"
                    name="examCategory"
                    models={categoryData}
                    value={catData}
                    onChange={handetype}
                    dataFromeChild={reciveDataFromChild}
                  />
                  {error.examSubCategory && (
                    <p className="text-[red] text-lg">
                      {error.examSubCategory}
                    </p>
                  )}
                  <TextField
                    name="examSubCategory"
                    onChange={handetype}
                    label="Exam SubCategory "
                  />

                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={freeChecked}
                        onChange={handleFreeChange}
                      />
                    }
                    label="Free"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={premiumChecked}
                        onChange={handlePremiumChange}
                      />
                    }
                    label="Premium"
                  />
                </div>
                {error.examDate && (
                  <p className="text-[red] text-lg">{error.examDate}</p>
                )}
                <p className="text-[red]">Formate will Be: 2023-09-06</p>
                <TextField
                  onChange={handetype}
                  name="examDate"
                  label="Exam Date"
                  placeholder="YYY-MM-DD"
                  fullWidth
                />
                {error.examTime && (
                  <p className="text-[red] text-lg">{error.examTime}</p>
                )}
                <TextField
                  onChange={handetype}
                  name="examTime"
                  label="Exam Time"
                  fullWidth
                />
                {error.examDuration && (
                  <p className="text-[red] text-lg">{error.examDuration}</p>
                )}
                <TextField
                  onChange={handetype}
                  name="examDuration"
                  label="Exam Duration"
                  fullWidth
                  type="number"
                />
                {error.examInfo && (
                  <p className="text-[red] text-lg">{error.examInfo}</p>
                )}
                <TextField
                  onChange={handetype}
                  name="examInfo"
                  label="Exam Info"
                  fullWidth
                />
                {error.examMark && (
                  <p className="text-[red] text-lg">{error.examMark}</p>
                )}
                <TextField
                  onChange={handetype}
                  name="examMark"
                  label="Exam Mark"
                  fullWidth
                  type="number"
                />
                {error.packageFee && (
                  <p className="text-[red] text-lg">{error.packageFee}</p>
                )}
                <TextField
                  onChange={handetype}
                  name="packageFee"
                  label="package Fee"
                  type="number"
                  fullWidth
                />
                {error.examTitle && (
                  <p className="text-[red] text-lg">{error.examTitle}</p>
                )}
                <TextField
                  onChange={handetype}
                  name="examTitle"
                  label="exam Title"
                  fullWidth
                />
                {error.examSerial && (
                  <p className="text-[red] text-lg">{error.examSerial}</p>
                )}
                <TextField
                  onChange={handetype}
                  name="examSerial"
                  label="exam Serial"
                  fullWidth
                />
              </div>
            </Box>
            <div className="mt-5">
              <Button
                onClick={handelSubmit}
                sx={{
                  display: "block",
                  textAlign: "center",

                  margin: "0 auto",
                }}
                variant="contained"
              >
                Submit
              </Button>
            </div>
          </div>
        )}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <AllPackege />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <UploadPDF />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <UploadVideo />
      </CustomTabPanel>
    </Box>
  );
}
