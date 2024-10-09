import { create } from "zustand";

// Định nghĩa kiểu dữ liệu của người dùng
interface User {
  id: number;
  username: string;
  password: string;
  orders: any[];
}

// Định nghĩa store Zustand
interface UserState {
  user: User | null; // Lưu thông tin người dùng hoặc null nếu chưa đăng nhập
  setUser: (user: User) => void; // Cập nhật thông tin người dùng
  clearUser: () => void; // Xóa thông tin người dùng khi đăng xuất
}

// Khởi tạo store
export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user: User) => set({ user }), // Lưu thông tin người dùng vào store
  clearUser: () => set({ user: null }), // Xóa thông tin người dùng khi đăng xuất
}));
