import { postFooter, PostLocation } from "@/api/postApi";
import Button from "@/components/common/Button";
import { FooterStore, MapStore, useAlertStore } from "@/store/userStore";
import React from "react";
import styled from "styled-components";

const ButtonBox = styled.div`
  display: flex;
  gap: 24px;
  justify-content: center;
  align-items: center;
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

export default function FooterButtonBox() {
  const { showAlert } = useAlertStore();
  const { setIsModalOpen, footerTitle, description } = FooterStore();
  const handleCancle = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async () => {
    const data = {
      title: footerTitle,
      description,
    };
    const res = await postFooter(data);
    if (res.message) {
      showAlert("하단 정보가 수정되었습니다.");
      setIsModalOpen(false);
    }
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
