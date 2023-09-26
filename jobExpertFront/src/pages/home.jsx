import logo from "../assets/brandLogo/logos.png";

import appstore from "../assets/brandLogo/appstore (1).png";
import googlestore from "../assets/brandLogo/appstore (2).png";
import { Link, useNavigate } from "react-router-dom";
import Slider from "../components/Slider/Slider";
import Banner from "../components/Banner/Banner";
import Button from "@mui/material/Button";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";
import singup from "./singup";
import { useEffect } from "react";

import { useSelector } from "react-redux";
const home = () => {
  let navigate = useNavigate();
  const userData = useSelector((state) => state);
  useEffect(() => {
    if (userData?.userData?.userInfo?.verify == true) {
      navigate("jobexpart");
    }
  }, []);
  return (
    <div className="">
      <Navbar />
      {/* banner section  */}
      <Banner />

      {/* section one  */}
      <section className="w-11/12 md:w-2/3  mx-auto mt-16">
        <p className="text-xl text-center">
          বাংলাদেশের ব্যতিক্রমী এবং বৃহৎ Virtual Exam Center (VEC) । বিসিএস ,
          প্রাইমারি, শিক্ষক নিবন্ধনসহ অন্যান্য যে কোন সরকারি চাকরির প্রস্তুতির
          জন্য হাজারো পরীক্ষার্থীর সাথে চূড়ান্ত পরীক্ষার আগেই LIVE মডেল টেস্ট
          দিয়ে নিজের অবস্থান যাচাই করার এক ভিন্নধর্মী অনলাইন প্ল্যাটফর্ম 
        </p>

        {/* logo image */}
        <img src={logo} alt="" className="mx-auto w-[50%] md:w-[40%] mt-12" />
        <div className="flex flex-col md:flex-row justify-center items-center gap-5 mt-5">
          <img src={appstore} alt="" className="w-40" />
          <img src={googlestore} alt="" className="w-40" />
        </div>
        <p className="text-2xl mt-5 text-center">অথবা </p>
        <div className="text-center">
          <div className="transition duration-500 ease-in-out hover:scale-105 my-10">
            <Link to={"/login"}>
              <Button variant="contained">লগ-ইন করুন</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* section two  */}
      <section className="w-11/12 md:w-4/5 mx-auto">
        <h1 className="text-xl md:text-3xl text-center mt-10 mb-5 font-semibold">
          কেন ব্যবহার করবেন Job Expert
        </h1>
        <p className="mb-10 text-base">
          বাংলাদেশের অধিকাংশ সরকারি চাকরি প্রিলিমিনারি পরীক্ষাই বেশ
          প্রতিযোগিতামূলক। আপনি হয়তো গতানুগতিক ধারায় পড়াশোনা করলেন, মডেল
          টেস্টের বইতে নিজের মতো করে পরীক্ষা দিয়ে ভালো নম্বর পেলেন এবং ভাবলেন
          যে, কাট মার্ক তো এই রকমই থাকে, তাই আমার প্রস্তুতি যথেষ্ট ভালো আছে।
          কিন্তু ব্যাপারটি আসলেই কি এমন? আমাদের এক্সপার্ট টিমের দীর্ঘদিনের
          গবেষণায় দেখেছি, চাকরির প্রিলিমিনারি পরীক্ষায় পাস করতে হলে আপনাকে
          অবশ্যই প্রথম 5 থেকে 10% পরীক্ষার্থীদের মধ্যে থাকতে হবে।
        </p>
        <p>
          অর্থাৎ আপনার প্রস্তুতির প্রকৃত অবস্থা জানতে আপনাকে আপনার প্রতিযোগীদের
          সাথে চূড়ান্ত পরীক্ষার আগে পরীক্ষা দিয়ে যাচাই করতে হবে।
        </p>

        <h1 className="text-xl md:text-3xl text-center mt-16 mb-5 font-semibold">
          Job Expert-এ আপনি পাচ্ছেন-
        </h1>
        <ul className="space-y-5 mt-10">
          <li className="!text-base md:text-xl">
            ১)নির্দিষ্ট সময় অসংখ্য পরীক্ষার্থীদের সাথে নিজেকে যাচাই করার সুবর্ণ
            সুযোগ।
          </li>
          <li className="!text-base md:text-xl">
            ২) আমাদের ওয়েবসাইটে/এপসে পরীক্ষা দিলে পরীক্ষার হলে টাইম ম্যানেজমেন্ট
            সম্পর্কে স্পষ্ট ধারণা পাবেন। মনে রাখবেন সঠিকভাবে টাইম ম্যানেজমেন্ট
            না করতে পারলে যতই ভালো পরীক্ষায় অংশ নেন না কেন চূড়ান্ত ফলাফল আসার
            সম্ভাবনা ক্ষীণ ।
          </li>
          <li className="!text-base md:text-xl">
            ৩) আপনি চাইলে যে কোন সময় আপনার মিস হওয়া পরীক্ষাগুলো দিতে পারবেন ও
            উত্তরপত্র দেখতে পারবেন।
          </li>
          <li className="!text-base md:text-xl">
            ৪) মূল পরীক্ষার জন্য ধাপে ধাপে নিজেকে যোগ্য করে গড়ে তোলার সুযোগ তো
            থাকছেই।
          </li>
        </ul>
        <h1 className="text-xl md:text-3xl text-center mt-16 mb-5 font-semibold">
          Job Expert কেন আলাদা হবে-
        </h1>
        <ul className="space-y-5 mt-10">
          <li className="!text-base md:text-xl">
            ১) টাইম ম্যানেজমেন্ট সম্পর্কে পর্যাপ্ত ধারণা।
          </li>
          <li className="!text-base md:text-xl">
            ৩) সম্পূর্ণ বিজ্ঞাপন মুক্ত (Add free).
          </li>
          <li className="!text-base md:text-xl">
            ৪) চূড়ান্ত পরীক্ষায় কমন উপযোগী সাজেশন, লেকচার শীট ও লাইভ ক্লাস।
          </li>
          <li className="!text-base md:text-xl">
            ৫) সহজে ব্যবহার উপযোগী ওয়েবসাইট ও অ্যাপ।
          </li>
        </ul>

        <h1 className="text-xl md:text-3xl text-center mt-16 mb-5 font-semibold">
          আপনার চাকরি প্রস্তুতি নিশ্চিত করতে{" "}
        </h1>
        <div className="text-center">
          <div className="transition duration-500 ease-in-out hover:scale-105 my-10">
            <Link to="/singup">
              <Button variant="contained">রেজিস্ট্রেশন করুন</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* section three  */}
      <section className="w-full mx-auto">
        <Slider />
      </section>

      {/* section four  */}
      <section>
        <img src={logo} alt="" className="mx-auto w-[50%] md:w-[25%] mt-16" />
        <h1 className="text-xl md:text-2xl text-center mt-10 mb-10 font-semibold">
          ডাউনলোড করুন আমাদের মোবাইল অ্যাপ
        </h1>
        <div className="flex flex-col md:flex-row justify-center items-center gap-5 mt-5 mb-16">
          <img src={appstore} alt="" className="w-40" />
          <img src={googlestore} alt="" className="w-40" />
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default home;
