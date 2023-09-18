import React, { useState } from "react";
import logo from "../assets/brandLogo/logo.png";
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
import { useDispatch, useSelector } from "react-redux";
import { activeUser } from "../userSlice/userSlice";
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";

const defaultTheme = createTheme();

export default function Signup() {
  const userData = useSelector((state) => state);
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
    role: "student", // Default role is set to "student"
  });

  const handelInput = (e) => {
    let { name, value } = e.target;
    setInfoData({ ...infoData, [name]: value });
    setErrors({ ...errors, [name]: value ? "" : `${name} is required` });
  };

  const handleRoleChange = (e) => {
    setInfoData({ ...infoData, role: e.target.value });
  };

  const handleSubmit = async () => {
    if (!infoData.name) {
      setErrors({ ...errors, name: "Name is required" });
    } else if (!infoData.email) {
      setErrors({ ...errors, email: "Email is required" });
    } else if (!infoData.pass) {
      setErrors({ ...errors, pass: "Password is required" });
    } else {
      try {
        setLoading(true);
        let data = await axios.post("/jobExpert/api/v1/regi", infoData);
        dispatch(activeUser(data.data));
        setTimeout(() => {
          navigate("/verify");
        }, 2000);
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

  return (
    <>
      <Navbar />
      <ThemeProvider theme={defaultTheme}>
        <Box sx={{ mt: 10, mb: 10 }}>
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
                Signup with Email or Phone
              </Typography>

              <FormControl component="fieldset" sx={{ mt: 2 }}>
                <RadioGroup
                  row
                  name="role"
                  value={infoData.role}
                  onChange={handleRoleChange}
                >
                  <FormControlLabel
                    value="student"
                    control={<Radio />}
                    label="Student"
                  />
                  <FormControlLabel
                    value="teacher"
                    control={<Radio />}
                    label="Teacher"
                  />
                </RadioGroup>
              </FormControl>

              <TextField
                margin="normal"
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                onChange={handelInput}
                autoFocus
                error={!!errors.name}
                helperText={errors.name}
              />

              <TextField
                margin="normal"
                fullWidth
                id="email"
                label="Email or Phone Number"
                name="email"
                autoComplete="email"
                onChange={handelInput}
                error={!!errors.email}
                helperText={errors.email}
              />

              <TextField
                margin="normal"
                fullWidth
                name="pass"
                label="Password"
                type="password"
                onChange={handelInput}
                id="password"
                autoComplete="current-password"
                error={!!errors.pass}
                helperText={errors.pass}
              />

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
                    Register
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
                    <Link to="/register">Register</Link>
                  </Button>
                )}
              </div>
            </Box>
          </Container>
        </Box>
      </ThemeProvider>
      <Footer />
    </>
  );
}
