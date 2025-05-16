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

type Slide = {
  created_at: string;
  id: number;
  name: string;
  image_url: string;
  sort_order: number;
};
interface ImgPreviewProps {
  imgPreview: string;
  index: number;
  imgList: Slide[];
  BtnDirection: string;
  setImagePreview: (url: string) => void;
  setIndex: (index: number) => void;
  setImgList: (slide: Slide[]) => void;
  setBtnDirection: (dir: string) => void;
}
export const ImgPreviewStore = create<ImgPreviewProps>((set) => ({
  imgPreview: "",
  index: 0,
  imgList: [],
  BtnDirection: "",
  setImagePreview: (url: string) => set({ imgPreview: url }),
  setIndex: (index: number) => set({ index: index }),
  setImgList: (slide: Slide[]) => set({ imgList: slide }),
  setBtnDirection: (dir: string) => set({ BtnDirection: dir }),
}));

interface WriteAboutStoreProps {
  content: string;
  aboutTextData: string;
  editSection: boolean;
  setContent: (text: string) => void;
  setAboutTextData: (text: string) => void;
  setEditSection: (state: boolean) => void;
}
export const WriteAboutStore = create<WriteAboutStoreProps>((set) => ({
  content: "",
  aboutTextData: "",
  editSection: true,
  setContent: (text: string) => set({ content: text }),
  setAboutTextData: (text: string) => set({ aboutTextData: text }),
  setEditSection: (state: boolean) => set({ editSection: state }),
}));
