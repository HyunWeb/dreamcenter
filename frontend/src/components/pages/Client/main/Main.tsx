import SectionAbout from "./SectionAbout";
import SectionOffice from "./SectionOffice";
import SectionNews from "./SectionNews";
import SectionGallery from "./SectionGallery";
import { MainStore, useAlertStore } from "@/store/userStore";
import AboutModal from "./AboutModal";
import { useEffect } from "react";
import SeoHead from "@/components/common/SeoHead";

export default function Main() {
  const { isModalOpen } = MainStore();
  const { showAlert } = useAlertStore();

  return (
    <div>
      <SeoHead
        title="우즈베키스탄 의대 유학 전문 | 드림유학원"
        description="우즈베키스탄 의대 유학, 입시상담, 입학절차를 드림유학원에서 안내해드립니다. 우즈벡 의대 유학 상담부터 현지 정착까지 함께합니다."
        path="/"
      />
      <SectionAbout />
      <SectionOffice />
      <SectionNews />
      <SectionGallery />
      {isModalOpen && <AboutModal />}
    </div>
  );
}
