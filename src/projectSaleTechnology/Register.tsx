import { useState } from "react";
import { IoIosClose } from "react-icons/io";
import { useModalStore } from "./States/useModalStore"; // Import Zustand store
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { CiCircleCheck } from "react-icons/ci";

interface User {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  id: number;
}

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [registerSuccess, setRegisterSuccess] = useState(false); // State cho mật khẩu


  const toggleModal = useModalStore((state) => state.toggleModal); // Đóng modal
  const setIsLogin = useModalStore((state) => state.setIsLogin); // Chuyển qua trang Login

  // Kiểm tra điều kiện của các trường
  const validateUsername = (username: string) => {
    const regexUserName = /^[a-zA-Z0-9]{6,}$/; // Định dạng tên người dùng
    if (!regexUserName.test(username)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        username: "Tên người dùng phải có ít nhất 6 ký tự và không chứa ký tự đặc biệt.",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, username: "" }));
    }
  };

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Định dạng email
    if (!regex.test(email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Email không hợp lệ.",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
    }
  };

  const validatePassword = (password: string) => {
    if (password.length < 8) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Mật khẩu phải có ít nhất 8 ký tự.",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, password: "" }));
    }
  };

  const validateConfirmPassword = (confirmPassword: string) => {
    if (confirmPassword !== password) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "Mật khẩu nhập lại không khớp.",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: "" }));
    }
  };

  // Submit form Register
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Kiểm tra xem có trùng username với các tài khoản đã đăng ký chưa
    try {
      const response = await axios.get<User[]>(`http://localhost:3001/users`); // Lấy danh sách người dùng từ API
      let existingUsernames = response.data.map(user => user.username); // Trích xuất danh sách tên người dùng
      let existingEmails = response.data.map(user => user.email); // Trích xuất danh sách email người dùng

      // Kiểm tra xem có trùng username với các tài khoản đã đăng ký chưa
      if (existingUsernames.includes(username)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          username: "Tên người dùng đã tồn tại."
        }));
        return
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, username: "" })); // Nếu không có lỗi
      }

      // Kiểm tra xem có trùng email với các tài khoản đã đăng ký chưa
      if (existingEmails.includes(email)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "Email đã tồn tại."
        }));
        return
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, email: "" })); // Nếu không có lỗi
      }
    } catch (error) {
      console.error("Lỗi khi gọi api:", error);
    }

    console.log("Tên người dùng:", username);
    console.log("Email:", email);
    console.log("Mật khẩu:", password);

    const response = await axios.get<User[]>(`http://localhost:3001/users`)
    let latestId = Math.max(...response.data.map(user => user.id)); // Lấy id mới nhất

    mutationCreate.mutate({
      username: username,
      email: email,
      password: password,
      order: [],
      id: latestId + 1
    });
  };

  const mutationCreate = useMutation({
    mutationFn: (userData: {
      username: string;
      email: string;
      password: string;
      order: [];
      id: number
    }) => axios.post("http://localhost:3001/users", userData),
    onSuccess: () => {
      setRegisterSuccess(true);
      setTimeout(() => {
        setRegisterSuccess(false);
        setIsLogin(true)
      }, 2000)
    }
  });

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
              onInput={(e) => validateUsername((e.target as HTMLInputElement).value)}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-900"
              placeholder="Nhập tên người dùng"
              required
            />
            {errors.username && <span className="text-red-500 text-sm">{errors.username}</span>}
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
              onInput={(e) => validateEmail((e.target as HTMLInputElement).value)}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-900"
              placeholder="Nhập email của bạn"
              required
            />
            {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
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
              onInput={(e) => validatePassword((e.target as HTMLInputElement).value)}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-900"
              placeholder="Nhập mật khẩu"
              required
            />
            {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
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
              onInput={(e) => validateConfirmPassword((e.target as HTMLInputElement).value)}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-900"
              placeholder="Nhập lại mật khẩu"
              required
            />
            {errors.confirmPassword && <span className="text-red-500 text-sm">{errors.confirmPassword}</span>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-900 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
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
      {registerSuccess && (<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10">
          <div className="bg-white p-[40px] rounded"><CiCircleCheck className="text-green-500 text-4xl mx-auto mb-2"/> Đăng ký thành công</div>
        </div>)}
    </div>
  );
};

export default Register;
