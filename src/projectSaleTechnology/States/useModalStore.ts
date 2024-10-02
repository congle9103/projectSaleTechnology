import { create } from "zustand";

// Store quản lý trạng thái mở/đóng modal
interface ModalState {
  isModalOpen: boolean;
  toggleModal: () => void;
  isLogin: boolean;
  setIsLogin: (isLogin: boolean) => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isModalOpen: false, // Trạng thái mặc định là đóng
  isLogin: true, // Mặc định là trang Login
  toggleModal: () => set((state) => ({ isModalOpen: !state.isModalOpen })),
  setIsLogin: (isLogin: boolean) => set({ isLogin: isLogin }), // Cập nhật trang Login hoặc Register
}));