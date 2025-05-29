import React from "react";
import styled from "styled-components";
import Button from "./Button";
import { ControlModalStore } from "@/store/userStore";

const ButtonBox = styled.div`
  display: flex;
  gap: 24px;
  justify-content: center;
  align-items: flex-end;
  flex-grow: 1;
`;

const StyleButton = styled(Button)`
  padding: 15px 45px;
  font-size: 16px;
  border-radius: 8px;
`;
export default function ModalButtonBox() {
  const { setViewModal } = ControlModalStore();
  const handleHideModal = () => {
    setViewModal(false);
  };

  return (
    <ButtonBox>
      <StyleButton
        name="취소"
        Bgcolor="grey"
        TitleColor="darkGrey"
        onClick={handleHideModal}
      />
      <StyleButton
        name="입력"
        Bgcolor="green"
        TitleColor="white"
        // onClick={handleSubmit}
      />
    </ButtonBox>
  );
}
