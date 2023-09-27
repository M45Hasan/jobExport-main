/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import logo from "../assets/brandLogo/logos.png";
import google from "../assets/brandLogo/google.png";
import facebook from "../assets/brandLogo/facebook.png";
import appstore from "../assets/brandLogo/appstore (1).png";
import googlestore from "../assets/brandLogo/appstore (2).png";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { ToastContainer, toast } from "react-toastify";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "react-toastify/dist/ReactToastify.css";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";
import { Link, useNavigate } from "react-router-dom";
import {
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Modal,
  OutlinedInput,
} from "@mui/material";
import axios from "../components/Axios/axios";
import { useDispatch, useSelector } from "react-redux";
import { activeUser } from "../userSlice/userSlice";

const defaultTheme = createTheme();

// const userData = useSelector((state) => state);

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const login = () => {
  const dispathc = useDispatch();
  const navigate = useNavigate();

  const mydata = useSelector((state) => state);

  const [info, setInfo] = React.useState({
    email: "",
    pass: "",
  });
  const [error, setError] = React.useState({
    email: "",
    pass: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!info.email) {
      return setError({ email: "please input your email" });
    } else if (!info.pass) {
      return setError({ pass: "please input your password" });
    } else {
      try {
        let res = await axios.post("/jobExpert/api/v1/login", info);
        if (res.data.verify == false) {
          return toast.warn("Please verify your email", {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else if (res.data.verify == true) {
          dispathc(activeUser(res.data));
          localStorage.setItem("userInfo", JSON.stringify(res.data));
          if (res.data.message) {
            setTimeout(() => {
              navigate("/jobexpart");
            }, 2000);
            return toast.success(res.data.message, {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }
        }
        if (res.data.message == "authicitaion error") {
          toast.error("Authication Error", {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      } catch (error) {
        toast.error("Authication Error", {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };

  const handelChange = (e) => {
    const { name, value } = e.target;
    setInfo({ ...info, [name]: value });
    setError({ ...error, [name]: value ? "" : `${name} is requried` });
  };
  console.log(info);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [hide, setHide] = React.useState(true);
  const [otp, setOtp] = React.useState(false);
  const [verifyotp, setVerifyotp] = React.useState(false);

  React.useEffect(() => {
    if (mydata?.userData?.userInfo?.verify == true) {
      navigate("/jobexpart");
    }
  }, []);

  const handelOtpSend = async () => {
    setOtp(true);
    try {
      let data = await axios.post("/jobExpert/api/v1/resetsent", info);
      console.log(data);
      setInfo({ email: "" });
      setHide(false);
      if (data.data.message) {
        dispathc(activeUser(info));
        return toast.success(data.data.message, {
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
    } catch (error) {
      console.log("kire", error);
      toast.error("Invalid email", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setInfo({ email: "" });
    }
  };

  const [forgetOtp, setForgetOtp] = React.useState(["", "", "", ""]);
  const forgetotpChange = (e, index) => {
    const { value } = e.target;
    const newOtp = [...forgetOtp];
    newOtp[index] = value;
    setForgetOtp(newOtp);
  };
  let updatepass = {
    ...mydata.userData.userInfo,
    pass: info.pass,
  };
  const handelforgetOtpSubmit = async (e) => {
    setOtp(false);
    setHide(false);
    setVerifyotp(true);
    e.preventDefault();
    const enteredOtp = forgetOtp.join("");

    let userverify = {
      ...mydata.userData.userInfo,
      email: mydata.userData.userInfo.email,
      otpmatch: enteredOtp,
    };

    dispathc(activeUser(userverify));
    try {
      let data = await axios.post("/jobExpert/api/v1/resetmatch", userverify);
      console.log(data);
    } catch (error) {
      setVerifyotp(false);
      setOtp(true);
      toast.error("Invalid OTP", {
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

  const handelsetPass = async () => {
    if (!info.pass) {
      return setError({ pass: "please input your password" });
    } else {
      try {
        let data = await axios.post("/jobExpert/api/v1/resetmatch", updatepass);
        toast.success("update your password successfully", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          window.location.reload();
          navigate("/login");
        }, 2000);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <>
      <Navbar />
      <ThemeProvider theme={defaultTheme}>
        <Box sx={{ mt: 10, mb: 10 }}>
          <Box
            sx={{
              fontSize: "16px",
              width: "50%",
              mx: "auto",
              textAlign: "center",
              mt: 5,
            }}
          >
            <p>
              Job Expert বাংলাদেশের প্রথম এবং সর্ববৃহৎ Virtual Exam Center (VEC)
              বিসিএস প্রিলিমিনারি এবং অন্যান্য MCQ পরীক্ষার প্রস্তুতির জন্য
              হাজারো পরীক্ষার্থীর সাথে চূড়ান্ত পরীক্ষার আগেই LIVE মডেল টেস্ট
              দিয়ে নিজের অবস্থান যাচাই করে নিন।
            </p>
          </Box>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <ToastContainer
              position="top-center"
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
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box sx={{ width: "200px", mb: 3 }}>
                <img src={logo} alt="" />
              </Box>
              <Typography component="h1" variant="h5" sx={{ fontSize: "16px" }}>
                ই-মেইল অথবা ফোন নাম্বার দিয়ে লগ-ইন করুন
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                {error && <p className="text-red-600">{error.email}</p>}

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="ই-মেইল অথবা ফোন নাম্বার"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={handelChange}
                />

                {/* <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="pass"
                  label="পাসওয়ার্ড"
                  type="password"
                  id="password"
                  onChange={handelChange}
                  autoComplete="current-password"
                /> */}

                <FormControl fullWidth variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    fullWidth
                    onChange={handelChange}
                    name="pass"
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>
                {error && <p className="text-red-600">{error.pass}</p>}

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    pt: 1.5,
                    backgroundColor: "#26A4DE",
                    "&:hover": {
                      backgroundColor: "#26A4DE",
                    },
                    fontSize: "16px",
                  }}
                >
                  লগ-ইন করুন
                </Button>
              </Box>
              <div className="flex justify-between items-center">
                <Link to="/singup" variant="body2">
                  <p className="font-bold">
                    Don't have an account?{" "}
                    <span className="text-[#26A4DE] text-lg"> Sign Up</span>
                  </p>
                </Link>
                <Link onClick={handleOpen} variant="body2">
                  <p className=" ml-6"> Forgot password? </p>
                </Link>
              </div>
              <Box>
                <Grid container>
                  <Grid item xs={8} textAlign="left"></Grid>
                  <Grid item xs={2} textAlign="right">
                    <div>
                      <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Box sx={style}>
                          {hide ? (
                            <>
                              <Typography
                                id="modal-modal-title"
                                variant="h6"
                                component="h3"
                              >
                                enter your email
                              </Typography>
                              <Typography
                                id="modal-modal-description"
                                sx={{ mt: 2 }}
                              >
                                <TextField
                                  fullWidth
                                  onChange={handelChange}
                                  label="Email"
                                  name="email"
                                  id="fullWidth"
                                  value={info.email}
                                />
                              </Typography>
                              <Button
                                sx={{ marginTop: "20px" }}
                                variant="contained"
                                onClick={handelOtpSend}
                              >
                                Send OTP
                              </Button>
                            </>
                          ) : (
                            ""
                          )}

                          {otp ? (
                            <form className="text-center ">
                              <Typography
                                id="modal-modal-title"
                                variant="h6"
                                component="h3"
                              >
                                Enter OTP
                              </Typography>
                              <div className="flex items-center justify-center ml-4">
                                {forgetOtp.map((digit, index) => (
                                  <input
                                    key={index}
                                    type="text"
                                    className="w-16 md:w-20 h-12 text-center text-xl border rounded-md mx-1 focus:outline-none"
                                    maxLength={1}
                                    pattern="[0-9]"
                                    name={`otp-${index}`}
                                    required
                                    value={digit}
                                    onChange={(e) => forgetotpChange(e, index)}
                                  />
                                ))}
                              </div>
                              <button
                                onClick={handelforgetOtpSubmit}
                                type="submit"
                                className="ml-4 px-24 md:px-28 py-2 bg-blue-500 text-white rounded bg-primary  focus:outline-none mt-10"
                              >
                                ভেরিফাই করুন
                              </button>
                            </form>
                          ) : (
                            ""
                          )}

                          {verifyotp ? (
                            <div>
                              <Typography
                                id="modal-modal-title"
                                variant="h6"
                                component="h3"
                              >
                                Set your new password
                              </Typography>

                              <TextField
                                id="filled-basic"
                                label="New Password"
                                variant="filled"
                                name="pass"
                                fullWidth
                                onChange={handelChange}
                              />
                              <TextField
                                id="filled-basic"
                                label="Confrime Password"
                                variant="filled"
                                name="pass"
                                fullWidth
                                sx={{ marginTop: "20px" }}
                                onChange={handelChange}
                              />
                              {error && (
                                <p className="text-red-600">{error.pass}</p>
                              )}

                              <Button
                                onClick={handelsetPass}
                                sx={{ marginTop: "20px" }}
                                variant="contained"
                              >
                                Submite
                              </Button>
                            </div>
                          ) : (
                            ""
                          )}
                        </Box>
                      </Modal>
                    </div>
                  </Grid>
                </Grid>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mt: 5,
                }}
              ></Box>
            </Box>
          </Container>
        </Box>
      </ThemeProvider>
      <Footer />
    </>
  );
};

export default login;
