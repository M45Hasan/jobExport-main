import courseDetails from "../../assets/slider/slide_1.png";
import courseDetails2 from "../../assets/slider/slide_2.jpeg";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Slider.css";

import { EffectFade, Navigation } from "swiper/modules";

const Slider = () => {
  return (
    <>
      <h1 className="text-xl md:text-3xl text-center mt-10 mb-10 font-semibold">
        চাকরি প্রস্তুতি কোর্স সমূহ
      </h1>
      <Swiper
        spaceBetween={30}
        effect={"fade"}
        navigation={true}
        modules={[EffectFade, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img className="w-full" src={courseDetails} />
        </SwiperSlide>
        <SwiperSlide>
          <img className="w-full" src={courseDetails2} />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Slider;
