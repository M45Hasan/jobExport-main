const express = require("express");
const app = express();
const Exam = require("../model/examModel");
const ExamPackage = require("../model/examPackage");
const Question = require("../model/questionModel");
const User = require("../model/userModel");
const Answer = require("../model/ansModel");

// const createQuestion = async (req, res) => {
//   const {
//     whatIsTheQuestion,
//     optionA,
//     optionB,
//     optionC,
//     optionD,
//     rightAnsOne,
//     rightAnsTwo,
//     ansDetail,
//     rightMark,
//     wrongMark,
//     examSerial,
//     nid,

//   } = req.body;

//   try {
//     const saerch = await ExamPackage.find({ examSerial, nid });

//     if (saerch.length != 0) {
//       const newQuestion = new Question({
//         examTrack: saerch[0].packageUid,
//         whatIsTheQuestion,
//         optionA,
//         optionB,
//         optionC,
//         optionD,
//         rightAnsOne,
//         rightAnsTwo,
//         ansDetail,
//         rightMark,
//         wrongMark,
//         serial,
//       });
//       newQuestion.save();
//       await ExamPackage.findByIdAndUpdate(
//         { _id: saerch[0]._id },
//         { $push: { qestionList: newQuestion._id } },
//         { new: true }
//       );
//       const crtQ = await Question.findOneAndUpdate(
//         { _id: newQuestion._id },
//         { $push: { examId: saerch[0]._id } }
//       );
//       res.status(201).json(crtQ);
//     } else {
//       res.status(401).json({ error: "Already ExamSerial Name exist" });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "An error occurred" });
//   }
// };

const createQuestion = async (req, res) => {
  const {
    whatIsTheQuestion,
    optionA,
    optionB,
    optionC,
    optionD,
    rightAnsOne,
    rightAnsTwo,
    ansDetail,
    rightMark,
    wrongMark,
    examSerial,
    nid,
    examCategory,
  } = req.body;

  try {
    const search = await ExamPackage.find({ examSerial, nid });

    if (search.length !== 0) {
      let serial = 0;
      if (search[0].qestionList.length > 0) {
        serial = search[0].qestionList.length;
      }

      serial++;

      const newQuestion = new Question({
        examTrack: search[0].packageUid,
        whatIsTheQuestion,
        optionA,
        optionB,
        optionC,
        optionD,
        rightAnsOne,
        rightAnsTwo,
        ansDetail,
        rightMark,
        wrongMark,
        serial,
        examCategory: search[0].examCategory,
      });

      newQuestion.save();

      await ExamPackage.findByIdAndUpdate(
        { _id: search[0]._id },
        { $push: { qestionList: newQuestion._id } },
        { new: true }
      );

      const crtQ = await Question.findOneAndUpdate(
        { _id: newQuestion._id },
        { $push: { examId: search[0]._id } }
      );

      res.status(201).json(crtQ);
    } else {
      res.status(401).json({ error: "ExamSerial Name does not exist" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

const deleteQuestion = async (req, res) => {
  const { id } = req.body;

  console.log(id);
  try {
    const mx = await Question.findOne({ _id: id });
    console.log("mx", mx);
    if (mx) {
      await ExamPackage.updateOne(
        { qestionList: mx._id }, // Search by question reference
        { $pull: { qestionList: mx._id } },
        { new: true }
      );
      await Question.findOneAndDelete({ _id: mx._id });
      res.status(202).json({ message: "Delete Success" });
    } else {
      res.status(400).json({ error: "Invalid Entry" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

const packageQuestionList = async (req, res) => {
  const { packageUid, nid } = req.body;
  console.log(packageUid, nid);

  try {
    const search = await ExamPackage.find({
      packageUid: packageUid,
      nid: nid,
    }).populate("qestionList");
    console.log(search[0].qestionList.length);

    if (search[0].qestionList.length != 0) {
      res.status(200).send(search);
    } else {
      res.status(400).json({ error: "Invalid Entry" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server Error", mm: `${error.code}` });
  }
};

const whoCanExam = async (req, res) => {
  const { id, myId } = req.body;
  try {
    const search = await User.find({
      _id: myId,
      role: "Student",
      myExam: { $in: id },
    });
    if (search) {
      const myExam = await ExamPackage.findById({ _id: id }).populate(
        "qestionList"
      );

      res.send(myExam);
    } else {
      res.status(404).json({ errro: "No User found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error", code: error.code });
  }
};
const checkF = async (req, res) => {
  const { exampaperid, examineeId } = req.body;
  console.log(exampaperid, examineeId);

  try {
    const myQ = await Answer.find({ exampaperid: exampaperid, examineeId });
    const my = await ExamPackage.find({
      packageUid: exampaperid,
      publish: true,
    });
    console.log(myQ);
    if (myQ.length > 0 && my) {
      res.status(200).send(myQ);
    } else {
      res.status(400).json({ error: "User Not found" });
    }
  } catch (er) {
    res.status(500).json({ error: er.message });
  }
};

const banking = async (req, res) => {
  const { inf, id } = req.body;
  console.log(inf, id);
  try {
    const mou = await User.findByIdAndUpdate(
      { _id: id },
      { $push: { bank: inf } },
      { new: true }
    );
    res.status(200).send(mou);
  } catch (er) {
    res.status(500).json({ error: er.message });
  }
};

const getBank = async (req, res) => {
  const { id } = req.body;
  console.log("Received ID:", id);
  try {
    const user = await User.findById(id).populate("bank");

    if (user) {
      console.log("Found User:", user);
      res.status(200).json(user.bank);
    } else {
      console.log("User Not Found");
      res.status(400).json({ error: "User Not Found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

const deltBank = async (req, res) => {
  const { inf, id } = req.body;
  console.log(inf, id);
  try {
    const mu = await User.findByIdAndUpdate(
      id,
      { $pull: { bank: inf } },
      { new: true }
    );

    if (mu) {
      res.status(200).send(mu);
    } else {
      res.status(400).json({ error: "User Not Found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createQuestion,
  deleteQuestion,
  packageQuestionList,
  whoCanExam,
  checkF,
  banking,
  getBank,
  deltBank,
};
