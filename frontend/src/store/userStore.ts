import { MainDataProps, QuestionData } from "@/types/forms";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type UserState = {
  isLogin: boolean;
  userName: string;
  role: string;
  user_id: string;
  isLoginChecked: boolean;
  setIsLoginChecked: (state: boolean) => void;
  setIsLogin: (state: boolean) => void;
  setUserName: (name: string) => void;
  setRole: (name: string) => void;
  setUser_id: (user_id: string) => void;
};

export const useUserStore = create<UserState>((set) => ({
  isLogin: false,
  userName: "",
  role: "",
  user_id: "",
  isLoginChecked: false,
  setIsLoginChecked: (val: boolean) => set({ isLoginChecked: val }),
  setIsLogin: (state) => set({ isLogin: state }),
  setUserName: (name) => set({ userName: name }),
  setRole: (role) => set({ role: role }),
  setUser_id: (id) => set({ user_id: id }),
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

interface UseModalStoreProps {
  isMenuOpen: boolean;
  isModalOpen: boolean;
  ImageModal: boolean;
  ImageSrc: string;
  loadingUI: boolean;
  setIsMenuOpen: (state: boolean) => void;
  setIsModalOpen: (state: boolean) => void;
  setImageModal: (state: boolean) => void;
  setImageSrc: (state: string) => void;
  setLoadingUI: (state: boolean) => void;
}
export const UseModalStore = create<UseModalStoreProps>((set) => ({
  isMenuOpen: false,
  isModalOpen: false,
  ImageModal: false,
  ImageSrc: "",
  loadingUI: false,
  setIsMenuOpen: (state: boolean) => set({ isMenuOpen: state }),
  setIsModalOpen: (state: boolean) => set({ isModalOpen: state }),
  setImageModal: (state: boolean) => set({ ImageModal: state }),
  setImageSrc: (state: string) => set({ ImageSrc: state }),
  setLoadingUI: (state: boolean) => set({ loadingUI: state }),
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

interface ReservationMyListStoreProps {
  checkedList: boolean[];
  pageCount: number[];
  currentPage: number;
  viewMode: [string, number];
  setCheckedList: (state: boolean[]) => void;
  setPageCount: (num: number[]) => void;
  setCurrentPage: (num: number) => void;
  setViewMode: (state: [string, number]) => void;
}
export const ReservationMyListStore = create<ReservationMyListStoreProps>(
  (set) => ({
    checkedList: [],
    pageCount: [],
    currentPage: 1,
    viewMode: ["list", 0],
    setCheckedList: (state: boolean[]) => set({ checkedList: state }),
    setPageCount: (num: number[]) => set({ pageCount: num }),
    setCurrentPage: (num: number) => set({ currentPage: num }),
    setViewMode: (state: [string, number]) => set({ viewMode: state }),
  })
);

interface QuestionWritePageProps {
  changeName: boolean;
  title: string;
  message: string;
  privateChecked: boolean;
  privatePassword: string | null;
  setChangeName: (state: boolean) => void;
  setTitle: (state: string) => void;
  setMessage: (state: string) => void;
  setPrivateChecked: (state: boolean) => void;
  setPrivatePassword: (state: string | null) => void;
  resetForm: () => void;
}

export const QuestionWritePageStore = create<QuestionWritePageProps>((set) => ({
  changeName: true,
  title: "",
  message: "",
  privateChecked: false,
  privatePassword: null,
  setChangeName: (state) => set({ changeName: state }),
  setTitle: (state) => set({ title: state }),
  setMessage: (state) => set({ message: state }),
  setPrivateChecked: (state) => set({ privateChecked: state }),
  setPrivatePassword: (state) => set({ privatePassword: state }),
  resetForm: () =>
    set({
      title: "",
      message: "",
      privateChecked: false,
      privatePassword: null,
      changeName: true,
    }),
}));

interface ControlModalProps {
  viewModal: boolean;
  postId: number | null;
  type: string;
  setViewModal: (state: boolean) => void;
  setPostId: (state: number) => void;
  setType: (state: string) => void;
}
export const ControlModalStore = create<ControlModalProps>((set) => ({
  viewModal: false,
  postId: null,
  type: "",
  setViewModal: (state) => set({ viewModal: state }),
  setPostId: (state) => set({ postId: state }),
  setType: (state) => set({ type: state }),
}));

interface SearchProps {
  searchList: boolean;
  searchData: QuestionData[];
  setSearchList: (state: boolean) => void;
  setSearchData: (state: QuestionData[]) => void;
}

export const SearchStore = create<SearchProps>((set) => ({
  searchList: false,
  searchData: [],
  setSearchList: (state) => set({ searchList: state }),
  setSearchData: (state) => set({ searchData: state }),
}));

interface MainProps {
  title1: string;
  title2: string;
  message: string;
  isModalOpen: boolean;
  file: FileItem[];
  MainAbout: MainDataProps;
  setTitle1: (state: string) => void;
  setTitle2: (state: string) => void;
  setMessage: (state: string) => void;
  setIsModalOpen: (state: boolean) => void;
  setFiles: (value: FileItem[] | ((prev: FileItem[]) => FileItem[])) => void;
  setMainAbout: (state: MainDataProps) => void;
}

export const MainStore = create<MainProps>((set) => ({
  title1: "",
  title2: "",
  message: "",
  isModalOpen: false,
  file: [],
  MainAbout: {
    id: 1,
    title_main: "",
    title_sub: "",
    content: "",
    image_url: "",
  },
  setTitle1: (state: string) => set({ title1: state }),
  setTitle2: (state: string) => set({ title2: state }),
  setMessage: (state: string) => set({ message: state }),
  setIsModalOpen: (state: boolean) => set({ isModalOpen: state }),
  setFiles: (updater) =>
    set((state) => ({
      file:
        typeof updater === "function"
          ? (updater as (prev: FileItem[]) => FileItem[])(state.file)
          : updater,
    })),
  setMainAbout: (state: MainDataProps) => set({ MainAbout: state }),
}));

interface useAlertProps {
  message: string;
  isVisible: boolean;
  timeId: ReturnType<typeof setTimeout> | null;
  setIsVisible: (state: boolean) => void;
  showAlert: (msg: string) => void;
  hideAlert: () => void;
}

export const useAlertStore = create<useAlertProps>((set, get) => ({
  message: "",
  isVisible: false,
  timeId: null,
  setIsVisible: (state) => set({ isVisible: state }),

  hideAlert: () => {
    const currentId = get().timeId;
    if (currentId) clearTimeout(currentId);
    set({ isVisible: false, timeId: null });
  },

  showAlert: (msg: string) => {
    const currentId = get().timeId;
    if (currentId) clearTimeout(currentId); // 이전 타이머 제거

    set({ message: msg, isVisible: true });

    const timeout = setTimeout(() => {
      set({ isVisible: false, timeId: null });
    }, 3000);

    set({ timeId: timeout });
  },
}));

interface MapProps {
  isModalOpen: boolean;
  setIsModalOpen: (state: boolean) => void;
  address: string;
  setAddress: (state: string) => void;
  editAdress: string;
  setEditAdress: (state: string) => void;
  phone1: string;
  setPhone1: (state: string) => void;
  editphone1: string;
  setEditPhone1: (state: string) => void;
  phone2: string;
  setPhone2: (state: string) => void;
  editphone2: string;
  setEditPhone2: (state: string) => void;
  OPDays: string;
  setOPDays: (state: string) => void;
  editOPDays: string;
  setEditOPDays: (state: string) => void;
  startTime: string;
  setStartTime: (state: string) => void;
  editstartTime: string;
  setEditStartTime: (state: string) => void;
  endTime: string;
  setEndTime: (state: string) => void;
  editendTime: string;
  setEditEndTime: (state: string) => void;
}

export const MapStore = create<MapProps>((set, get) => ({
  isModalOpen: false,
  setIsModalOpen: (state) => set({ isModalOpen: state }),
  address: "대구 광역시 수성구 화랑로 8길 11-13 성화빌딩 2층",
  setAddress: (state) => set({ address: state }),
  editAdress: "",
  setEditAdress: (state) => set({ editAdress: state }),
  phone1: "",
  setPhone1: (state) => set({ phone1: state }),
  editphone1: "",
  setEditPhone1: (state) => set({ editphone1: state }),
  phone2: "",
  setPhone2: (state) => set({ phone2: state }),
  editphone2: "",
  setEditPhone2: (state) => set({ editphone2: state }),
  OPDays: "",
  setOPDays: (state) => set({ OPDays: state }),
  editOPDays: "",
  setEditOPDays: (state) => set({ editOPDays: state }),
  startTime: "",
  setStartTime: (state) => set({ startTime: state }),
  editstartTime: "",
  setEditStartTime: (state) => set({ editstartTime: state }),
  endTime: "",
  setEndTime: (state) => set({ endTime: state }),
  editendTime: "",
  setEditEndTime: (state) => set({ editendTime: state }),
}));

interface FooterProps {
  isModalOpen: boolean;
  setIsModalOpen: (state: boolean) => void;
  description: string;
  setDescription: (state: string) => void;
  footerTitle: string;
  setFooterTitle: (state: string) => void;
  viewTitle: string;
  setViewTitle: (state: string) => void;
  viewDescription: string;
  setViewDescription: (state: string) => void;
}

export const FooterStore = create<FooterProps>((set, get) => ({
  isModalOpen: false,
  setIsModalOpen: (state) => set({ isModalOpen: state }),
  description: "",
  setDescription: (state) => set({ description: state }),
  footerTitle: "",
  setFooterTitle: (state) => set({ footerTitle: state }),
  viewTitle: "",
  setViewTitle: (state) => set({ viewTitle: state }),
  viewDescription: "",
  setViewDescription: (state) => set({ viewDescription: state }),
}));
