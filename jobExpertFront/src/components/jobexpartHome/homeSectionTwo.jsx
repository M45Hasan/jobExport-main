import { Link } from "react-router-dom";
import job from "../../assets/brandLogo/job.png";
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
const homeSectionTwo = () => {
  return (
    <>
      <h3 className="text-2xl text-center font-bold mb-10 mt-7">
        Job Expert -এ পাচ্ছেন !
      </h3>

      <section className=" container px-4  mx-auto gap-x-4 mt-8">
        <Grid container spacing={2}>
          <Grid item xs={6} md={2}>
            <Item>
              <Link
                to="dailyquiz"
                className="bg-[#EAE9E9] w-11/12 py-10 rounded-lg hover:bg-[#26A4DE] duration-500 hover:text-[#FFFFFF]"
              >
                <img
                  src="https://i.ibb.co/b3ZVKsB/image-61.png"
                  alt=""
                  className="w-20 mx-auto"
                />
                <h3 className="text-center md:text-lg text-sm font-bold py-2">
                  Daily Quiz
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
                  src="https://i.ibb.co/d7jN865/image-62.png"
                  alt=""
                  className="w-20 mx-auto"
                />
                <h3 className="text-center md:text-lg text-sm font-bold py-2">
                  ICT Expert
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
                  src="https://i.ibb.co/qmD0fxB/image-63.png"
                  alt=""
                  className="w-20 mx-auto"
                />
                <h3 className="text-center md:text-lg text-sm font-bold py-2">
                  job Preparation
                </h3>
                <p className="text-center px-2"></p>
              </Link>
            </Item>
          </Grid>
          <Grid item xs={6} md={2}>
            <Item>
              {" "}
              <Link
                to="dictionary"
                className="bg-[#EAE9E9] w-11/12 py-10 rounded-lg hover:bg-[#26A4DE] duration-500 hover:text-[#FFFFFF]"
              >
                <img
                  src="https://i.ibb.co/jfrpMXH/image-64.png"
                  alt=""
                  className="w-20 mx-auto"
                />
                <h3 className="text-center md:text-lg text-sm font-bold py-2">
                  Vocabulary
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
                  src="https://i.ibb.co/xgs4M6Q/image-65.png"
                  alt=""
                  className="w-20 mx-auto"
                />
                <h3 className="text-center md:text-lg text-sm font-bold py-2">
                  English Lecture
                </h3>
                <p className="text-center px-2"></p>
              </Link>
            </Item>
          </Grid>
          <Grid item xs={6} md={2}>
            <Item>
              <Link
                to="circular"
                className="bg-[#EAE9E9] w-11/12 py-10 rounded-lg hover:bg-[#26A4DE] duration-500 hover:text-[#FFFFFF]"
              >
                <img src={job} alt="" className="w-20 mx-auto" />
                <h3 className="text-center md:text-lg text-sm font-bold py-2">
                  Circular Zone
                </h3>
                <p className="text-center px-2"></p>
              </Link>
            </Item>
          </Grid>
        </Grid>

      </section>
    </>
  );
};

export default homeSectionTwo;
