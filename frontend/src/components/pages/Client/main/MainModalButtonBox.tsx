import React from "react";
import styled from "styled-components";
import Button from "@/components/common/Button";
import { MainStore, useAlertStore } from "@/store/userStore";
import { title } from "process";
import { PostMainPage } from "@/api/postApi";

const ButtonBox = styled.div`
  display: flex;
  gap: 24px;
  justify-content: center;
  align-items: center;
  margin-top: 60px;
  @media (max-width: 1024px) {
    margin-top: 30px;
  }
`;
const StyleButton = styled(Button)`
  padding: 15px 45px;
  font-size: 16px;
  border-radius: 8px;
  @media (max-width: 1024px) {
    padding: 12px 40px;
    font-size: 15px;
  }
`;

export default function MainModalButtonBox() {
  const { showAlert } = useAlertStore();
  const {
    isModalOpen,
    setIsModalOpen,
    title1,
    title2,
    message,
    file,
    MainAbout,
    setMainAbout,
    setFiles,
  } = MainStore();

  const handleCancle = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async () => {
    if (title1 === "" || title2 === "" || message === "") {
      showAlert("필수 항목을 모두 입력해주세요");
      return;
    }
    if (!MainAbout.image_url) {
      showAlert("현재 사용하던 이미지가 없습니다. 사진을 저장해주세요 ");
    }
    const formData = new FormData();
    formData.append("title1", title1);
    formData.append("title2", title2);
    formData.append("message", message);
    file?.forEach(({ file }) => {
      formData.append("images", file);
    });
    const res = await PostMainPage(formData);
    if (res.message) showAlert("데이터가 성공적으로 저장되었습니다.");
    setIsModalOpen(false);
    setFiles([]);
    setMainAbout(res.updatedData);
  };
  return (
    <ButtonBox>
      <StyleButton
        name="취소"
        Bgcolor="grey"
        TitleColor="darkGrey"
        onClick={handleCancle}
      />
      <StyleButton
        name="수정"
        Bgcolor="green"
        TitleColor="white"
        onClick={handleSubmit}
      />
    </ButtonBox>
  );
}
