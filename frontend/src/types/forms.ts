import { SetStateAction } from "react";

type FileItem = {
  id: string;
  file: File;
};

export interface CommonData {
  id: number;
  sns_id: string;
  message: string;
  is_confirmed: boolean;
  file: string | string[]; // 나중에 파싱 필요
  createdAt: string;
  updatedAt: string;
}
export interface FormData extends CommonData {
  userId: string;
  name: string;
  phone: string;
  date: string;
  time: string;
  age: string;
  school: string;
  admission: string;
  recommender: string;
  agreePrivacy: boolean;
  file: string; // stringified array
}

export interface QuestionData extends CommonData {
  title: string;
  nickname: string;
  isPrivate: boolean;
  privatePWD: string | null;
  file: string[]; // 실제 배열
}
export interface TableFormProps<T> {
  headers?: string[];
  form: T[];
  setForm?: React.Dispatch<SetStateAction<T[]>>;
  type?: string;
  children?: React.ReactNode;
}
export interface FormDataTableFormProps {
  headers?: string[];
  form: FormData[];
  setForm?: React.Dispatch<SetStateAction<FormData[]>>;
  type?: string;
  children?: React.ReactNode;
}

export interface AnswerData {
  id: number;
  question_id: number;
  content: string;
  createdAt: string; // 또는 Date
  updatedAt: string; // 또는 Date
}

export interface GallerySlide {
  id: number;
  name: string;
  image_url: string;
  created_at: string;
}

export type MainDataProps = {
  id: number;
  title_main: string;
  title_sub: string;
  content: string;
  image_url: string;
};

export type ImageItem = {
  id: number;
  name: string;
  image_url: string;
  sort_order: number;
  created_at: string; // ISO 날짜 문자열 (예: "2025-05-17T16:01:50.000Z")
};

export type NewsItem = {
  title: string;
  description: string;
  date: string; // 예: "2025.05.01.23:25"
  img: string; // 썸네일 이미지 URL
  link: string; // 원문 링크 (네이버 블로그 등)
};
