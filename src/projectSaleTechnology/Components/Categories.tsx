import { Link } from "react-router-dom";
import Product from "./Product";
import { FaArrowLeft } from "react-icons/fa";

type TCategories = {
  nameCategory?: string
}

const Categories = (Categories: TCategories) => {
  return (
    <div className="w-[1200px] mt-[30px] mx-auto">
      <div className="bg-white">
        <div className="flex">
          <div className="py-[10px] ml-[8px] text-xl flex-1">
            {Categories.nameCategory}
          </div>
          <div className="py-[10px] ml-[8px] mr-[12px] font-semibold text-blue-900">
          <Link className="flex" to={"/"}> Home&nbsp; <FaArrowLeft className="mt-1"/></Link>
          </div>
        </div>
        <div className="grid grid-cols-5 gap-2">
          <Product selectedCategories="laptop"/>
        </div>
      </div>
    </div>
  );
};

export default Categories;
