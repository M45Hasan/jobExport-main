import axios from "../Axios/axios";
import React, { useEffect, useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";

import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import GetUnderPackegQution from "./GetUnderPackegQution";

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

const Question = ({ examSerials, NID }) => {
  let [info, setInfo] = useState({
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    rightAnsOne: "",
    rightAnsTwo: "",
    ansDetail: "",
    infosources: "",
    rightMark: "",
    wrongMark: "",
  });

  let [error, setError] = useState({
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    ansDetail: "",
    rightMark: "",
    wrongMark: "",
  });

  const handetype = (e) => {
    let { name, value } = e.target;
    setInfo({
      ...info,
      [name]: value,
    });
    setError({ ...error, [name]: value ? "" : `${name} is required` });
  };

  let [post, setPost] = useState("");
  let [rander, setRander] = useState(true);
  const handelSubmit = async (event) => {
    event.preventDefault();
    event.persist();

    setError({
      optionA: !info.optionA ? "Please Input optionA" : "",
      optionB: !info.optionB ? "Please Input optionB" : "",
      optionC: !info.optionC ? "Please Input optionC" : "",
      optionD: !info.optionD ? "Please Input optionD" : "",
      rightAnsOne: !info.rightAnsOne ? "Please Input rightAnsOne" : "",
      ansDetail: !info.ansDetail ? "Please Input ansDetail" : "",
      rightMark: !info.rightMark ? "Please Input rightMark" : "",
      wrongMark: !info.wrongMark ? "Please Input wrongMark" : "",
    });

    if (
      !info.optionA ||
      !info.optionB ||
      !info.optionC ||
      !info.optionD ||
      !info.rightAnsOne ||
      !info.ansDetail ||
      !info.rightMark ||
      !info.wrongMark
    ) {
      return;
    }

    try {
      const descriptionHtml = draftToHtml(
        convertToRaw(description.getCurrentContent())
      );

      const requestData = {
        optionA: info.optionA,
        optionB: info.optionB,
        optionC: info.optionC,
        optionD: info.optionD,
        rightAnsOne: info.rightAnsOne,
        rightAnsTwo: info.infosources,
        ansDetail: info.ansDetail,
        rightMark: info.rightMark,
        wrongMark: info.wrongMark,
        examSerial: examSerials,
        nid: NID,
        whatIsTheQuestion: descriptionHtml,
      };
      const res = await axios.post(
        "/jobExpert/api/v1/questioncreate",
        requestData
      );
      setPost(res.data.whatIsTheQuestion);

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
      setRander(!rander);
    } catch (error) {
      console.log(error);
    }
  };

  let editorState = EditorState.createEmpty();
  const [description, setDescription] = useState(editorState);
  const onEditorStateChange = (editorState) => {
    setDescription(editorState);
  };
  console.log(info);
  return (
    <>
      <div className="flex">
        <div className="w-[60%]">
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <div className="max-w-4xl flex flex-col w-full gap-y-4 mt-10">
              {error.whatIsTheQuestion && (
                <p className="text-[red] text-lg">{error.whatIsTheQuestion}</p>
              )}

              <div className="form-group col-md-12 editor">
                <label className="font-weight-bold">
                  {" "}
                  Heading <span className="required"> * </span>{" "}
                </label>
                <Editor
                  editorState={description}
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  onEditorStateChange={onEditorStateChange}
                />
                <textarea
                  style={{ display: "none" }}
                  disabled
                  ref={(val) => (info.description = val)}
                  value={draftToHtml(
                    convertToRaw(description.getCurrentContent())
                  )}
                />
              </div>

              {error.optionA && (
                <p className="text-[red] text-lg">{error.optionA}</p>
              )}
              <TextField
                label="optionA "
                name="optionA"
                fullWidth
                onChange={handetype}
              />

              {error.optionB && (
                <p className="text-[red] text-lg">{error.optionB}</p>
              )}

              <TextField
                onChange={handetype}
                name="optionB"
                label="option B"
                fullWidth
              />
              {error.optionC && (
                <p className="text-[red] text-lg">{error.optionC}</p>
              )}
              <TextField
                onChange={handetype}
                name="optionC"
                label="option C"
                fullWidth
              />
              {error.optionD && (
                <p className="text-[red] text-lg">{error.optionD}</p>
              )}
              <TextField
                onChange={handetype}
                name="optionD"
                label="option D"
                fullWidth
              />
              {error.rightAnsOne && (
                <p className="text-[red] text-lg">{error.rightAnsOne}</p>
              )}
              <div>
                <p>Select Correct ANS</p>
                <input
                  type="radio"
                  id="optionA"
                  name="rightAnsOne"
                  value="optionA"
                  onChange={handetype}
                />
                <label for="optionA">option A</label>{" "}
                <input
                  type="radio"
                  id="optionB"
                  name="rightAnsOne"
                  value="optionB"
                  onChange={handetype}
                />
                <label for="optionB">option B</label>{" "}
                <input
                  type="radio"
                  id="optionC"
                  name="rightAnsOne"
                  value="optionC"
                  onChange={handetype}
                />
                <label for="optionC">option C</label>{" "}
                <input
                  type="radio"
                  id="optionD"
                  name="rightAnsOne"
                  value="optionD"
                  onChange={handetype}
                />
                <label for="optionD">Option D</label>{" "}
              </div>

              {error.ansDetail && (
                <p className="text-[red] text-lg">{error.ansDetail}</p>
              )}
              <TextField
                onChange={handetype}
                name="ansDetail"
                label="Ans Details"
                placeholder="Ans Details"
                fullWidth
              />
              <TextField
                onChange={handetype}
                name="infosources"
                label="Info sources"
                placeholder="Info sources"
                fullWidth
              />
              {error.rightMark && (
                <p className="text-[red] text-lg">{error.rightMark}</p>
              )}
              <TextField
                onChange={handetype}
                name="rightMark"
                label="right Mark"
                type="number"
                fullWidth
              />
              {error.wrongMark && (
                <p className="text-[red] text-lg">{error.wrongMark}</p>
              )}
              <TextField
                onChange={handetype}
                name="wrongMark"
                label="wrong Mark"
                type="number"
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
        <div>
          <GetUnderPackegQution rander={rander} />
        </div>
      </div>
    </>
  );
};

export default Question;
