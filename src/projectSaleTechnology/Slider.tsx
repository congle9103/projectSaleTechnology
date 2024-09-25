import { Pagination, Scrollbar, A11y, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/swiper-bundle.css';

const Slider = () => {
  return (
    <div className='w-[1200px] relative overflow-hidden'>
      <Swiper
        modules={[Pagination, Scrollbar, A11y, Autoplay]}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}  
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
            src="./imgs-projectsale/honor-200-1200x375-2.png"
            alt=""
            className='w-[1200px] h-auto'
          />
        </SwiperSlide>

        <SwiperSlide>
          <img
            src="./imgs-projectsale/ss-s24fe-pc.jpg"
            alt=""
            className='w-[1200px] h-auto'
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Slider;