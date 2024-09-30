  import { useEffect, useState } from "react";
  import { Link } from "react-router-dom";
  import Products from "./Compoments/Products";
  import { FaArrowRight, FaArrowUp } from "react-icons/fa";
import Slider from "./Slider";

  const Main = () => {

    useEffect(() => {
      window.scrollTo(0, 0); // Cuộn lên đầu trang mỗi khi component được hiển thị
    }, []);

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        window.scrollY > 0 ? setIsVisible(true) : setIsVisible(false);
      };
      window.addEventListener("scroll", handleScroll);
    }, []);

    const handleScrollTo = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })}

    return (
      <div className="w-[1200px] mt-[30px]">
        <div className="bg-white p-[14px] pt-0 rounded"> 
          <div className="flex">
            <div className="py-[10px] ml-[8px] text-xl flex-1">Flash Sale</div>
            <div className="py-[10px] ml-[8px] mr-[12px] font-semibold text-blue-900"><Link className="flex" to={"/FlashSale"}>More &nbsp; <FaArrowRight className='mt-1'/></Link></div>
          </div>
          <div className="grid grid-cols-5 gap-2">
            <Products productStart={20} productEnd={25}/>
          </div>
        </div>

        <div className="bg-white mt-[30px] p-[14px] pt-0 rounded">
          <div className="flex">
            <div className="py-[10px] ml-[8px] text-xl flex-1">Mall</div>
            <div className="py-[10px] ml-[8px] mr-[12px] font-semibold text-blue-900"><Link className="flex" to={"/Mall"}>More &nbsp; <FaArrowRight className='mt-1'/></Link></div>
          </div>
          <div className="grid grid-cols-5 gap-2">
          <Products productStart={40} productEnd={45}/>
          </div>
        </div>

        <div className="bg-white mt-[30px] p-[14px] pt-0 rounded">
          <div className="flex">
            <div className="py-[10px] ml-[8px] text-xl flex-1">Just For You</div>
            <div className="py-[10px] ml-[8px] mr-[12px] font-semibold text-blue-900"><Link className="flex" to={"/JustForYou"}>More &nbsp; <FaArrowRight className='mt-1'/></Link></div>
          </div>
          <div className="grid grid-cols-5 gap-2">
          <Products productStart={10} productEnd={15}/>
          </div>
        </div>

        <div className="bg-white mt-[30px] p-[14px] pt-0 rounded">
          <div className="flex">
            <div className="py-[10px] ml-[8px] text-xl flex-1">Just For You</div>
            <div className="py-[10px] ml-[8px] mr-[12px] font-semibold text-blue-900"><Link className="flex" to={"/JustForYou"}>More &nbsp; <FaArrowRight className='mt-1'/></Link></div>
          </div>
          <div className="grid grid-cols-5 gap-2">
          <Products productStart={15} productEnd={20}/>
          </div>
        </div>

        {isVisible && (
          <div
            onClick={handleScrollTo}
            className="fixed cursor-pointer right-4 bottom-6 bg-black text-white rounded-[50%] w-[50px] h-[50px] flex items-center justify-center"
          >
            <div>
              <FaArrowUp />
            </div>
          </div>
        )}
      </div>
    );
  };

  export default Main
