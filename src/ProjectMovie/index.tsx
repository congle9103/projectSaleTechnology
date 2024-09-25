import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { MdOutlinePlayArrow } from "react-icons/md";

interface Movie {
  id: number;
  original_title: string;
  backdrop_path: string;
}

const options = {
  params: { language: "en-US", page: "1" },
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYmY0YWJjNGUzMTEyYzNhOGIyODMwMWMxYWQwMzllZSIsInN1YiI6IjY0MTI3N2Q2ZTE4ZTNmMDdkMDU1ZjY4OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iw5OvKuR35yRllO8eoRWjvCQnlFmh8nieiLD9NpSDc8",
  },
};

const ProjectMovie = () => {
  localStorage.setItem(
    "access_token",
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYmY0YWJjNGUzMTEyYzNhOGIyODMwMWMxYWQwMzllZSIsInN1YiI6IjY0MTI3N2Q2ZTE4ZTNmMDdkMDU1ZjY4OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iw5OvKuR35yRllO8eoRWjvCQnlFmh8nieiLD9NpSDc8"
  );

  const { isPending, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      axios.get("https://api.themoviedb.org/3/movie/popular", options),
  });

  console.log("data", data?.data.results);

  if (isPending) return 'Loading...';

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="truncate pb-64">
      <div className="relative">
        <img
          className="w-[1090px] rounded"
          src="./imgs/home-background.png"
          alt=""
        />
        <div className="absolute top-1/2 transform -translate-y-1/2 text-white">
          <div className="text-4xl font-bold ml-12 mb-2 leading-snug">
            Hitman's Wife's <br /> Bodyguard
          </div>
          <div className="text-yellow-500 ml-12">Releasing 23 july</div>
          <div className="font-semibold text-xl ml-12 mt-2 flex cursor-pointer">
            <MdOutlinePlayArrow
              className="text-black mt-2 bg-yellow-500 rounded-2xl"
              size={30}
            />
            <div className="mt-2 ml-2">Watch the trailler</div>
          </div>
        </div>
      </div>

      <h2 className="h-12 w-[1090px] bg-slate-800 pl-4 mt-14 mb-10 text-white flex items-center text-xl font-semibold">
        Popular Movies
      </h2>
      <div className="h-12 w-[1090px] mt-52 flex items-center ">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          slidesPerView={4}
          navigation
          scrollbar={{ draggable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
        >
          {data?.data.results.map((movie: Movie) => (
            <SwiperSlide>
              <div className="mx-0 px-0 hover:scale-105 transition duration-500 h-[380px] w-[250px] my-[14px] relative">
                <img
                  className="mx-0 px-0 absolute h-[380px] w-[250px]"
                  src={`https://www.themoviedb.org/t/p/w220_and_h330_face${movie.backdrop_path}`}
                  alt=""
                />
                <div className="w-[230px] absolute flex justify-between bottom-0 mx-2">
                  <div>
                    <p className="text-[20px] font-bold text-white">
                      {movie.original_title}
                    </p>
                    <p className="text-[20px] my-[5px] text-white">action</p>
                  </div>
                  <div className="bg-[#f8a92a] absolute flex rounded-full h-[40px] items-end  hover:bg-[#e99e26] right-0 bottom-3 ">
                    <MdOutlinePlayArrow className="m-1" size={30} />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ProjectMovie;
