import SectionAbout from "./SectionAbout";
import SectionOffice from "./SectionOffice";
import SectionNews from "./SectionNews";
import SectionGallery from "./SectionGallery";
import { MainStore } from "@/store/userStore";
import AboutModal from "./AboutModal";

export default function Main() {
  const { isModalOpen } = MainStore();

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
