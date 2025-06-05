import { PostAnswerSubmit } from "@/api/postApi";
import Button from "@/components/common/Button";
import { useAlertStore } from "@/store/userStore";
import { AnswerData } from "@/types/forms";
import React, { SetStateAction, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const ATitle = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 25px;
  border-top: 1px solid #111111;
  border-bottom: 1px solid #111111;
  margin-top: 60px;
  .Answer_title {
    font-size: 24px;
    font-weight: 700;
  }

  .meta-Info {
    color: #888888;
    display: flex;
    gap: 12px;
  }
`;

const AMessage = styled.div`
  padding: 50px;
  display: flex;
  width: 100%;
  box-sizing: border-box;
  border-bottom: 1px solid #dddddd;

  label {
    line-height: 44px;
    font-size: 18px;
    font-weight: 500;
    width: 20%;
    display: block;
    text-align: left;
  }

  textarea {
    flex-grow: 1;
    height: 400px;
    padding: 17px 0 0 19px;
    border: 1px solid #dddddd;
    font-size: 16px;
    width: 100%;
  }
`;
const AButtonBox = styled.div`
  display: flex;
  gap: 24px;
  justify-content: center;
  align-items: center;
  margin-top: 70px;
`;
const StyleButton = styled(Button)`
  padding: 15px 45px;
  font-size: 16px;
  border-radius: 8px;
`;

const Section = styled.div`
  margin-bottom: 140px;
`;
interface Props {
  setVeiwWriteAnswer: React.Dispatch<SetStateAction<boolean>>;
  answer?: AnswerData;
}
export default function WriteAnswer({ setVeiwWriteAnswer, answer }: Props) {
  const { showAlert } = useAlertStore();
  const { id } = useParams<{ id: string }>();
  const [message, setMessage] = useState("");

  // 이미 답변이 있는 경우 가져와서 텍스트 창에 붙이기
  useEffect(() => {
    setMessage(answer?.content || "");
  }, [answer]);

  const hancleCancle = () => {
    showAlert("입력창이 닫힙니다.");
    setVeiwWriteAnswer(false);
  };

  const handleAnserSubmit = async () => {
    if (!id) return;
    const res = await PostAnswerSubmit(id, message);

    if (res.success) {
      setVeiwWriteAnswer(false);
    }
  };

  const handleChangeMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };
  return (
    <Section>
      <ATitle>
        <h2 className="Answer_title">답변 작성</h2>
      </ATitle>
      <AMessage>
        <label htmlFor="answer">답변사항</label>
        <textarea
          name="answer"
          id="answer"
          placeholder="내용을 입력해주세요"
          value={message}
          onChange={(e) => handleChangeMessage(e)}
        />
      </AMessage>
      <AButtonBox>
        <StyleButton
          name="취소"
          Bgcolor="grey"
          TitleColor="darkGrey"
          onClick={hancleCancle}
        />
        <StyleButton
          name="등록"
          Bgcolor="green"
          TitleColor="white"
          onClick={handleAnserSubmit}
        />
      </AButtonBox>
    </Section>
  );
}
