import { AiOutlineFire, AiOutlineHome } from 'react-icons/ai'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='w-32'>
        <div className='w-16 grid mt-16 mb-4 justify-center'>
            <div className='flex justify-center text-white'><AiOutlineHome/></div> 
            <span className='flex justify-center text-white'><Link to={"/"}>Home</Link></span>
        </div>

        <div className='w-16 grid justify-center'>
        <div className='flex justify-center text-white'><AiOutlineFire/></div> 
            <span className='flex justify-center text-white'><Link to={"/Popular"}>Popular</Link></span>
        </div>
    </div>
  );
};

export default Navbar