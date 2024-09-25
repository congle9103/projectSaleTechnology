import { Link } from "react-router-dom";
import Products from "./Products";
import { FaArrowLeft } from "react-icons/fa";

type TCategories = {
  nameCategory?: string
  labelProduct?: string
  productStart?: number
  productEnd?: number
}

const Categories = (Categories: TCategories) => {
  return (
    <div className="w-[968px]">
      <div className="bg-white">
        <div className="flex">
          <div className="py-[10px] ml-[8px] text-xl flex-1">
            {Categories.nameCategory}
          </div>
          <div className="py-[10px] ml-[8px] mr-[12px] font-semibold text-blue-900">
          <Link className="flex" to={"/"}> Home&nbsp; <FaArrowLeft className="mt-1"/></Link>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2">
          <Products productStart={Categories.productStart} productEnd={Categories.productEnd} label={Categories.labelProduct}/>
        </div>
      </div>
    </div>
  );
};

export default Categories;
