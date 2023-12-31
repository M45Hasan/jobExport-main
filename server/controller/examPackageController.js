const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const User = require("../model/userModel");
const ExamPackage = require("../model/examPackage");
const Exam = require("../model/examModel");
const Question = require("../model/questionModel");
const { calculateTimeDifference } = require("../utils/timer");
const Notification = require("../model/notiModel");
const { ObjectId } = require("mongodb");

const packageCreateController = async (req, res) => {
  const {
    packageName,
    packageDetail,
    packageCreaterEmail,
    packageFee,
    premium,
    examCategory,
    examSubCategory,
    examDate,
    examTime,
    nid,
    examSerial,
    examTitle,
    examDuration,
    examInfo,
    examMark,
  } = req.body;
  try {
    let search = await User.find({
      email: packageCreaterEmail,
      role: "Teacher",
      nid: nid,
    });
    console.log(search);
    if (search.length != 0) {
      const uid = Math.floor(100000 + Math.random() * 90000).toString();
      const createPackage = new ExamPackage({
        packageName,
        packageDetail,
        packageUid: uid,
        packageCreaterEmail,
        packageFee,
        premium,
        examCategory,
        examSubCategory,
        examDate,
        examTime,
        nid: search[0].nid,
        examSerial,
        examTitle,
        examDuration,
        examInfo,
        examMark,
      });
      createPackage.save();
      const noti = new Notification({
        packageName: createPackage.packageName,
        category: createPackage.examCategory,
        time: createPackage.examTime,
        teacher: search[0].name,
        price:
          createPackage.packageFee !== "" ? createPackage.packageFee : "Free",
      });

      await noti.save();
      console.log(noti);
      await User.findOneAndUpdate(
        { email: packageCreaterEmail },
        { $push: { examPackageId: createPackage._id } },
        { new: true }
      );
      await ExamPackage.findOneAndUpdate(
        { packageCreaterEmail },
        { $push: { packageCreater: search._id } },
        { new: true }
      );

      res.status(200).send(createPackage);
    } else {
      res.status(400).json({ error: "Invalid Entry" });
    }
  } catch (error) {
    console.log(error.code);
    res.status(500).json({ error: "An error occurred" });
  }
};

const myPackage = async (req, res) => {
  const { email } = req.body;
  try {
    const search = await User.find({ email, role: "Teacher" }).populate(
      "examPackageId"
    );
    if (search.length != 0) {
      res.status(200).json(search);
    } else {
      res.status(400).json({ error: "NO Exam Package " });
    }
  } catch (error) {
    console.log(error.code);
    res.status(500).json({ error: "An error occurred" });
  }
};

const allPackage = async (req, res) => {
  try {
    const search = await ExamPackage.find();
    res.status(200).json(search);
  } catch (error) {
    console.log(error.code);
    res.status(500).json({ error: "An error occurred" });
  }
};
const myExamList = async (req, res) => {
  const { email, cat } = req.body;
  console.log(email);
  try {
    const search = await User.find({ email, role: "Student" }).populate({
      path: "myExam",
      match: { examCategory: cat },
    });
    if (search.length != 0) {
      res.status(200).json(search);
    } else {
      res.status(400).json({
        error: "NO Exam Collection",
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Error Occurs" });
  }
};

const packageBuyer = async (req, res) => {
  const { packageUid, email } = req.body;

  try {
    const free = await ExamPackage.findOne({ packageUid, premium: false });

    if (!free) {
      return res.status(400).json({ error: "Not free" });
    }
    const searchUse = await User.findOne({
      email,
      role: "Student",
      myExam: { $nin: [free?._id] },
    });

    if (!searchUse) {
      return res.status(400).json({ error: "You have already or Teacher" });
    }
    if (free && searchUse) {
      await ExamPackage.findOneAndUpdate(
        { packageUid },

        { $push: { packageBuyer: searchUse?._id } },
        { new: true }
      );
      await User.findOneAndUpdate(
        { email: searchUse?.email },
        { $push: { myExam: free._id } },
        { new: true }
      );

      res.status(200).json({ message: "Free Exam Added" });
    } else {
      res.status(400).json({ error: "You have already" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error Occurs", code: error.code });
  }
};

const totalExaminee = async (req, res) => {
  const { packageUid } = req.body;
  console.log(packageUid);
  try {
    const search = await ExamPackage.find({ packageUid });
    if (search.length != 0) {
      res.status(200).json({ total: `${search[0].packageBuyer.length}` });
    } else {
      res.status(200).json({ total: "0" });
    }
  } catch (error) {
    console.log(error.code);
    res.status(500).json({ error: "An error occurred" });
  }
};
const packageTimer = async (req, res) => {
  const { packageUid } = req.body;

  try {
    const search = await ExamPackage.find({ packageUid });

    if (search.length !== 0) {
      const timer = calculateTimeDifference(search[0].examDate, Date.now());
      console.log(timer);
      res.status(undefined || 200).json(timer);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

const packageStatus = async (req, res) => {
  const { packageUid } = req.body;
  try {
    const search = await ExamPackage.find({ packageUid });
    const timer = calculateTimeDifference(search[0].examDate, Date.now());
    if (timer.days <= 0) {
      const search = await ExamPackage.findOneAndUpdate(
        { packageUid },
        { $set: { packageActive: false } },
        { new: true }
      );
      res.status(undefined || 200).json(search);
    } else {
      res.status(undefined || 200).json(timer);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

const packageRepost = async (req, res) => {
  const { id } = req.body;
  console.log(req.body);
  try {
    const search = await ExamPackage.findById({
      _id: id,
    });

    const currentDate = new Date();
    const sevenDaysLater = new Date(currentDate);

    // Add 7 days to the current date
    sevenDaysLater.setDate(currentDate.getDate() + 7);

    // Extract year, month, and day
    const year = sevenDaysLater.getFullYear();
    const month = String(sevenDaysLater.getMonth() + 1).padStart(2, "0");
    const day = String(sevenDaysLater.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;

    console.log(formattedDate);
    const uid = Math.floor(100000 + Math.random() * 90000).toString();

    const newPackge = new ExamPackage({
      packageUid: uid,
      nid: search.nid,
      packageName: search.packageName,
      packageDetail: search.packageDetail,
      packageCreater: search.packageCreater,
      packageCreaterEmail: search.packageCreaterEmail,
      packageFee: search.packageFee,
      premium: search.premium,
      publish: false,
      packageActive: true,
      examCategory: search.examCategory,
      examSubCategory: search.examSubCategory,
      qestionList: search.qestionList,
      examMark: search.examMark,
      examInfo: search.examInfo,
      examDuration: search.examDuration,
      examTitle: search.examTitle,
      examSerial: search.examSerial,
      examDate: formattedDate,
      examTime: search.examTime,
    });

    newPackge.save();
    res.status(200).send(newPackge);
  } catch (error) {
    console.log(error.code);
    res.status(500).json({ error: "Error Occurs" });
  }
};

const packageDelete = async (req, res) => {
  const { packageUid, nid } = req.body;
  try {
    const packSearch = await ExamPackage.findOne({ packageUid, nid });
    if (packSearch) {
      try {
        const deleteResult = await Question.deleteMany({
          examId: { $in: packSearch.examId },
        });
        console.log(`Deleted questions for exam ${packSearch.examId}`);

        await ExamPackage.deleteOne({ _id: packSearch._id });
        await User.findOneAndUpdate(
          { email: packSearch.packageCreaterEmail },
          { $pull: { examPackageId: packSearch._id } },
          { new: true }
        );
        res.status(200).send(deleteResult);
      } catch (error) {
        console.error(
          `Error deleting questions for exam ${packSearch.examId}: ${error}`
        );
      }
    } else {
      res.status(404).json({ error: "Invalid Entry" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error Occurs" });
  }
};
const categoryWiseTodayExam = async (req, res) => {
  const { examCategory } = req.body;
  const today = new Date();
  const formattedToday = today.toISOString().split("T")[0];
  console.log(formattedToday);

  try {
    const matchingExams = await ExamPackage.find({
      examDate: formattedToday,
      examCategory: examCategory,
    });

    if (matchingExams.length > 0) {
      res.status(200).send(matchingExams);
    } else {
      res.status(400).json({ message: "No matching exams found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};
const selectExamByUser = async (req, res) => {
  const idx = req.params.id;
  console.log(idx);
  try {
    const search = await ExamPackage.findById({ _id: idx }).populate({
      path: "examList",
      populate: {
        path: "qestionList",
        model: "Question",
      },
    });

    if (search) {
      res.status(200).send(search);
    } else {
      res.status(400).json({ error: "Ivalid Input" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

const waitingResult = async (req, res) => {
  const today = new Date();
  const formattedToday = today.toISOString().split("T")[0];
  console.log("todayDate", formattedToday);

  try {
    const matchingExams = await ExamPackage.find({
      examDate: { $lt: formattedToday },
    });

    if (matchingExams.length > 0) {
      const result = matchingExams.map((exam) => ({
        packageBuyer: exam.packageBuyer,
        packageUid: exam.packageUid,
      }));
      res.status(200).send(result);
    } else {
      res.status(400).json({ message: "No matching exams found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};
const publishBoolean = async (req, res) => {
  const { id } = req.body;
  console.log(id);
  try {
    const how = await ExamPackage.findByIdAndUpdate(
      { _id: id },
      { $set: { publish: true } },
      { new: true }
    );

    res.status(202).send(how);
  } catch (error) {
    res.status(500).json({ error: "Error Occurs" });
  }
};

module.exports = {
  packageCreateController,
  myPackage,
  allPackage,
  myExamList,
  packageBuyer,
  totalExaminee,
  packageTimer,
  packageStatus,
  packageRepost,
  packageDelete,
  categoryWiseTodayExam,
  selectExamByUser,
  waitingResult,
  publishBoolean,
};
