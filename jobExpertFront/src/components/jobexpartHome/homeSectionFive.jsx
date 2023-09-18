import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import axios from "axios";
import Api from "../Axios/axios";
import  apy  from "../../components/urlBackend"

const homeSectionFive = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`${Api.defaults.baseURL}/jobExpert/api/v1/comment-all`)
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <>
      <h3 className="text-2xl text-center font-bold mb-10 mt-20">
        শিক্ষার্থীদের মতামত
      </h3>
      <Swiper
        className="mySwiper mx-16 pt-5"
        slidesPerView={1}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 1,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }}
      >
        {data?.map((datas) => (
          <>
            <SwiperSlide>
              <div className="w-11/12 py-10 rounded-lg duration-500 shadow-lg border-2 relative cursor-pointer group">
                <span className=" :">
                  <Icon
                    icon="icon-park:quote"
                    width={40}
                    className="absolute -top-6  left-5"
                  />
                </span>
                <p className="text-left px-5">{datas?.comment}</p>
                <div className="flex items-center gap-4 px-5 pt-5">
                  <div className="w-10 h-10">
                    <img
                      src={`${apy}/uploads/${datas?.url}`}
                      alt=""
                      className="w-full rounded-full"
                    />
                  </div>
                  <div>
                    <p>{datas?.email}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </>
        ))}
      </Swiper>
    </>
  );
};

export default homeSectionFive;
