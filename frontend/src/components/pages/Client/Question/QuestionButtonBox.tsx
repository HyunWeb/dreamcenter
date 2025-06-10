import { PostQuestion } from "@/api/postApi";
import Button from "@/components/common/Button";
import {
  QuestionWritePageStore,
  ReservationInputStore,
  useAlertStore,
} from "@/store/userStore";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const ButtonBox = styled.div`
  display: flex;
  gap: 24px;
  justify-content: center;
  align-items: center;
  margin: 70px 0 170px;
`;

const StyleButton = styled(Button)`
  padding: 15px 45px;
  font-size: 16px;
  border-radius: 8px;
`;

export default function QuestionButtonBox() {
  const { showAlert } = useAlertStore();
  const {
    // QustionUserId,
    title,
    message,
    privateChecked,
    privatePassword,
    setPrivatePassword,
    resetForm,
  } = QuestionWritePageStore();
  const { file, userId, setFiles } = ReservationInputStore();
  const navigate = useNavigate();
  const handleBack = () => {
    resetForm();
    setFiles([]);
    navigate(-1);
  };

  const handleSubmit = async () => {
    if (title === "" || message === "") {
      showAlert("제목과 질문사항을 모두 입력해주세요");
    }
    if (privateChecked === true && privatePassword?.length !== 4) {
      showAlert("비공개 비밀번호 4자리를 모두 입력해주세요");
    }
    if (privateChecked === false) {
      setPrivatePassword(null);
    }
    const formData = new FormData();

    const submitData = {
      Id: userId, // 사용자 닉네임
      title: title, // 문자열 제목
      message: message, // 긴 본문 메세지
      file: file, // 문자열로된 주소들을 배열로 저장
      private: privateChecked, // boolean
      privatePWD: privateChecked === false ? null : privatePassword, // 4자리 숫자가 적힌 문자열
    };

    formData.append("Id", submitData.Id);
    formData.append("title", submitData.title);
    formData.append("message", submitData.message);
    formData.append("private", String(submitData.private));
    formData.append("privatePWD", submitData.privatePWD || "");

    submitData.file.forEach((item) => {
      formData.append("images", item.file);
    });

    const res = await PostQuestion(formData);
    if (res.message) {
      showAlert("등록이 완료되었습니다.");
      resetForm();
      setFiles([]);
      navigate(-1);
    }
  };
  return (
    <ButtonBox>
      <StyleButton
        name="취소"
        Bgcolor="grey"
        TitleColor="darkGrey"
        onClick={handleBack}
      />
      <StyleButton
        name="등록"
        Bgcolor="green"
        TitleColor="white"
        onClick={handleSubmit}
      />
    </ButtonBox>
  );
}
