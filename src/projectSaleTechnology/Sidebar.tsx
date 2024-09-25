import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='w-[160px] h-[74px] pl-[8px] mr-[20px] bg-white sticky top-[130px]'>
        <div><Link to={"/FlashSale"}>Flash Sale</Link></div>
        <div><Link to={"/Mall"}>Mall</Link></div>
        <div><Link to={"/JustForYou"}>Just For You</Link></div>
    </div>
  )
}

export default Sidebar