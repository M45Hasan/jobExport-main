import { Icon } from "@iconify/react";
import appstore from "../../assets/brandLogo/appstore (1).png";
import googlestore from "../../assets/brandLogo/appstore (2).png";
import logo from "../../assets/brandLogo/logos.png";
import logof from "../../assets/brandLogo/weepoka.png";

const Footer = () => {
  const getCurrentYear = () => {
    return new Date().getFullYear();
  };
  return (
    <div className="pt-16 mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-items-start md:justify-items-center items-center gap-5 bg-[#000000] py-16 px-10 md:px-16">
        {/* logo and icon */}
        <div className="md:max-w-md flex justify-center ">
          <div>
            <a
              href="/"
              aria-label="Go home"
              title="Company"
              className="inline-flex items-center"
            >
              <img src={logo} alt="" className="w-52 mx-auto" />
            </a>
            <div className="flex justify-center items-center gap-4 mt-5">
              <a href="/">
                <Icon
                  icon="mdi:twitter"
                  width={30}
                  className="text-[#FFFFFF] transform hover:-translate-y-2 duration-300"
                />
              </a>
              <a href="/">
                <Icon
                  icon="ri:linkedin-fill"
                  width={30}
                  className="text-[#FFFFFF] transform hover:-translate-y-2 duration-300"
                />
              </a>
              <a href="/">
                <Icon
                  icon="mdi:instagram"
                  width={25}
                  className="text-[#FFFFFF] transform hover:-translate-y-2 duration-300"
                />
              </a>
              <a href="https://www.facebook.com/profile.php?id=61551578308108&mibextid=D4KYlr">
                <Icon
                  icon="ic:baseline-facebook"
                  width={28}
                  className="text-[#FFFFFF] transform hover:-translate-y-2 duration-300"
                />
              </a>
            </div>
          </div>
        </div>

        <div className=" md:px-0 py-10 md:py-0">
          <p className="font-semibold tracking-wide text-lg text-[#FFFFFF]">
            Contact
          </p>
          <ul className="mt-2 space-y-2">
            <li>
              <a
                className="text-[#FFFFFF] flex items-center gap-3 pt-3"
                href="tel:+880 1700-000000"
              >
                <Icon icon="ph:phone" width={25} />
                <p className="transform hover:translate-x-2 duration-300 ">
                  +880 1521575970
                </p>
              </a>
            </li>
            <li>
              <a
                className="text-[#FFFFFF] flex items-center gap-3 pt-3"
                href="tel:+880 1521575970"
              >
                <Icon icon="fontisto:email" width={22} />
                <p className="transform hover:translate-x-2 duration-300 ">
                  jexpert82@gmail.com
                </p>
              </a>
            </li>

            <li className="-ml-1">
              <a
                className="text-[#FFFFFF] flex items-center gap-3 pt-3"
                href="tel:+880 1700-000000"
              >
                <Icon icon="mdi:location" width={40} />
                <p className="transform hover:translate-x-2 duration-300 ">
                  Dhaka, Bangladesh
                </p>
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-lg font-semibold tracking-wide text-[#FFFFFF]">
            Exam
          </p>
          <ul className="mt-2 space-y-2 pt-3">
            <li>
              <a href="/">
                <p className="text-[#FFFFFF] transform hover:translate-x-2 duration-300">
                  বিসিএস প্রিলি প্রস্তুতি
                </p>
              </a>
            </li>
            <li>
              <a href="/">
                <p className="text-[#FFFFFF] transform hover:translate-x-2 duration-300">
                  জব সল্যুশন
                </p>
              </a>
            </li>
            <li>
              <a
                href="/"
                className="text-[#FFFFFF] transform hover:translate-x-2 duration-300"
              >
                <p className="text-[#FFFFFF] transform hover:translate-x-2 duration-300">
                  {" "}
                  ব্যাংক নিয়োগ প্রস্তুতি
                </p>
              </a>
            </li>
            <li>
              <a
                href="/"
                className="text-[#FFFFFF] transform hover:translate-x-2 duration-300"
              >
                <p className="text-[#FFFFFF] transform hover:translate-x-2 duration-300">
                  ৯-২০তম গ্রেড প্রস্তুতি
                </p>
              </a>
            </li>
          </ul>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center gap-5">
          <a href="/">
            {" "}
            <img src={appstore} alt="" className="w-48" />
          </a>
          <a href="/">
            <img src={googlestore} alt="" className="w-44" />
          </a>
        </div>
      </div>

      <div className="">
        <p className="text-base py-4 text-center text-gray-600">
          Copyright ©{getCurrentYear()} Job Expert Developed by{" "}
          <a href="https://weepoka.com/" target="_blank">
            <img
              className="md:w-[10%] w-[40%] inline-block"
              src={logof}
              alt=""
            />
          </a>
          . All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
