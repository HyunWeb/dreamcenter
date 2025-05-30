import React, { SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Div = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const Wrap = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  background-color: #eaeaea;
  color: #888888;
  padding: 6px 20px;
  border-radius: 3px;
  border: none;
  font-size: 16px;
  box-sizing: border-box;
  line-height: 1.5;
  cursor: pointer;
`;

const DeleteButton = styled(Button)`
  background-color: #c93e3e;
  color: white;
`;

const ConfirmButton = styled(Button)`
  background-color: white;
  color: #49b736;
  font-weight: 600;
  border: 1px solid #49b736;
`;
type Props = {
  ViewWriteAnswer: boolean;
  setVeiwWriteAnswer: React.Dispatch<SetStateAction<boolean>>;
};
export default function DetailButtons({
  ViewWriteAnswer,
  setVeiwWriteAnswer,
}: Props) {
  const naviagte = useNavigate();

  const handleBack = () => {
    naviagte(-1);
  };

  const handleChange = () => {
    setVeiwWriteAnswer((prev) => !prev);
  };
  return (
    <Div>
      <Button onClick={handleBack}>뒤로가기</Button>
      <Wrap>
        <ConfirmButton onClick={handleChange}>
          {ViewWriteAnswer ? "입력취소" : "답변달기"}
        </ConfirmButton>
        <DeleteButton>질문삭제</DeleteButton>
      </Wrap>
    </Div>
  );
}
