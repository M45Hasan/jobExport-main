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
          Job Expert বাংলাদেশের প্রথম এবং সর্ববৃহৎ Virtual Exam Center (VEC)
          বিসিএস প্রিলিমিনারি এবং অন্যান্য MCQ পরীক্ষার প্রস্তুতির জন্য হাজারো
          পরীক্ষার্থীর সাথে চূড়ান্ত পরীক্ষার আগেই LIVE মডেল টেস্ট দিয়ে নিজের
          অবস্থান যাচাই করে নিন।
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
        <p className="mb-10">
          বাংলাদেশের অধিকাংশ সরকারি চাকরি প্রিলিমিনারি পরীক্ষার বেশ
          প্রতিযোগিতামূলক। আপনি হয়তো গতানুগতিক ধারায় পড়াশোনা করলেন মডেল
          টেস্টের বইতে নিজের মতো করে পরীক্ষা দিয়ে ভালো নম্বর পেলেন এবং ভাবলেন
          যে কাট মারতো এই রেজাল্ট এই থাকে তাই আমার প্রস্তুতি ঠিক আছে। কিন্তু
          ব্যাপারটি আসলে কি এমন? আমাদের এক্সপার্ট টিমের গবেষণায় দেখেছি চাকরি
          প্রিলিমিনারি পরীক্ষায় পাস করতে হলে আপনাকে অবশ্যই প্রথম 5 থেকে 10%
          পরীক্ষার্থীদের মধ্যে থাকতে হবে।
        </p>
        <p>
          অর্থাৎ আপনার প্রস্তুতির প্রকৃত অবস্থা জানতে আপনাকে আপনার প্রতিযোগীদের
          সাথে চূড়ান্ত পরীক্ষার আগে পরীক্ষা দিয়ে যাচাই করতে হবে।
        </p>

        <h1 className="text-xl md:text-3xl text-center mt-16 mb-5 font-semibold">
          Job Expert-এ আপনি পাচ্ছেন-
        </h1>
        <ul className="space-y-5 mt-10">
          <li>
            ১) চূড়ান্ত পরীক্ষার মতো নির্দিষ্ট সময় অসংখ্য পরীক্ষার্থীদের সাথে
            নিজেকে যাচাই করার সুবর্ণ সুযোগ।
          </li>
          <li>
            ২) পরীক্ষার হলে টাইম ম্যানেজমেন্ট সম্পর্কে স্পষ্ট ধারণা পাবেন মনে
            রাখবেন সঠিকভাবে টাইম ম্যানেজমেন্ট না করতে পারলে যতই ভালো পরীক্ষা
            করেননা কেন ফলাফল আসবেনা।
          </li>
          <li>
            ৩) আপনি সারাদিন যে কোন সময় আপনার মিস হওয়া পরীক্ষাগুলো দিতে পারবেন
            ও উত্তরপত্র দেখতে পারবেন।
          </li>
          <li>
            ৪) মূল পরীক্ষার জন্য ধাপে ধাপে নিজেকে যোগ্য করে গড়ে তোলার সুযোগ তো
            থাকছেই।
          </li>
        </ul>
        <h1 className="text-xl md:text-3xl text-center mt-16 mb-5 font-semibold">
          Job Expert কেন আলাদা হবে-
        </h1>
        <ul className="space-y-5 mt-10">
          <li>১) টাইম ম্যানেজমেন্ট সম্পর্কে পর্যাপ্ত ধারণা।</li>
          <li>৩) সম্পূর্ণ বিজ্ঞাপন মুক্ত (Add free).</li>
          <li>
            ৪) চূড়ান্ত পরীক্ষায় কমন উপযোগী সাজেশন, লেকচার শীট ও লাইভ ক্লাস।
          </li>
          <li>৫) সহজে ব্যবহার উপযোগী ওয়েবসাইট ও অ্যাপ।</li>
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
