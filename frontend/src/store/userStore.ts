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
  imgLength: number;
  setImagePreview: (url: string) => void;
  setIndex: (index: number) => void;
  setImgList: (slide: Slide[]) => void;
  setBtnDirection: (dir: string) => void;
  setImgLength: (num: number) => void;
}
export const ImgPreviewStore = create<ImgPreviewProps>((set) => ({
  imgPreview: "",
  index: 0,
  imgList: [],
  BtnDirection: "",
  imgLength: 0,
  setImagePreview: (url: string) => set({ imgPreview: url }),
  setIndex: (index: number) => set({ index: index }),
  setImgList: (slide: Slide[]) => set({ imgList: slide }),
  setBtnDirection: (dir: string) => set({ BtnDirection: dir }),
  setImgLength: (num: number) => set({ imgLength: num }),
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

interface AboutAndOfficeStoreProps {
  isModalOpen: boolean;
  setIsModalOpen: (state: boolean) => void;
}
export const AboutAndOfficeStore = create<AboutAndOfficeStoreProps>((set) => ({
  isModalOpen: false,
  setIsModalOpen: (state: boolean) => set({ isModalOpen: state }),
}));

interface ReservationInputProps {
  selectedDate: Date | null;
  file: FileItem[];
  setSelectedDate: (date: Date | null) => void;
  setFiles: (value: FileItem[] | ((prev: FileItem[]) => FileItem[])) => void;
}

type FileItem = {
  id: string;
  file: File;
};

export const ReservationInputStore = create<ReservationInputProps>((set) => ({
  selectedDate: null,
  file: [],
  setSelectedDate: (date: Date | null) => set({ selectedDate: date }),
  setFiles: (updater) =>
    set((state) => ({
      file:
        typeof updater === "function"
          ? (updater as (prev: FileItem[]) => FileItem[])(state.file)
          : updater,
    })),
}));
