import { useState } from "react";
import { IoIosClose } from "react-icons/io";
import { useModalStore } from "./States/useModalStore"; // Import Zustand store
import axios from "axios";
import { useUserStore } from "./States/useUserStore";

interface User {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  id: number;
}

const Login = () => {
  const [username, setUsername] = useState(""); // State cho tên người dùng
  const [password, setPassword] = useState(""); // State cho mật khẩu
  const toggleModal = useModalStore((state) => state.toggleModal); // Đóng modal
  const setIsLogin = useModalStore((state) => state.setIsLogin); // Chuyển qua trang Register
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { setUser } = useUserStore();


  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log("Tên người dùng:", username);
    console.log("Mật khẩu:", password);

    // Kiểm tra xem có trùng username với các tài khoản đã đăng ký chưa
    try {
      const response = await axios.get<User[]>(`http://localhost:3001/users`); // Lấy danh sách người dùng từ API
      let existingUsernames = response.data.map(user => user.username); // Trích xuất danh sách tên người dùng
      let existingPasswords = response.data.map(user => user.password); // Trích xuất danh sách password người dùng

      const users = response.data;

      // Kiểm tra xem người dùng có tồn tại trong API với username và password khớp không
      const user = users.find(
        (user) => user.username === username && user.password === password
      )

      // Kiểm tra username và password có trùng với dữ liệu trong api không
      if (user && existingUsernames.includes(username) && existingPasswords.includes(password)) {
        console.log('Login thành công');
        console.log('user:',user);
        
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          password: "Tài khoản hoặc mật khẩu không hợp lệ."
        }));
        return
      }
    } catch (error) {
      console.error("Lỗi khi gọi api:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-[500px]">
        <div className="bg-blue-900 px-8 relative rounded-tl-lg rounded-tr-lg">
          <button
            onClick={toggleModal} // Đóng modal
            className="top-2 right-2 text-white hover:text-red-500 text-4xl font-bold absolute"
          >
            <IoIosClose />
          </button>
          <h2 className="flex text-white text-2xl font-bold justify-center items-center mb-6 h-16">
            Login
          </h2>
        </div>

        <form className="px-8 pb-2" onSubmit={handleSubmit}>
          {/* Trường tên người dùng */}
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
            {errors.username && <span className="text-red-500 text-sm">{errors.username}</span>}
          </div>

          {/* Trường mật khẩu */}
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
            {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-900 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
          >
            Login
          </button>

          {/* Đoạn text hướng dẫn và link */}
          <div className="my-4 text-center">
            <p className="text-sm text-gray-600">
              Bạn chưa có tài khoản? &nbsp;
              <span
                onClick={() => setIsLogin(false)} // Chuyển sang trang đăng ký
                className="text-blue-900 hover:underline cursor-pointer"
              >
                Đăng ký
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
