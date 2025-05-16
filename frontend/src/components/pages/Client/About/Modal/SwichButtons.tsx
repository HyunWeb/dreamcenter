import React from "react";
import styled from "styled-components";
import Button from "../../../../common/Button";
import { EditAboutImges, PostAboutImages } from "../../../../../api/postApi";

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
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  existingImages: Slide[];
  files: FileItem[];
  setFiles: React.Dispatch<React.SetStateAction<FileItem[]>>;
}
export default function SwichButtons({
  selectTab,
  setIsModalOpen,
  existingImages,
  files,
  setFiles,
}: SwitchButtonsProps) {
  const CloseModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    files.forEach((item) => {
      formData.append("images", item.file);
    });

    await PostAboutImages(formData);
    setFiles([]);
  };

  const handleEdit = async () => {
    const newArray = existingImages.map((item, index) => ({
      image_url: item.image_url,
      name: item.name,
      sort_order: index,
    }));

    console.log(newArray);

    const response = await EditAboutImges(newArray);
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
