import { useState } from "react";
import { useCount } from "../States/useCount";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface TProduct {
  image?: string;
  images?: string[];
  title?: string;
  category? :string,
  selectedCategories? :string
  id?: number;
  price?: number;
  productStart?: number;
  productEnd?: number;
}

const Products = (productProgs : TProduct) => {
  const { setCount } = useCount();
  const [isLocked, setIsLocked] = useState(false); // Trạng thái khóa

  const { isPending, error, data } = useQuery({
    queryKey: ["Products"],
    queryFn: () => axios.get("http://localhost:3000/saleTechnology"),
  });

  const handleBuyNow = () => {
    if (!isLocked) {
      setCount(); // Gọi hàm setCount khi không bị khóa
      setIsLocked(true); // Khóa lại sau khi gọi
      // Sau 3 giây, mở khóa để cho phép gọi setCount lại
      setTimeout(() => {
        setIsLocked(false);
      }, 3000);
    }
  };

  console.log(data?.data);

  if (isPending)
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
        <div className="bg-white p-8 rounded-xl shadow-2xl text-center">
          <div className="relative">
            <div className="w-16 h-16 border-8 border-t-8 border-blue-500 border-solid rounded-full animate-spin mx-auto mb-4"></div>
            <div className="absolute inset-0 flex items-center justify-center"></div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Đang tải...</h2>
          <p className="text-gray-600 mt-2">Vui lòng đợi một chút.</p>
        </div>
      </div>
    );

  if (error) return <div>Error: {error.message}</div>;

  const discount = 20;
  
  // Lọc sản phẩm theo category
  const filteredProducts = data?.data.filter((productData: TProduct) => productData.category === `${productProgs.selectedCategories}`);

  // Chỉ lấy ra 5 sản phẩm đầu tiên
  const limitedProducts = filteredProducts?.slice(0, 5);

  return (
    <>
      {limitedProducts?.map((productData: TProduct) => (
          <div className=" border-gray-200 rounded-lg border-[1px] overflow-hidden pt-2" key={productData.id}>
            <img
              className="w-full h-[240px] object-contain transition-transform duration-300 ease-in-out transform hover:scale-105"
              src={productData.image}
              alt="Product image"
            />
            <div className="grid p-2">
              <div className="w-[200px] h-[48px] font-medium">{productData.title}</div>
              {discount > 0 ? (
                <div className="pb-1">
                  <div className="flex justify-between">
                    <div className="flex text-red-700 font-bold text-xl">
                      {typeof productData.price === "number"
                        ? (productData.price -
                          productData.price * (discount / 100)).toLocaleString('vi-VN')
                        : ""}
                      <span className="text-sm">₫</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex">
                      <div className="line-through text-gray-400">{productData.price ? productData.price.toLocaleString('vi-VN') : ''}<span className="text-sm">₫</span></div>
                      <div className="text-red-500 font-semibold"> &nbsp; -{discount}%</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-red-700 font-bold text-xl">
                  {productData.price ? productData.price.toLocaleString('vi-VN') : ''}<span className="text-sm">₫</span>
                </div>
              )}
              <button
                onClick={handleBuyNow}
                className={`mx-auto w-full bg-blue-100 text-blue-600 rounded font-semibold pb-[2px] cursor-pointer ${isLocked ? "opacity-50 cursor-not-allowed" : ""
                  }`} // Thêm lớp cho hiệu ứng khóa
                disabled={isLocked} // Vô hiệu hóa nút khi bị khóa
              >
                Mua ngay
              </button>
            </div>
          </div>
        ))}
    </>
  );
};

export default Products;
