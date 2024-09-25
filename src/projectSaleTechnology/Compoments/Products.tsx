import React from "react";
import { useCount } from "../States/useCount";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface TProduct {
  images?: string[];
  label?: string;
  title?: string;
  id?: number;
  price?: number;
  productStart?: number;
  productEnd?: number;
}

const Products = (productsProgs: TProduct) => {
  const { setCount } = useCount();

  const { isPending, error, data } = useQuery({
    queryKey: ["Products"],
    queryFn: () => axios.get("https://api.escuelajs.co/api/v1/products"),
  });

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

  return (
    <>
      {data?.data
        .slice(productsProgs.productStart, productsProgs.productEnd)
        ?.map((productData: TProduct) => (
          <div key={productData.id}>
            <img
              className="w-[236px] h-[240px]  bg-cover bg-center"
              src={
                productData.images && productData.images.length > 0
                  ? (productData.images.length > 1
                      ? productData.images[0]
                      : JSON.parse(productData.images[0]))
                  : "default-image-url" // URL của hình ảnh mặc định nếu không có ảnh
              }
              alt="Product image"
            />
            <div className="p-2 bg-slate-200">
              <div className="w-[200px] h-[48px]">{productData.title}</div>
              {discount > 0 ? (
                <div className="pb-1">
                  <div className="flex justify-between">
                    <div className="flex text-black font-semibold text-xl">
                      {typeof productData.price === "number"
                        ? productData.price -
                          productData.price * (discount / 100)
                        : ""}
                      $
                    </div>
                    <div className="text-red-600 font-semibold text-xl text-right">
                      {productsProgs.label}
                    </div>
                  </div>
                  <div>
                    <div className="flex">
                      <div className="line-through">{productData.price}$</div>
                      <div> &nbsp;-{discount}%</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-black font-semibold text-xl">
                  {productData.price}$
                </div>
              )}
              <div className="flex justify-between">
                <div className="bg-yellow-400 text-black rounded-xl px-2 font-semibold text-xl cursor-pointer">
                  Buy
                </div>
                <button
                  onClick={() => {
                    setCount();
                  }}
                  className="bg-orange-600 text-black rounded-xl px-2 pb-[2px] text-right font-semibold text-xl cursor-pointer"
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default Products;
