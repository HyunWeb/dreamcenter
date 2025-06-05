import SectionAbout from "./SectionAbout";
import SectionOffice from "./SectionOffice";
import SectionNews from "./SectionNews";
import SectionGallery from "./SectionGallery";
import { MainStore, useAlertStore } from "@/store/userStore";
import AboutModal from "./AboutModal";
import { useEffect } from "react";

export default function Main() {
  const { isModalOpen } = MainStore();
  const { showAlert } = useAlertStore();

  return (
    <div>
      <SectionAbout />
      <SectionOffice />
      <SectionNews />
      <SectionGallery />
      {isModalOpen && <AboutModal />}
    </div>
  );
}
