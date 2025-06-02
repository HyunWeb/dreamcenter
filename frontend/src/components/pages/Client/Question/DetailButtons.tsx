import { DeleteQuestion } from "@/api/postApi";
import { AnswerData } from "@/types/forms";
import React, { SetStateAction } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  answer?: AnswerData;
};
export default function DetailButtons({
  ViewWriteAnswer,
  setVeiwWriteAnswer,
  answer,
}: Props) {
  const { id } = useParams<{ id: string }>();
  const naviagte = useNavigate();

  const handleBack = () => {
    naviagte(-1);
  };

  const handleChange = () => {
    setVeiwWriteAnswer((prev) => !prev);
  };

  const handleDelete = async () => {
    if (!id) return;
    const res = await DeleteQuestion(id);
    console.log(res);
    if (res.success) {
      alert("삭제가 완료되었습니다.");
      naviagte(-1);
    }
  };
  return (
    <Div>
      <Button onClick={handleBack}>뒤로가기</Button>
      <Wrap>
        <ConfirmButton onClick={handleChange}>
          {ViewWriteAnswer ? "입력취소" : answer ? "답변수정" : "답변달기"}
        </ConfirmButton>
        <DeleteButton onClick={handleDelete}>질문삭제</DeleteButton>
      </Wrap>
    </Div>
  );
}
