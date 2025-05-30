import React, { SetStateAction } from "react";
import styled from "styled-components";
import Button from "./Button";
import { ControlModalStore } from "@/store/userStore";
import { PostMatchPassword } from "@/api/postApi";
import { useNavigate } from "react-router-dom";

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
type ButtonProps = {
  password: string[];
  setPassword: React.Dispatch<SetStateAction<string[]>>;
};
export default function ModalButtonBox({ password, setPassword }: ButtonProps) {
  const { setViewModal, postId } = ControlModalStore();
  const handleHideModal = () => {
    setViewModal(false);
  };
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!postId) return;
    const Password = password.join("");
    const res = await PostMatchPassword(Password, postId);
    if (res.match) {
      setViewModal(false);
      navigate(`/questions/${postId}`);
    } else {
      alert("비밀번호가 일치하지 않습니다.");
      setPassword(["", "", "", ""]);
    }
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
        onClick={handleSubmit}
      />
    </ButtonBox>
  );
}
