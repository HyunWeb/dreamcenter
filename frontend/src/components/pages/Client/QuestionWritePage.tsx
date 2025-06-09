import PageHeader from "@/components/common/PageHeader";
import React, { useRef, useState } from "react";
import styled from "styled-components";
import FormRow from "./Reservation/InputGroup/FormRow";

import Button from "@/components/common/Button";
import NameInputGroup from "./Reservation/InputGroup/NameInputGroup";
import UserIdInput from "./Question/UserIdInput";
import QustionNameInput from "./Question/QustionNameInput";
import MessageInput from "./Question/MessageInput";
import ImgInputGroup from "./Reservation/InputGroup/ImgInputGroup";
import { QuestionWritePageStore } from "@/store/userStore";
import PrivatePassword from "./Question/PrivatePassword";
import QuestionButtonBox from "./Question/QuestionButtonBox";

const Section = styled.section`
  border-top: 1px solid #dddddd;
  border-bottom: 1px solid #dddddd;
  margin: 50px 0 70px;
  padding: 50px 200px;
  @media (max-width: 1024px) {
    padding: 30px 0;
  }
`;

const Form = styled.form`
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;

  width: 100%;
`;

const Fieldset = styled.fieldset`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  padding: 0px 150px;

  size: 16px;
`;
const PrivateLabel = styled.label`
  font-size: 17px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  input {
    width: 20px;
    height: 20px;
  }
`;
export default function QuestionWritePage() {
  const { privateChecked, setPrivateChecked } = QuestionWritePageStore();

  const handlePrivateChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrivateChecked(e.target.checked);
  };
  return (
    <div>
      <PageHeader
        title="질문 등록"
        root="질문게시판"
        root1Url="/questions"
        root2="질문 등록"
      />

      <Section>
        <Form>
          <FormRow
            htmlFor="userId"
            label="글쓴이"
            required={true}
            NeedWrapper={false}
          >
            <UserIdInput />
          </FormRow>
          <FormRow
            htmlFor="Title"
            label="제목"
            required={true}
            NeedWrapper={false}
          >
            <QustionNameInput />
          </FormRow>
          <FormRow
            htmlFor="Message"
            label="질문사항"
            required={true}
            NeedWrapper={false}
          >
            <MessageInput />
          </FormRow>
          <FormRow
            htmlFor="photoUpload"
            label="사진첨부"
            required={false}
            NeedWrapper={false}
          >
            <ImgInputGroup />
          </FormRow>
          <PrivateLabel>
            <input
              type="checkbox"
              name="PrivateLabel"
              required
              checked={privateChecked}
              onChange={handlePrivateChecked}
            />
            비공개로 설정
          </PrivateLabel>
          {privateChecked && (
            <FormRow
              htmlFor="PrivatePassword"
              label="비밀번호"
              required={false}
              NeedWrapper={false}
            >
              <PrivatePassword />
            </FormRow>
          )}
        </Form>
      </Section>
      <QuestionButtonBox />
    </div>
  );
}
