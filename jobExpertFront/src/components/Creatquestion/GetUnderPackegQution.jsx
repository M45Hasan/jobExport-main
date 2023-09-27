import React, { useEffect, useState } from "react";
import axios from "../Axios/axios";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const GetUnderPackegQution = ({ rander }) => {
  const [data, setData] = useState({
    packageUid: "",
    nid: "",
  });

  const ques = useSelector((state) => state);

  useEffect(() => {
    // Set the initial data when the component mounts
    setData({
      packageUid: ques.userData.userInfo.packageUid,
      nid: ques.userData.userInfo.nid,
    });
    getData();
  }, [rander]); // Empty dependency array to run this effect once

  let [questions, setQuestion] = useState([]);
  let [show, setShow] = useState(true);
  const getData = async () => {
    try {
      let res = await axios.post("/jobExpert/api/v1/examquestion", data);
      setQuestion(res.data);
      setShow(true);
    } catch (e) {
      console.log(e);
    }
  };
  console.log(questions);

  const DeletQustion = async (id) => {
    try {
      await axios.post("/jobExpert/api/v1/deletequestion", {
        id: id,
      });
      toast.success("Successfully Delete", {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      getData();
    } catch (e) {
      if (e.code) {
        setShow(false);
      }
      console.log(e);
    }
  };

  // deletequestion
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row"></TableCell>
              <TableCell align="left">Total:Qustion</TableCell>
              <TableCell>
                <h1 className="">Qution Titel</h1>
              </TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
            {show ? (
              <>
                {questions.map((now) =>
                  now.qestionList.map((item, index) => (
                    <TableRow
                      key={item.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row"></TableCell>
                      <TableCell align="left">{index + 1}</TableCell>
                      <TableCell>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: item.whatIsTheQuestion,
                          }}
                        ></div>
                      </TableCell>
                      <TableCell
                        align="right"
                        className="cursor-pointer"
                        onClick={() => DeletQustion(item._id)}
                      >
                        Delete
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </>
            ) : (
              <p className="text-center text-[red] mx-auto">
                Please Add Question
              </p>
            )}

            <TableRow></TableRow>
          </TableHead>
          <TableBody></TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default GetUnderPackegQution;
