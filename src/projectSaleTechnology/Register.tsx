import { useState } from "react";
import { IoIosClose } from "react-icons/io";
import { useModalStore } from "./States/useModalStore"; // Import Zustand store

const Register = ({ onCloseRegister }: { onCloseRegister: () => void }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const toggleModal = useModalStore((state) => state.toggleModal); // Đóng modal
  const setIsLogin = useModalStore((state) => state.setIsLogin); // Chuyển qua trang Login

  const handleSubmit = (e: any) => {
    e.preventDefault();

    // Kiểm tra xem mật khẩu và nhập lại mật khẩu có khớp không
    if (password !== confirmPassword) {
      console.error("Mật khẩu không khớp!");
      return;
    }

    // Xử lý logic đăng ký tại đây
    console.log("Tên người dùng:", username);
    console.log("Email:", email);
    console.log("Mật khẩu:", password);
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50 mt-14">
      <div className="bg-white rounded-lg shadow-lg w-[500px]">
        <div className="bg-blue-900 px-8 relative rounded-tl-lg rounded-tr-lg">
          <button
            onClick={toggleModal} // Đóng modal
            className="top-2 right-2 text-white hover:text-red-500 text-4xl font-bold absolute"
          >
            <IoIosClose />
          </button>
          <h2 className="flex text-white text-2xl font-bold justify-center items-center mb-6 h-16">
            Register
          </h2>
        </div>

        <form className="px-8 pb-2" onSubmit={handleSubmit}>
          {/* Tên người dùng */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Tên người dùng
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-900"
              placeholder="Nhập tên người dùng"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-900"
              placeholder="Nhập email của bạn"
              required
            />
          </div>

          {/* Mật khẩu */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Mật khẩu
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-900"
              placeholder="Nhập mật khẩu"
              required
            />
          </div>

          {/* Nhập lại mật khẩu */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
              Nhập lại mật khẩu
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-900"
              placeholder="Nhập lại mật khẩu"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-900 text-white py-2 rounded-lg"
          >
            Register
          </button>

          <div className="my-4 text-center">
            <p className="text-sm text-gray-600">
              Bạn đã có tài khoản? &nbsp;
              <span
                onClick={() => setIsLogin(true)} // Chuyển sang trang đăng nhập
                className="text-blue-900 hover:underline cursor-pointer"
              >
                Đăng nhập
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
