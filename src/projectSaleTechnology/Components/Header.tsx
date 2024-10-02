import { useState, useEffect, useRef } from 'react';
import { IoIosSearch } from 'react-icons/io';
import { IoCartOutline, IoLogoXing } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { useCount } from '../States/useCount';
import { FaRegUserCircle } from "react-icons/fa";

const handleScrollTo = () => {
  window.scrollTo({
    top: 0,
  });
};

const Header = () => {
  const { count } = useCount();
  const [showAddToCartMessage, setShowAddToCartMessage] = useState(false);
  const [isAddToCartMessageFadeOpacity, setIsAddToCartMessageFadeOpacity] = useState(false);
  const prevCountRef = useRef(count); // Để lưu giá trị trước đó của count

  useEffect(() => {
    if (count > prevCountRef.current) {
      setShowAddToCartMessage(true);
      setIsAddToCartMessageFadeOpacity(true); // Hiển thị thông báo
      const hideTimer = setTimeout(() => {
        setIsAddToCartMessageFadeOpacity(false); // Tắt thông báo sau một thời gian
        const fadeOpacityTimer = setTimeout(() => {
          setShowAddToCartMessage(false);
        }, 500); // Đợi thêm 500ms để hoàn tất quá trình mờ dần trước khi loại bỏ khỏi DOM
        return () => clearTimeout(fadeOpacityTimer);
      }, 3000); // Thông báo sẽ hiển thị trong 3 giây
      return () => clearTimeout(hideTimer);
    }
  }, [count]);

  return (
    <div className='px-[60px] bg-blue-900 fixed left-0 right-0 top-0 z-[1000]'>
      <div className='flex justify-between px-[140px] my-[16px]'>
        <div className='text-white font-bold text-5xl mb-1'>
          <Link onClick={handleScrollTo} to={"/"}>
            <IoLogoXing />
          </Link>
        </div>
        <div className='flex flex-1 mx-16'>
          <input className='bg-white pl-4 flex-1 rounded-l-lg' placeholder='Bạn tìm gì hôm nay' type="text" />
          <div className='w-12 bg-white rounded-r-lg'>
            <IoIosSearch className='text-blue-900 text-2xl mt-3 ml-3 cursor-pointer' />
          </div>
        </div>
        <div className='flex relative'>
          <IoCartOutline className='text-white text-4xl mt-[10px] cursor-pointer' />
          <div className='absolute right-[110px] top-0 bg-red-600 text-white rounded-[50%] px-1'>{count}</div>
          <div className='text-white pt-[18px] ml-[10px] mr-[44px]'>Giỏ hàng</div>
        </div>
        <Link to={"/ProductsManager"}>
          <div className='flex'>
            <FaRegUserCircle className='text-white text-4xl mt-[10px] cursor-pointer' />
            <div className='text-white pt-[18px] ml-[10px] mr-[14px]'>Tài khoản</div>
          </div>
        </Link>
      </div>
      <div className='flex justify-between h-[30px] mx-[100px] text-white rounded-xl'>
        <div className='cursor-pointer w-[100px] text-center flex-1 hover:text-blue-900 hover:bg-white transition'>Máy tính bàn</div>
        <div className='cursor-pointer w-[100px] text-center flex-1 hover:text-blue-900 hover:bg-white transition'>Laptop</div>
        <div className='cursor-pointer w-[100px] text-center flex-1 hover:text-blue-900 hover:bg-white transition'>Tablet</div>
        <div className='cursor-pointer w-[100px] text-center flex-1 hover:text-blue-900 hover:bg-white transition'>Điện thoại</div>
        <div className='cursor-pointer w-[100px] text-center flex-1 hover:text-blue-900 hover:bg-white transition'>Đồng hồ</div>
        <div className='cursor-pointer w-[100px] text-center flex-1 hover:text-blue-900 hover:bg-white transition'>Tai nghe</div>
        <div className='cursor-pointer w-[100px] text-center flex-1 hover:text-blue-900 hover:bg-white transition'>Phụ kiện</div>
      </div>
      {/* Thông báo "Đã thêm vào giỏ hàng" */}
      {showAddToCartMessage && (
        <div
          className={`absolute bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg top-[74px] right-[360px] z-50 transition-opacity duration-500 ease-in-out ${
            isAddToCartMessageFadeOpacity ? 'opacity-100' : 'opacity-0'
          }`}
        >
          Đã thêm vào giỏ hàng
          <div className='absolute right-[10px] top-[-8px] w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[10px] border-b-green-500'></div>
        </div>
      )}
    </div>
  );
};

export default Header;
