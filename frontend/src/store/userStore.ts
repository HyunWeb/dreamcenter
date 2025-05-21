import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type UserState = {
  isLogin: boolean;
  userName: string;
  setIsLogin: (state: boolean) => void;
  setUserName: (name: string) => void;
};

export const useUserStore = create<UserState>((set) => ({
  isLogin: false,
  userName: "",
  setIsLogin: (state) => set({ isLogin: state }),
  setUserName: (name) => set({ userName: name }),
}));

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

type FileItem = {
  id: string;
  file: File;
};

interface ReservationInputProps {
  selectedDate: Date | null;
  file: FileItem[];
  userId: string;
  name: string;
  phone: string;
  date: string;
  time: string;
  age: string;
  school: string;
  admission: string;
  recommender: string;
  message: string;
  agreePrivacy: boolean;
  setSelectedDate: (date: Date | null) => void;
  setFiles: (value: FileItem[] | ((prev: FileItem[]) => FileItem[])) => void;
  setUserId: (Id: string) => void;
  setName: (name: string) => void;
  setPhone: (PhoneNum: string) => void;
  setDate: (date: string) => void;
  setTime: (time: string) => void;
  setAge: (num: string) => void;
  setSchool: (school: string) => void;
  setAdmission: (admission: string) => void;
  setRecommender: (recommender: string) => void;
  setMessage: (message: string) => void;
  setAgreePrivacy: (agreePrivacy: boolean) => void;
  resetForm: () => void;
}

export const ReservationInputStore = create<ReservationInputProps>((set) => ({
  selectedDate: null,
  file: [],
  userId: "",
  name: "",
  phone: "",
  date: "",
  time: "",
  age: "",
  school: "",
  admission: "",
  recommender: "",
  message: "",
  agreePrivacy: false,
  setSelectedDate: (date: Date | null) => set({ selectedDate: date }),
  setFiles: (updater) =>
    set((state) => ({
      file:
        typeof updater === "function"
          ? (updater as (prev: FileItem[]) => FileItem[])(state.file)
          : updater,
    })),
  setUserId: (Id: string) => set({ userId: Id }),
  setName: (name: string) => set({ name: name }),
  setPhone: (PhoneNum: string) => set({ phone: PhoneNum }),
  setDate: (date: string) => set({ date: date }),
  setTime: (time: string) => set({ time: time }),
  setAge: (num: string) => set({ age: num }),
  setSchool: (school: string) => set({ school: school }),
  setAdmission: (admission: string) => set({ admission: admission }),
  setRecommender: (recommender: string) => set({ recommender: recommender }),
  setMessage: (message: string) => set({ message: message }),
  setAgreePrivacy: (agreePrivacy: boolean) =>
    set({ agreePrivacy: agreePrivacy }),
  resetForm: () => {
    set({
      name: "",
      phone: "",
      date: "",
      selectedDate: null,
      time: "",
      age: "",
      school: "",
      admission: "",
      recommender: "",
      message: "",
      agreePrivacy: false,
      file: [],
    });
  },
}));
