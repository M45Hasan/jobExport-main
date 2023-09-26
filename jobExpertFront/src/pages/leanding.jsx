import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Home_section_two from "../components/jobexpartHome/homeSectionTwo";
import Home_section_three from "../components/jobexpartHome/homeSectionThree";
import Home_section_four from "../components/jobexpartHome/homeSectionFour";
import Home_section_five from "../components/jobexpartHome/homeSectionFive";
import Slider from "../components/Slider/Slider";
import JobExpart from "../components/JobExpart/JobExpart";
import Banner from "../components/Banner/Banner";
import { useSelector } from "react-redux";
import axios from "axios";
import Api from "../components/Axios/axios";
import { styled } from "@mui/material/styles";
import { Grid } from "@mui/material";
import Paper from "@mui/material/Paper";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#EAE9E9",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const leading = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const userData = useSelector((state) => state);

  useEffect(() => {
    if (!userData.userData.userInfo) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    axios
      .get(`${Api.defaults.baseURL}/jobExpert/api/v1/story-all`)
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="mt">
      {/* banner section  */}
      <Banner />

      {/* section one */}
      <section className=" container px-4  mx-auto gap-x-4 mt-8">
        <Grid container spacing={2}>
          <Grid item xs={6} md={2}>
            <Item>
              <Link
                to="live-expert"
                className="bg-[#EAE9E9] w-11/12 py-10 rounded-lg hover:bg-[#26A4DE] duration-500 hover:text-[#FFFFFF]"
              >
                <img
                  src="https://i.ibb.co/V3FgnT7/icon-4.png"
                  alt=""
                  className="w-20 mx-auto"
                />

                <h3 className="text-center text-lg font-bold py-2">
                  "Live Expert"
                </h3>
                <p className="text-center px-2"></p>
              </Link>
            </Item>
          </Grid>
          <Grid item xs={6} md={2}>
            <Item>
              <Link
                to="examZone"
                className="bg-[#EAE9E9] w-11/12 py-10 rounded-lg hover:bg-[#26A4DE] duration-500 hover:text-[#FFFFFF]"
              >
                <img
                  src="https://i.ibb.co/fq6TbNN/icon-1.png"
                  alt=""
                  className="w-20 mx-auto"
                />

                <h3 className="text-center text-lg font-bold py-2">
                  "Exam Zone"
                </h3>
                <p className="text-center px-2"></p>
              </Link>
            </Item>
          </Grid>
          <Grid item xs={6} md={2}>
            <Item>
              <Link
                to="video"
                className="bg-[#EAE9E9] w-11/12 py-10 rounded-lg hover:bg-[#26A4DE] duration-500 hover:text-[#FFFFFF]"
              >
                <img
                  src="https://i.ibb.co/cx7b5yH/icon-3.png"
                  alt=""
                  className="w-20 mx-auto"
                />

                <h3 className="text-center text-lg font-bold py-2">
                  "Video Support"
                </h3>
                <p className="text-center px-2"></p>
              </Link>
            </Item>
          </Grid>

          <Grid item xs={6} md={2}>
            <Item>
              <Link
                to="premiumZone"
                className="bg-[#EAE9E9] w-11/12 py-10 rounded-lg hover:bg-[#26A4DE] duration-500 hover:text-[#FFFFFF]"
              >
                <img
                  src="https://i.ibb.co/VNSSTr1/icon-2.png"
                  alt=""
                  className="w-20 mx-auto"
                />

                <h3 className="text-center text-lg font-bold py-2">
                  "Premium Member"
                </h3>
                <p className="text-center px-2"></p>
              </Link>
            </Item>
          </Grid>
          <Grid item xs={6} md={2}>
            <Item>
              <Link
                to="pdfSupport"
                className="bg-[#EAE9E9] w-11/12 py-10 rounded-lg hover:bg-[#26A4DE] duration-500 hover:text-[#FFFFFF]"
              >
                <img
                  src="https://i.ibb.co/h2LmgGk/icon-5.png"
                  alt=""
                  className="w-20 mx-auto"
                />

                <h3 className="text-center text-lg font-bold py-2">
                  "Pdf Support"
                </h3>
                <p className="text-center px-2"></p>
              </Link>
            </Item>
          </Grid>
          <Grid item xs={6} md={2}>
            <Item>
              <Link
                to="socialMediya"
                className="bg-[#EAE9E9] w-11/12 py-10 rounded-lg hover:bg-[#26A4DE] duration-500 hover:text-[#FFFFFF]"
              >
                <img
                  src="https://i.ibb.co/0JyPKLf/icon-6.png"
                  alt=""
                  className="w-20 mx-auto"
                />

                <h3 className="text-center text-lg font-bold py-2">
                  Communities
                </h3>
                <p className="text-center px-2"></p>
              </Link>
            </Item>
          </Grid>
        </Grid>
      </section>

      {/* section two  */}
      <Home_section_two />

      {/* section three  */}
      <Home_section_three />

      {/* section four */}
      <Home_section_four />

      {/* section five  */}
      <Home_section_five />

      {/* section six */}
      <div className="mt-20">
        <Slider />
      </div>

      {/* section seven  */}
      <JobExpart />
    </div>
  );
};

export default leading;
