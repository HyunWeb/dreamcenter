import { SetStateAction } from "react";

type FileItem = {
  id: string;
  file: File;
};

export interface FormData {
  id: number;
  userId: string;
  sns_id: string;
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
  is_confirmed: boolean;
  file: string; // stringified array, parse on use
  createdAt: string;
  updatedAt: string;
}
export interface TableFormProps {
  form: FormData[];
  setForm: React.Dispatch<SetStateAction<FormData[]>>;
  type?: string;
}
