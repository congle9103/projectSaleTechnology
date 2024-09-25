import { IoSearch } from "react-icons/io5";

const Header = () => {
  return (
    <div className="mx-32 m-auto justify-between flex py-4 px-2">
      <div className="text-yellow-500 font-bold text-2xl">
        <span className="text-white">MOVIE</span>VENNIE
      </div>

      <div className="flex">
        <div className="relative flex">
          <input
            className="text-white bg-slate-700 rounded-2xl pl-4 w-60 flex justify-items-center"
            placeholder="Search movies"
            type="text"
          />
          <IoSearch className="absolute top-1/2 left-52 transform -translate-y-1/2 text-white" />
        </div>
        <img className="ml-4" src="./imgs/user.PNG" alt="" />
      </div>
    </div>
  );
};

export default Header;
