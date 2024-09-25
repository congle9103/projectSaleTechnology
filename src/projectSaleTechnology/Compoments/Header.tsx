import React from 'react'
import { IoIosSearch } from 'react-icons/io'
import { IoCartOutline, IoLogoXing } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import { useCount } from '../States/useCount'
import { FaRegUserCircle } from "react-icons/fa";


const Header = () => {

  const { count } = useCount()

  return (
    <div className='px-[60px] bg-blue-900 fixed left-0 right-0 top-0 z-[1000]'>
      <div className='flex justify-between px-[140px] my-[16px]'>
        <div className='text-white font-bold text-5xl mb-1'><Link to={"/"}><IoLogoXing /></Link></div>
        <div className='flex flex-1 mx-16'>
          <input className='bg-white pl-4 flex-1 rounded-l-lg' placeholder='Bạn tìm gì hôm nay' type="text" name="" id="" />
          <div className='w-12 bg-white rounded-r-lg'><IoIosSearch className='text-blue-900 text-2xl mt-3 ml-3 cursor-pointer' /></div>
        </div>
        <div className='relative'>
          <IoCartOutline className='text-white text-4xl mt-[10px] mr-[44px] cursor-pointer' />
          <div className='absolute right-[36px] top-0 bg-red-600 text-white rounded-[50%] px-1'>{count}</div>
        </div>
        <Link to={"/ProductsManager"}><FaRegUserCircle className='text-white text-4xl mt-[10px] cursor-pointer' /></Link>
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
    </div>
  )
}

export default Header