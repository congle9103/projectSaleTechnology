import React from "react";
import { Link } from "react-router-dom";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Pagination } from "antd";
import { FaArrowLeft } from "react-icons/fa";

interface TProductData {
  id: number;
  price: number;
  images: string[];
  image: string;
  title: string;
  description: string;
}

const ProductsManager = () => {
  const navigate = useNavigate();
  const [param] = useSearchParams();
  const page_str = param.get("page");
  const page = page_str ? parseInt(page_str) : 1;
  const limit = 12;
  const offset = (page - 1) * limit;

  const queryClient = useQueryClient();
  const [isShowEdit, setIsShowEdit] = React.useState(false);
  const [editTitle, setEditTitle] = React.useState("");
  const [editPrice, setEditPrice] = React.useState<number>(0);
  const [editId, setEditId] = React.useState<number>(0);
  const [showMessageSuccess, setShowMessageSuccess] = React.useState(false);
  const [showMessageError, setShowMessageError] = React.useState(false);

  const mutationCreate = useMutation({
    mutationFn: (productData: {
      price: number;
      description: string;
      categoryId: number;
      images: string[];
      title: string;
    }) => axios.post("https://api.escuelajs.co/api/v1/products/", productData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Products"] });
      formRef.current?.reset()
      setShowMessageSuccess(true);
      setTimeout(() => {
        setShowMessageSuccess(false);
      }, 2000);
    },
    onError: () => {
      setShowMessageError(true);
      setTimeout(() => {
        setShowMessageError(false);
      }, 2000);
    },
  });

  const mutationDelete = useMutation({
    mutationFn: (id: number) =>
      axios.delete(`https://api.escuelajs.co/api/v1/products/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Products"] });
      setShowMessageSuccess(true);
      setTimeout(() => {
        setShowMessageSuccess(false);
      }, 2000);
    },
    onError: () => {
      setShowMessageError(true);
      setTimeout(() => {
        setShowMessageError(false);
      }, 2000);
    },
  });

  const mutationUpdate = useMutation({
    mutationFn: (productDatas: { title: string; price: number }) =>
      axios.put(
        `https://api.escuelajs.co/api/v1/products/${editId}`,
        productDatas
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Products"] });
      setShowMessageSuccess(true);
      setTimeout(() => {
        setShowMessageSuccess(false);
      }, 2000);
    },
    onError: () => {
      setShowMessageError(true);
      setTimeout(() => {
        setShowMessageError(false);
      }, 2000);
    },
  });

  const formRef = React.useRef<HTMLFormElement>(null)

  const handleSubmit = (e:any) => {
    e.preventDefault();
    const productImage = e.target.elements.productImage.value
    const productTitle = e.target.elements.productTitle.value;
    const productDescription = e.target.elements.productDescription.value;
    const productPrice = e.target.elements.productPrice.value;
    const categoryId = e.target.elements.categoryId.value;

    mutationCreate.mutate({
      images: [productImage],
      title: productTitle,
      description: productDescription,
      price: productPrice,
      categoryId: categoryId,
    });
  };

  const { isLoading, error, data } = useQuery({
    queryKey: ["Products", page],
    queryFn: () =>
      axios.get(
        `http://localhost:4000/saleTechnology?offset=${offset}&limit=12`
      ),
  });

  if (isLoading)
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
  if (error) return <div>{error.message}</div>;
  console.log("productData:", data?.data);

  const discount = 50;

  return (
    <div className="grid justify-center bg-white">
      <div className="flex justify-between">
        <form ref={formRef}
          className="grid mt-4 gap-y-2"
          onSubmit={handleSubmit}
          action=""
        >
          <input
            type="text"
            name="productImage"
            placeholder="Image"
            className="pl-[24px] border-black border-solid border-[1px]"
          />
          <input
            type="text"
            name="productTitle"
            placeholder="Title"
            className="pl-[24px] border-black border-solid border-[1px]"
          />
          <input
            type="text"
            name="productDescription"
            placeholder="Description"
            className="pl-[24px] border-black border-solid border-[1px]"
          />
          <input
            type="text"
            name="productPrice"
            placeholder="Price"
            className="pl-[24px] border-black border-solid border-[1px]"
          />
          <input
            type="text"
            name="categoryId"
            placeholder="Category id"
            className="pl-[24px] border-black border-solid border-[1px]"
          />
          <button
            type="submit"
            className=" border-black border-solid border-[1px] w-[150px]"
          >
            Tạo sản phẩm
          </button>
        </form>
        <div className="flex items-end font-semibold text-blue-900">
          <Link className="flex" to={"/"}>
            {" "}
            Về trang chủ&nbsp; <FaArrowLeft className="mt-1" />
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-2 w-[1200px] mt-[30px]">
        {data?.data.map((productData: TProductData) => (
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
              <div className="flex">
                <button
                  type="button"
                  onClick={() => {
                    setIsShowEdit(true);
                    setEditTitle(productData.title);
                    setEditPrice(productData.price);
                    setEditId(productData.id);
                  }}
                  className="border-black border-solid border-[1px] w-[100px] rounded mr-4"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    mutationDelete.mutate(productData.id);
                  }}
                  className="border-black border-solid border-[1px] w-[100px] rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isShowEdit && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
          <div className="grid gap-2 p-4 bg-white rounded">
            <div className="flex justify-between mb-[8px]">
              <h2 className="text-xl mb-2">Edit product</h2>
              <button
                onClick={() => setIsShowEdit(false)}
                className="bg-red-500 text-white px-4 rounded"
              >
                X
              </button>
            </div>
            <div className="flex justify-between">
              <div className="w-[50px]">Price:</div>
              <input
                className="border-black border-solid pl-2 border-[1px]"
                type="text"
                value={editPrice}
                onChange={(e) => setEditPrice(Number(e.target.value))}
              />
            </div>
            <div className="flex justify-between">
              <div className="w-[50px]">Title:</div>
              <input
                className="border-black border-solid pl-2 border-[1px]"
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
            </div>
            <button
              onClick={() => {
                mutationUpdate.mutate({
                  title: editTitle,
                  price: editPrice,
                });
                setIsShowEdit(false);
              }}
              className="bg-green-500 text-white px-4 rounded mt-2 w-[80px] ml-[360px]"
            >
              Save
            </button>
          </div>
        </div>
      )}

      {mutationCreate.isPending && (
        <div className="fixed inset-0 flex items-center justify-center  bg-black bg-opacity-10">
          <div className="bg-white p-[50px] rounded">Đang tạo sản phẩm...</div>
        </div>
      )}
      {showMessageSuccess && mutationCreate.isSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10">
          <div className="bg-white p-[50px] rounded">
            Tạo sản phẩm thành công
          </div>
        </div>
      )}
      {mutationDelete.isPending && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10">
          <div className="bg-white p-[50px] rounded">Đang xóa sản phẩm...</div>
        </div>
      )}
      {showMessageSuccess && mutationDelete.isSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10">
          <div className="bg-white p-[50px] rounded">
            Xóa sản phẩm thành công
          </div>
        </div>
      )}
      {mutationUpdate.isPending && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10">
          <div className="bg-white p-[50px] rounded">Đang sửa sản phẩm...</div>
        </div>
      )}
      {showMessageSuccess && mutationUpdate.isSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10">
          <div className="bg-white p-[50px] rounded">
            Sửa sản phẩm thành công
          </div>
        </div>
      )}

      {showMessageError && mutationCreate.isError && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10">
          <div className="bg-white p-[50px] rounded">Tạo sản phẩm thất bại</div>
        </div>
      )}
      {showMessageError && mutationDelete.isError && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10">
          <div className="bg-white p-[50px] rounded">Xóa sản phẩm thất bại</div>
        </div>
      )}
      {showMessageError && mutationUpdate.isError && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10">
          <div className="bg-white p-[50px] rounded">Sửa sản phẩm thất bại</div>
        </div>
      )}

      <Pagination
        className="my-5 text-center text-white"
        onChange={(page) => {
          navigate(`?page=${page}`);
        }}
        current={page}
        defaultCurrent={1}
        showSizeChanger={false}
        total={100}
      />
    </div>
  );
};

export default ProductsManager;
