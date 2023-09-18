import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import logo from "../../assets/brandLogo/navloogo.png";
import CallIcon from "@mui/icons-material/Call";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { activeUser } from "../../userSlice/userSlice";
import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import axios from "../Axios/axios";
import  apy  from "../../components/urlBackend"

const settings = ["Profile", "Logout"];
const Loginpages = ["হোম", "সাকসেস স্টোরি", "এক্সাম", "আমার কোর্স"];
const pages = [
  "চাকরি প্রস্তুতি",
  "ভর্তি পরিক্ষা",
  "আমাদের সম্পর্কে",
  "যোগাযোগ",
];
function Navbar() {
  const [show, setShow] = React.useState(true);
  const dipatch = useDispatch();
  const userData = useSelector((state) => state);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (userData?.userData?.userInfo?.verify == true) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [userData.userData.userInfo]);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);



  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    dipatch(activeUser(null));
    navigate("/");
  };
  const imgx = userData?.userData?.userInfo?.userImg?.length - 1;
  // console.log(imgx);
  //userData.userData.userInfo.userImg[imgx]

  let [hideen, setHidden] = React.useState(false);

  let handelSow = () => {
    setHidden(!hideen);
     setNotification(false)
  };

  const [noti, setNoti] = useState([]);
  const [notification, setNotification] = useState(false);
  const [prevNotiLength, setPrevNotiLength] = useState(0);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get("/jobExpert/api/v1/notification");
        const newNotifications = response.data;

        if (newNotifications.length > prevNotiLength) {
          setNotification(true);
        } else if (newNotifications.length === prevNotiLength) {
          setNotification(false);
        } else {
          setNotification(false);
        }

        setNoti(newNotifications);
        setPrevNotiLength(newNotifications.length);
      } catch (error) {
        console.log(error.code);
      }
    };

    fetchNotifications();
  }, []);



  return (
    <AppBar position="static" sx={{ backgroundColor: "#EAE9E9" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to={"/"}>
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <img src={logo} alt="" />
            </Typography>
          </Link>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="black"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {show
                ? Loginpages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))
                : pages.map((pagees) => (
                  <MenuItem key={pagees} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{pagees}</Typography>
                  </MenuItem>
                ))}

              {show ? (
                <>
                  <Link to={"/"}>
                    <h1 className="text-black my-2 mx-2">হোম</h1>
                  </Link>
                  <Link to={"#successfullyStory"}>
                    <h1 className="text-black my-2 mx-2">সাকসেস স্টোরি</h1>{" "}
                  </Link>
                  <Link to={"examZone"}>
                    <h1 className="text-black my-2 mx-2">এক্সাম</h1>
                  </Link>
                  <Link to={"premiumZone"}>
                    <h1 className="text-black my-2">আমার কোর্স</h1>
                  </Link>
                </>
              ) : (
                pages.map((pagees) => (
                  <MenuItem key={pagees} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{pagees}</Typography>
                  </MenuItem>
                ))
              )}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <img src={logo} alt="" />
          </Typography>
          <Box
            sx={{
              flexGrow: 2,
              justifyContent: "center",
              display: { xs: "none", md: "flex" },
            }}
          >
            {show ? (
              <>
                <Link to={"/"}>
                  <h1 className="text-black my-2 mx-2">হোম</h1>
                </Link>
                <Link to={"#successfullyStory"}>
                  <h1 className="text-black my-2 mx-2">সাকসেস স্টোরি</h1>{" "}
                </Link>
                <Link to={"examZone"}>
                  <h1 className="text-black my-2 mx-2">এক্সাম</h1>
                </Link>
                <Link to={"premiumZone"}>
                  <h1 className="text-black my-2">আমার কোর্স</h1>
                </Link>
              </>
            ) : (
              <>
                {pages.map((page) => (
                  <Button
                    key={page}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "black", display: "block" }}
                  >
                    {page}
                  </Button>
                ))}
              </>
            )}
          </Box>

          <Box
            sx={{
              flexGrow: 0,
              columnGap: "10px",
              display: "flex",
              alignItems: "center",
            }}
          >
            {show ? (
              <Box sx={{ flexGrow: 2 }}>
                {userData?.userData?.userInfo?.role == "Teacher" ? (
                  <Link to={"/jobexpart/teacherPanel"}>
                    <Button sx={{ marginRight: "20px" }} variant="contained">
                      Teacher Panel
                    </Button>
                  </Link>
                ) : (
                  ""
                )}
                {userData?.userData?.userInfo?.role == "Student" ? (
                  <Link to={"/jobexpart/admin"}>
                    <Button sx={{ marginRight: "20px" }} variant="contained">
                      Admin Panel
                    </Button>
                  </Link>
                ) : (
                  ""
                )}

                <Tooltip title="Notification">
                  <IconButton sx={{ p: 0 }}>
                    <div onClick={handelSow} className="mr-5">
                      <Icon
                        icon="ooui:message"
                        className="relative text-[#26A4DE] text-3xl"
                      />
                      <div className="absolute -top-2 -left-2">
                        <div className="relative flex h-4 w-4">
                          {notification ? (
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#EE8419] opacity-75"></span>
                          ) : (
                            <></>
                          )}
                          <span className="relative inline-flex rounded-full h-4 w-4 bg-[#EE8419]"></span>
                        </div>
                        {hideen && (
                          <div onClick={() => setNotification(false)} className=" absolute rounded-md border  top-[380%] z-50 left-[-158px] w-[200px] text-white bg-slate-400 p-2 ">
                            <div className="flex items-center text-center text-xs justify-center gap-x-4">
                              <ul>
                                {noti.reverse().slice(0, 3).map((item, i) => (
                                  <div key={i} className="p-2 rounded-md border border-[#ee1919] font-semibold text-[#000000] mt-1">
                                    <p className="text-center font-bold text-[14px] text-[#000000]">New Exam </p>
                                    <p className="text-center">
                                      Teacher: {item.teacher}
                                    </p>
                                    <p className="text-center">
                                      category: {item.category}
                                    </p>
                                    <p className="text-center">
                                      Subject: {item.packageName}
                                    </p>
                                    <p className="text-center">
                                      Price: {item.price} Taka
                                    </p>
                                  </div>
                                ))}
                              </ul>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </IconButton>
                </Tooltip>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <img
                      className=" h-[50px] w-[50px] rounded-full border border-primary shadow-2xl"
                      alt="Remy Sharp"
                      src={
                        userData?.userData?.userInfo?.avatar?.length == 0
                          ? ""
                          : `${apy}/uploads/${userData?.userData?.userInfo?.userImg[imgx]} `
                      }
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem>
                    <Link to={"/jobexpart/studentprofile"}>
                      <Typography textAlign="center">Profile</Typography>
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            ) : (
              <>
                <h1 className="text-black hidden md:block">
                  <CallIcon />
                  +880 1700-000000
                </h1>
                <Link to="/login">
                  <Button variant="contained">লগ-ইন করুন</Button>
                </Link>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
