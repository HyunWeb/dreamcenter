import React, { useEffect } from "react";
import styled from "styled-components";
import Button from "../../../../common/Button";
import {
  EditAboutImges,
  EditGalleryImges,
  EditOfficeImges,
  PostAboutImages,
  PostGalleryImages,
  PostOfficeImages,
} from "../../../../../api/postApi";
import {
  ReservationMyListStore,
  useAlertStore,
  UseModalStore,
} from "@/store/userStore";
import { useLocation } from "react-router-dom";
import { GallerySlide } from "@/types/forms";

interface EditAboutImgesProps {
  image_url: string;
  name: string;
  sort_order: number;
}

const StyledButton = styled(Button)`
  padding: 12px 45px;
  box-sizing: border-box;
  border-radius: 8px;
`;

const ButtonWrap = styled.div`
  display: flex;
  gap: 24px;
  justify-content: center;
  margin-top: 60px;
  @media (max-width: 1024px) {
    margin-top: 20px;
  }
`;
type Slide = {
  created_at: string;
  id: number;
  name: string;
  image_url: string;
  sort_order: number;
};
type FileItem = {
  id: string;
  file: File;
};
interface SwitchButtonsProps {
  selectTab: boolean;
  existingImages: Slide[];
  files: FileItem[];
  setFiles: React.Dispatch<React.SetStateAction<FileItem[]>>;
}
export default function SwichButtons({
  selectTab,
  existingImages,
  files,
  setFiles,
}: SwitchButtonsProps) {
  const { showAlert } = useAlertStore();
  const { setIsModalOpen, setLoadingUI } = UseModalStore();
  const CloseModal = () => {
    setIsModalOpen(false);
  };
  const location = useLocation();

  const handleSubmit = async () => {
    setLoadingUI(true);
    const formData = new FormData();

    files.forEach((item) => {
      formData.append("images", item.file);
    });

    if (location.pathname.includes("/about")) {
      await PostAboutImages(formData);
    } else if (location.pathname.includes("/office")) {
      await PostOfficeImages(formData);
    } else if (location.pathname.includes("/gallery")) {
      await PostGalleryImages(formData);
    }
    setLoadingUI(false);
    showAlert("이미지 업로드가 완료되었습니다.");
    setFiles([]);
    setIsModalOpen(false);
  };

  const handleEdit = async () => {
    setLoadingUI(true);
    let newArray;
    if (location.pathname.includes("/gallery")) {
      newArray = existingImages.map((item, index) => ({
        image_url: item.image_url,
        name: item.name,
      }));
    } else {
      newArray = existingImages.map((item, index) => ({
        image_url: item.image_url,
        name: item.name,
        sort_order: index,
      }));
    }
    let res;
    if (location.pathname.includes("/about")) {
      await EditAboutImges(newArray as EditAboutImgesProps[]);
    } else if (location.pathname.includes("/office")) {
      await EditOfficeImges(newArray as EditAboutImgesProps[]);
    } else if (location.pathname.includes("/gallery")) {
      res = await EditGalleryImges(newArray as GallerySlide[]);
    }
    setLoadingUI(false);
    showAlert("수정이 완료되었습니다.");
    setIsModalOpen(false);
  };
  return (
    <ButtonWrap>
      <StyledButton
        name="취소"
        Bgcolor="grey"
        TitleColor="darkGrey"
        onClick={CloseModal}
      />
      {selectTab ? (
        <StyledButton
          name="등록"
          Bgcolor="green"
          TitleColor="white"
          onClick={handleSubmit}
        />
      ) : (
        <StyledButton
          name="수정"
          Bgcolor="green"
          TitleColor="white"
          onClick={handleEdit}
        />
      )}
    </ButtonWrap>
  );
}
