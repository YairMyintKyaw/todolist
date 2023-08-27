import React from "react";
import Lottie from "react-lottie";
import security from "../Animated/security.json";
import welcome from "../Animated/welcomTodoList.json";
import tracking from "../Animated/processTracking.json";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const animatedSvg = [welcome, security, tracking];

const textInCarousel = [
  {
    heading: "Your Ultimate Task Manager",
    description:
      "Stay organized, keep track of tasks and priorities, bid farewell to chaos, and embrace productivity with TodoList's powerful task management tool.",
  },
  {
    heading: "Secure and Private",
    description:
      "Rest easy knowing that TodoList ensures the safety and privacy of your data through robust encryption and best practices, protecting your tasks and personal information.",
  },
  {
    heading: "Track Your Progress",
    description:
      "Stay motivated, track progress, celebrate wins, visualize productivity, and strive for success with TodoList's insightful progress tracking.",
  },
];

const Carousel = () => {
  return (
    <div className="w-4/5">
      <Swiper
        style={{
          "--swiper-pagination-color": "#a8dadc",
          "--swiper-pagination-bullet-inactive-color": "#457b9d",
          "--swiper-pagination-bullet-inactive-opacity": "1",
          "--swiper-pagination-bullet- -gap": "6px",
          "--swiper-pagination-bullet-width": "20px",
          "--swiper-pagination-bullet-height": "5px",
          "--swiper-pagination-bullet-border-radius": "3px",
          "--swiper-pagination-position": "relative",
        }}
        slidesPerView={1}
        pagination={{
          clickable: true,
          bulletClass: `swiper-pagination-bullet`,
        }}
        modules={[Autoplay, Pagination, A11y]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        className=""
      >
        {[0, 1, 2].map((_, index) => (
          <SwiperSlide key={index} className="">
            <div className="flex flex-col gap-3">
              <div className="w-3/4 mx-auto">
                <Lottie
                  options={{
                    loop: true,
                    autoplay: true,
                    animationData: animatedSvg[index],
                  }}
                />
              </div>
              <div className="text-secondary text-center w-2/3 lg:w-1/2 mx-auto ">
                <h4 className="text-xl mb-2">
                  {textInCarousel[index].heading}
                </h4>
                <p className="text-sm ">{textInCarousel[index].description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
