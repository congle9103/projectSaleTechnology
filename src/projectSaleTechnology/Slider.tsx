import { Scrollbar, A11y, Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/swiper-bundle.css';

const Slider = () => {
  return (
    <div className='w-[1200px] relative overflow-hidden'>
      <Swiper
        modules={[ Scrollbar, A11y, Autoplay, Navigation]}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
      >
        <SwiperSlide>
          <img
            src="./imgs-projectsale/banner-ult-tower-10-wbsite.png"
            alt=""
            className='w-[1200px] h-auto'
          />
        </SwiperSlide>

        <SwiperSlide>
          <img
            src="./imgs-projectsale/galaxy-a06-1200x375-01.jpg"
            alt=""
            className='w-[1200px] h-auto'
          />
        </SwiperSlide>

        <SwiperSlide>
          <img
            src="./imgs-projectsale/banner-web-14t-dt_638629619508935983.jpg"
            alt=""
            className='w-[1200px] h-auto'
          />
        </SwiperSlide>

        {/* Tùy chỉnh nút điều hướng bằng Tailwind */}
        <div className="swiper-button-next mx-4 text-gray-500 text-xs hover:text-gray-300"></div>
        <div className="swiper-button-prev mx-4 text-gray-500 text-xs hover:text-gray-300"></div>
      </Swiper>
    </div>
  );
};

export default Slider;
