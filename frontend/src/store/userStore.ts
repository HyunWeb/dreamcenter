import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type UserState = {
  name: string;
  isLogin: boolean;
  setLogin: (name: string) => void;
  setLogout: () => void;
};

export const useUserStore = create(
  persist<UserState>(
    (set) => ({
      name: "",
      isLogin: false,
      setLogin: (name) => set({ name, isLogin: true }),
      setLogout: () => set({ name: "", isLogin: false }),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
