import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Products from "./Components/Product";
import { FaArrowRight, FaArrowUp } from "react-icons/fa";
import { useModalStore } from './States/useModalStore'; // Import store zustand
import Login from './Login'; // Import component Login
import Register from './Register'; // Import component Register

const Main = () => {
  // Cuộn lên đầu trang khi component hiển thị
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Quản lý trạng thái hiển thị của nút cuộn lên đầu trang
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100); // Hiển thị nút khi cuộn xuống quá 100px
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll); // Gỡ bỏ sự kiện khi component bị hủy
    };
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Sử dụng store để quản lý modal và trạng thái trang Login/Register
  const { isModalOpen, toggleModal, isLogin } = useModalStore();

  return (
    <div className="w-[1200px] mt-[30px] mx-auto">
      {/* Flash Sale Section */}
      <div className="bg-white p-[14px] pt-0 rounded">
        <div className="flex justify-between">
          <div className="py-[10px] ml-[8px] text-xl font-semibold">Flash Sale</div>
          <div className="py-[10px] mr-[12px] font-semibold text-blue-900">
            <Link className="flex items-center" to="/FlashSale">
              Xem thêm &nbsp; <FaArrowRight className="mt-1" />
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-5 gap-2">
          <Products selectedCategories="phone" />
        </div>
      </div>

      {/* Điện thoại Section */}
      <div className="bg-white mt-[30px] p-[14px] pt-0 rounded">
        <div className="flex justify-between">
          <div className="py-[10px] ml-[8px] text-xl font-semibold">Điện thoại</div>
          <div className="py-[10px] mr-[12px] font-semibold text-blue-900">
            <Link className="flex items-center" to="/Mall">
              Xem thêm &nbsp; <FaArrowRight className="mt-1" />
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-5 gap-2">
          <Products selectedCategories="phone" />
        </div>
      </div>

      {/* Laptop Section */}
      <div className="bg-white mt-[30px] p-[14px] pt-0 rounded">
        <div className="flex justify-between">
          <div className="py-[10px] ml-[8px] text-xl font-semibold">Laptop</div>
          <div className="py-[10px] mr-[12px] font-semibold text-blue-900">
            <Link className="flex items-center" to="/JustForYou">
              Xem thêm &nbsp; <FaArrowRight className="mt-1" />
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-5 gap-2">
          <Products selectedCategories="laptop" />
        </div>
      </div>

      {/* Tablet Section */}
      <div className="bg-white mt-[30px] p-[14px] pt-0 rounded">
        <div className="flex justify-between">
          <div className="py-[10px] ml-[8px] text-xl font-semibold">Tablet</div>
        </div>
        <div className="grid grid-cols-5 gap-2">
          <Products selectedCategories="tablet" />
        </div>
      </div>

      {/* Section có nút Sign Up */}
      <div className="bg-white mt-[30px] p-[14px] pt-0 rounded">
        <div className="flex justify-between">
          <div className="py-[10px] ml-[8px] text-xl font-semibold">Tablet</div>
          <div
            onClick={toggleModal}  // Khi nhấn vào sẽ toggle modal mở/đóng
            className="py-[10px] mr-[12px] font-semibold text-blue-900 cursor-pointer"
          >
            {isLogin ? "Login" : "Sign Up"}
          </div>
        </div>
        <div className="grid grid-cols-5 gap-2">
          <Products selectedCategories="tablet" />
        </div>
      </div>

      {/* Hiển thị Login hoặc Register dựa trên trạng thái isLogin */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          {isLogin ? (
            <Login onCloseLogin={toggleModal} />
          ) : (
            <Register onCloseRegister={toggleModal} />
          )}
        </div>
      )}

      {/* Nút cuộn lên đầu trang */}
      {isVisible && (
        <div
          onClick={handleScrollToTop}
          className="fixed cursor-pointer right-10 bottom-6 bg-black text-white rounded-full w-[50px] h-[50px] flex items-center justify-center"
        >
          <FaArrowUp />
        </div>
      )}
    </div>
  );
};

export default Main;
