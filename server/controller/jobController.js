const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Job = require("../../server/model/jobModal.js");

const fs = require("fs");




const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });





router.post('/submitJobCircular', upload.fields([{ name: 'pdfFile', maxCount: 1 }, { name: 'imageFile', maxCount: 1 }]), async (req, res) => {
  try {
   
    const job = new Job({
      jobType: req.body.jobType,
      institute: req.body.instituteName,
      title: req.body.jobTitle,
      start: req.body.startDate,
      end: req.body.endDate,
      pdf: req.files.pdfFile[0].filename, 
      img: req.files.imageFile[0].filename,
      fee: req.body.applyFee,
      info: req.body.information,
    });


    await job.save();

    res.status(201).json({ message: 'Job circular submitted successfully' });
  } catch (error) {
    console.error('Error submitting job circular:', error);
    res.status(500).json({ error: 'An error occurred while submitting the job circular' });
  }
});


module.exports = router;