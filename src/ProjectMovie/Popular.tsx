import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { MdOutlinePlayArrow } from "react-icons/md";
import Header from "./Header";
import Navbar from "./Navbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Pagination } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";

const queryClient = new QueryClient();

interface Movie {
  id: number;
  original_title: string;
  backdrop_path: string;
}

{/*const options = {
  params: { language: "en-US", page: "1" },
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYmY0YWJjNGUzMTEyYzNhOGIyODMwMWMxYWQwMzllZSIsInN1YiI6IjY0MTI3N2Q2ZTE4ZTNmMDdkMDU1ZjY4OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iw5OvKuR35yRllO8eoRWjvCQnlFmh8nieiLD9NpSDc8",
  },
};*/}

const Popular = () => {
  const navigate = useNavigate();
  const [param] = useSearchParams();
  const page_str = param.get("page");
  const page = page_str ? parseInt(page_str) : 1;

  {/*localStorage.setItem(
    "access_token",
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYmY0YWJjNGUzMTEyYzNhOGIyODMwMWMxYWQwMzllZSIsInN1YiI6IjY0MTI3N2Q2ZTE4ZTNmMDdkMDU1ZjY4OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iw5OvKuR35yRllO8eoRWjvCQnlFmh8nieiLD9NpSDc8"
  );*/}

  const { isPending, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      axios.get(
        `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`
      )
  });

  console.log("data", data?.data.results ,'page',page);

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="bg-slate-900 truncate">
      <QueryClientProvider client={queryClient}>
        <Header />
        <div className="flex">
          <Navbar />
          <div className="grid">
            <h2 className="h-12 w-[1090px] bg-slate-800 pl-4 mt-14 mb-10 text-white flex items-center text-xl font-semibold">
              Popular Movies
            </h2>
            <div className="w-[1090px] container mx-auto">
              <div className="grid grid-cols-4 gap-4 mt-8">
                {data?.data.results.map((movie: Movie) => (
                  <div
                    key={movie.id}
                    className="group relative overflow-hidden hover:scale-105 transition duration-500"
                  >
                    <img
                      className="object-cover h-[380px] w-[250px]"
                      src={`https://www.themoviedb.org/t/p/w220_and_h330_face${movie.backdrop_path}`}
                      alt={movie.original_title}
                    />
                    <div className="w-[230px] absolute flex justify-between bottom-0 mx-2">
                      <div>
                        <p className="text-[20px] font-bold text-white">
                          {movie.original_title}
                        </p>
                        <p className="text-[20px] my-[5px] text-white">
                          action
                        </p>
                      </div>
                      <div className="bg-[#f8a92a] absolute flex rounded-full h-[40px] items-end  hover:bg-[#e99e26] right-0 bottom-3 ">
                        <MdOutlinePlayArrow className="m-1" size={30} />
                      </div>
                    </div>
                  </div>
                ))}
                ;
              </div>
            </div>
          </div>
        </div>
      </QueryClientProvider>
      <Pagination
      className="my-5 text-center text-white"
        onChange={(page) => {
          navigate(`?page=${page}`);
        }}
        defaultCurrent={1}
        showSizeChanger={false}
        total={50}
      />
    </div>
  );
};

export default Popular;
