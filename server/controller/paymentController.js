const express = require("express");
const { ObjectId } = require("mongodb");
const app = express();
const SSLCommerzPayment = require("sslcommerz-lts");
const ExamPackage = require("../model/examPackage");
const User = require("../model/userModel");
const emailV = require("../utils/emailVerfy");

const responseSSL = async (req, res) => {
  res.status(200).json({
    message: "Welcome to sslcommerz app",
    url: `${process.env.ROOT}/ssl-request`,
  });
};
// root routing

const back_url = process.env.ROOT;
const front_url = process.env.ROOTB;

const tran_id = new ObjectId().toString();
const sslRequest = async (req, res) => {
  const { nid, name, email, packageUid, packageName, examCategory } = req.body;
  console.log(packageUid);
  const pack = await ExamPackage.findOne({ packageUid });

  const dataa = {
    total_amount: parseInt(pack?.packageFee),
    currency: "BDT",
    tran_id: tran_id,
    success_url: `${back_url}/ssl-payment-success/${tran_id}?packageUid=${packageUid}`,
    fail_url: `${back_url}/ssl-payment-fail/${tran_id}`,
    cancel_url: `${back_url}/ssl-payment-cancel/${tran_id}`,
    shipping_method: "No",
    product_name: packageName,
    product_category: examCategory,
    product_profile: "hello",
    cus_name: name,
    cus_email: email,
    cus_add1: nid,
    cus_add2: "Dhaka",
    cus_city: "Dhaka",
    cus_state: "Dhaka",
    cus_postcode: "1000",
    cus_country: "Bangladesh",
    cus_phone: "01711111111",
    cus_fax: "01711111111",
    multi_card_name: "mastercard",
    value_a: "ref001_A",
    value_b: "ref002_B",
    value_c: "ref003_C",
    value_d: "ref004_D",
    ipn_url: `${back_url}/ssl-payment-notification/${tran_id}`,
  };

  const sslcommerz = new SSLCommerzPayment(
    process.env.STORE_ID,
    process.env.STORE_PASSWORD,
    false
  );
  console.log("ami:", tran_id);
  await sslcommerz.init(dataa).then(async (data) => {
    console.log(data);

    if (data?.GatewayPageURL) {
      const mx = await User.findOneAndUpdate(
        { email },
        { $set: { orderId: tran_id, orderPk: pack._id } },
        { new: true }
      );
      console.log(mx);
      res.status(200).json({ url: data?.GatewayPageURL });
    } else {
      res.status(400).json({
        message: "Session was not successful",
      });
    }
  });
};
const sslSuccess = async (req, res) => {
  const { tran_id } = req.params;
  const { packageUid } = req.query;
  console.log("ami uid", packageUid);
  try {
    const mx = await User.findOne({ orderId: tran_id });
    console.log("hellooooooo");
    if (!mx) {
      return res.redirect(`${front_url}/fail/${tran_id}`);
    }

    const lo = mx.myExam.includes(mx.orderPk);

    if (lo) {
      await User.findByIdAndUpdate(
        { _id: mx._id },
        { $set: { orderId: "", orderPk: "" } },
        { new: true }
      );
      return res.redirect(`${front_url}/fail/${tran_id}`);
    }

    const mu = await User.findByIdAndUpdate(
      { _id: mx._id },
      { $set: { orderId: "", orderPk: "" }, $push: { myExam: mx.orderPk } },
      { new: true }
    );
    const ml = await ExamPackage.findOneAndUpdate(
      { packageUid },
      { $push: { packageBuyer: mx._id } },
      { new: true }
    );
    console.log("meeeoeo", ml);
    const sub = "purchase success";
    const code = mx.orderPk;
    const email = mx.email;
    emailV(email, code, sub);

    res.redirect(
      `${front_url}/payment/${tran_id}?myExam=${mx.orderPk}&packageUid=${packageUid}`
    );
  } catch (error) {
    console.error(error);
    return res.redirect(`${front_url}/fail/${tran_id}`);
  }
};

const sslNotifiaction = async (req, res) => {
  return res.status(200).json({
    data: req.body,
    message: "Payment notification",
  });
};

const sslfail = async (req, res) => {
  const tran_id = req.params.tran_id;
  const mx = await User.findOne({ orderId: tran_id });
  await User.findByIdAndUpdate(
    { _id: mx._id },
    { $set: { orderId: "", orderPk: "" } },
    { new: true }
  );

  return res.redirect(`${front_url}/fail/${tran_id}`);
};

const sslCancel = async (req, res) => {
  const mx = await User.findOne({ orderId: req.params.id });
  await User.findByIdAndUpdate(
    { _id: mx._id },
    { $set: { orderId: "", orderPk: "" } },
    { new: true }
  );

  return res.status(200).json({
    data: req.body,
    message: "Payment cancelled",
  });
};
module.exports = {
  responseSSL,
  sslRequest,
  sslSuccess,
  sslNotifiaction,
  sslfail,
  sslCancel,
};
