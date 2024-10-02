import { create } from "zustand";

interface ModalState {
  isRegister: boolean;
  setIsRegister: () => void;
  isLogin: boolean;
  setIsLogin: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isRegister: false,
  isLogin: false,
  setIsRegister: () => set((state) => ({ isRegister: !state.isRegister })),
  setIsLogin: () => set((state) => ({ isLogin: !state.isLogin })),
}));