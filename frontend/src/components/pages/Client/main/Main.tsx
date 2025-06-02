import { useState } from "react";
import axios from "axios";
import { postUpload } from "../../../../api/postApi";

import SectionAbout from "./SectionAbout";
import SectionOffice from "./SectionOffice";
import SectionNews from "./SectionNews";
import SectionGallery from "./SectionGallery";
import { MainStore } from "@/store/userStore";
import AboutModal from "./AboutModal";

export default function Main() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { isModalOpen } = MainStore();

  // 파일 업로드 되면 상태값으로 저장
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("image", selectedFile); // 'image'는 백엔드에서 받는 key

    try {
      const response = await postUpload(formData);
    } catch (error) {
      console.error("업로드 실패", error);
    }
  };

  return (
    <div>
      {/* <input type="file" accept="image/*" onChange={handleChange} />
        <button onClick={handleSubmit}>업로드</button> */}
      <SectionAbout />
      <SectionOffice />
      <SectionNews />
      <SectionGallery />
      {isModalOpen && <AboutModal />}
    </div>
  );
}
