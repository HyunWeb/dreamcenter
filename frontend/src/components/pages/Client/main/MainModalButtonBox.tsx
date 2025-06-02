import React from "react";
import styled from "styled-components";
import Button from "@/components/common/Button";
import { MainStore } from "@/store/userStore";

const ButtonBox = styled.div`
  display: flex;
  gap: 24px;
  justify-content: center;
  align-items: center;
  margin-top: 60px;
`;
const StyleButton = styled(Button)`
  padding: 15px 45px;
  font-size: 16px;
  border-radius: 8px;
`;

export default function MainModalButtonBox() {
  const { isModalOpen, setIsModalOpen } = MainStore();

  const handleCancle = () => {
    setIsModalOpen(false);
  };
  return (
    <ButtonBox>
      <StyleButton
        name="취소"
        Bgcolor="grey"
        TitleColor="darkGrey"
        onClick={handleCancle}
      />
      <StyleButton name="수정" Bgcolor="green" TitleColor="white" />
    </ButtonBox>
  );
}
