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
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";
import axios from "../components/Axios/axios";
import { useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import { useDispatch, useSelector } from "react-redux";
import { activeUser } from "../userSlice/userSlice";
import {
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Radio,
  RadioGroup,
} from "@mui/material";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";

const defaultTheme = createTheme();
export default function singup() {
  const userData = useSelector((state) => state);
  let dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    pass: "",
  });
  const [infoData, setInfoData] = useState({
    name: "",
    email: "",
    pass: "",
  });
  const handelInput = (e) => {
    let { name, value } = e.target;
    setInfoData({ ...infoData, [name]: value });
    setErrors({ ...errors, [name]: value ? "" : `${name} is required` });
    console.log(infoData);
  };

  const [selectedRole, setSelectedRole] = useState(""); // Default role
  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const handleSubmit = async () => {
    if (!infoData.name) {
      setErrors({ ...errors, name: "name Must be usees" });
    } else if (!infoData.email) {
      setErrors({ ...errors, email: "email must be uses" });
    } else if (!infoData.pass) {
      setErrors({ ...errors, pass: "password must be usees" });
    } else {
      try {
        setLoading(true);
        const data = await axios.post("/jobExpert/api/v1/regi", {
          ...infoData,
          role: selectedRole, // Include the selected role in the request data
        });

        dispatch(activeUser(data.data));
        setTimeout(() => {
          navigate("/verify");
        }, 2000);
        console.log("data", data);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
  };

  React.useEffect(() => {
    if (userData?.userData?.userInfo?.verify == true) {
      navigate("/jobexpart");
    }
  }, []);

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
                ই-মেইল অথবা ফোন নাম্বার দিয়ে রেজিস্ট্রেশন করুন
              </Typography>

              <TextField
                margin="normal"
                fullWidth
                id="name"
                label="নাম লিখুন"
                name="name"
                autoComplete="name"
                onChange={handelInput}
                autoFocus
              />
              {errors.name && (
                <p className="text-[red] text-lg">name must be use</p>
              )}
              <TextField
                margin="normal"
                fullWidth
                id="email"
                label="ই-মেইল অথবা ফোন নাম্বার লিখুন"
                name="email"
                autoComplete="email"
                onChange={handelInput}
                autoFocus
              />
              {errors.email && (
                <p className="text-red-500 text-lg">Email/phone is required</p>
              )}
              {/* <TextField
                margin="normal"
                fullWidth
                name="pass"
                label="পাসওয়ার্ড লিখুন"
                type="password"
                onChange={handelInput}
                id="password"
                autoComplete="current-password"
              /> */}
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  fullWidth
                  name="pass"
                  onChange={handelInput}
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

              {errors.pass && (
                <p className="text-red-500 text-lg ">Password is required</p>
              )}
              <div className="mt-2 w-full">
                <FormControl fullWidth variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Confirm Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    fullWidth
                    name="pass"
                    onChange={handelInput}
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        ></IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>
              </div>

              <RadioGroup
                aria-label="role"
                name="role"
                value={selectedRole}
                onChange={handleRoleChange}
                sx={{ flexDirection: "row" }} // Align radio buttons horizontally
              >
                <FormControlLabel
                  value="Teacher"
                  control={<Radio />}
                  label="Teacher"
                />
                <FormControlLabel
                  value="Student"
                  control={<Radio />}
                  label="Student"
                />
              </RadioGroup>
              <div onClick={handleSubmit}>
                {loading ? (
                  <LoadingButton
                    sx={{
                      mt: 3,
                      mb: 2,
                      pt: 1.5,
                      fontSize: "16px",
                    }}
                    loading
                    loadingPosition="start"
                    startIcon={<SaveIcon />}
                    variant="outlined"
                  >
                    রেজিস্ট্রেশন করুন
                  </LoadingButton>
                ) : (
                  <Button
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
                    <Link>রেজিস্ট্রেশন করুন</Link>
                  </Button>
                )}
              </div>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mt: 5,
                }}
              >
                <Box
                  sx={{
                    flex: 1,
                    width: "200px",

                    border: "1px solid  #808080",
                  }}
                ></Box>
                <Box sx={{ mx: 2 }}>OR</Box>
                <Box sx={{ flex: 1, border: "1px solid  #808080" }}></Box>
              </Box>
            </Box>

            {/* google and facebook login button */}
            {/* <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "10px",
                mt: 2,
              }}
            >
              <Button
                variant="contained"
                sx={{
                  flex: 1,
                  mt: 3,
                  mb: 2,
                  p: 1.5,
                  backgroundColor: "#FFFFFF",
                  "&:hover": {
                    backgroundColor: "#FFFFFF",
                  },
                }}
              >
                <Box sx={{ width: "100%" }}>
                  <img src={google} alt="" />
                </Box>
              </Button>
              <Button
                variant="contained"
                sx={{
                  flex: 1,
                  mt: 3,
                  mb: 2,
                  p: 1.5,
                  backgroundColor: "#FFFFFF",
                  "&:hover": {
                    backgroundColor: "#FFFFFF",
                  },
                }}
              >
                <Box sx={{ width: "100%" }}>
                  <img src={facebook} alt="" />
                </Box>
              </Button>
            </Box> */}

            {/* group logo png */}

            {/* <Box sx={{ width: "80%", my: 5, mx: "auto" }}>
              <img src={logo} alt="" className="mx-auto mt-16" />
              <div className="flex flex-col md:flex-row justify-center items-center gap-5 mt-5">
                <img src={appstore} alt="" className="w-40" />
                <img src={googlestore} alt="" className="w-40" />
              </div>
            </Box> */}
          </Container>
        </Box>
      </ThemeProvider>
      <Footer />
    </>
  );
}
