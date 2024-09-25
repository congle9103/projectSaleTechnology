import React, { useEffect, useState } from "react";
import Categories from "./Compoments/Categories";
import Sidebar from "./Sidebar";
import Footer from "./Compoments/Footer";
import Header from "./Compoments/Header";
import { FaArrowUp } from "react-icons/fa";

const Mall = () => {
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
    <div className="bg-slate-100">
      <Header />
      <div className="flex mx-[100px] pb-[100px] pt-[130px]">
        <Sidebar />
        <Categories productStart={0} productEnd={100} nameCategory="Mall" labelProduct="Mall"/>
      </div>
      <Footer />
      {isVisible && (
        <div
          onClick={handleScrollTo}
          className="fixed cursor-pointer right-4 bottom-6 bg-black text-white rounded-[50%] w-[50px] h-[50px] flex items-center justify-center"
        >
          <FaArrowUp />
        </div>
      )}
    </div>  
  );
};

export default Mall;
