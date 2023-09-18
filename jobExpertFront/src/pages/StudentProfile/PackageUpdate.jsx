import { Icon } from "@iconify/react";

import Slider from "../../components/Slider/Slider";
import PackageDropdown from "../../components/PackageDropdown/PackageDropdown";
import JobExpart from "../../components/JobExpart/JobExpart";
import TwelveMonthPrili from "../../components/TwelveMonthPrili/TwelveMonthPrili";

const PackageUpdate = () => {
  return (
    <>
      <div className=" flex items-center mt-16">
        <PackageDropdown />
      </div>

      {/* job expart section  */}
      <div className="mt-16">
        <h1 className="flex items-center gap-3 text-xl">
          <Icon icon="game-icons:check-mark" />
          Job Expert আপনার প্যাকেজ
        </h1>
        <div className="mt-10 flex flex-col md:flex-row  justify-center gap-16 gap-y-5">
          <ul>
            <li className="flex items-center gap-3">
              <Icon icon="carbon:checkmark-outline" width={20} /> লাইফ টাইম সকল
              জব পরিক্ষার সুযোগ{" "}
            </li>
            <li className="flex items-center gap-3 py-3">
              <Icon icon="carbon:checkmark-outline" width={20} /> Video Class
              এবং প্রিমিয়াম ফিচারের এক্সেস পাবেন।
            </li>
            <li className="flex items-center gap-3">
              <Icon icon="carbon:checkmark-outline" width={20} /> সকল বাটনের সকল
              লাইভ এবং আর্কাইভের পরীক্ষা দিতে পারবেন
            </li>
            <li className="flex items-center gap-3 py-3">
              <Icon icon="carbon:checkmark-outline" width={20} />
              আপনি যে কোন সময় পুরনো প্রশ্নপত্র দেখতে ও পড়তে পারবেন।
            </li>
            <li className="flex items-center gap-3">
              <Icon icon="carbon:checkmark-outline" width={20} />
              আগের সকল পরীক্ষার ২.৫০ লাখ++ Exclusive MCQ এবং রেফারেন্সসহ
              ব্যাখ্যা আছে
            </li>
          </ul>

          <div>
            <div className="border border-b-0">
              <h1 className="text-xl px-5 text-center py-2 font-semibold">
                পরীক্ষা তারিখ
              </h1>
            </div>
            <div className="border border-t-0">
              <p className="text-lg bg-primary text-center text-[#FFFFFF] py-10 px-4  ">
                ১০ ঘন্টা ২৬ মিনিট ২০ সেকেন্ড
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ১২ মাস বিসিএস  প্রিলি */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-5 gap-y-5 mt-16">
        <TwelveMonthPrili />
      </div>

      {/* slider section */}
      <div className="mt-16">
        <Slider />
      </div>
      {/* job expart logo */}
      <JobExpart />
    </>
  );
};

export default PackageUpdate;
