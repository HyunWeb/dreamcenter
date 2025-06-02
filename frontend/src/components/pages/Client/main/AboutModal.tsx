import React from "react";
import styled from "styled-components";
import FormRow from "../Reservation/InputGroup/FormRow";
import TitleInputGroup from "./TitleInputGroup";
import SubTitleInputGroup from "./SubTitleInputGroup";
import { MainStore } from "@/store/userStore";
import ImgInputGroup from "../Reservation/InputGroup/ImgInputGroup";

import MainModalButtonBox from "./MainModalButtonBox";
import MainImgInput from "./MainImgInput";

const Div = styled.div`
  position: fixed;
  z-index: 20;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 880px;
  height: 850px;
  background-color: white;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  text-align: center;
  padding: 60px 40px 0;
  box-sizing: border-box;
  overflow: auto;
  scrollbar-width: none;

  h2 {
    padding-bottom: 44px;
    border-bottom: 1px solid #dddddd;
  }
`;

const Section = styled.section`
  padding: 40px;
`;
const Textarea = styled.textarea`
  flex-grow: 1;
  padding: 17px 0 0 19px;
  border: 1px solid #dddddd;
  font-size: 16px;
  min-height: 150px;
`;

export default function AboutModal() {
  const { message, setMessage } = MainStore();
  return (
    <Div>
      <h2 className="Section-title">타이틀 수정</h2>
      <Section>
        <FormRow
          htmlFor="title1"
          label="타이틀1"
          required={true}
          NeedWrapper={false}
        >
          <TitleInputGroup />
        </FormRow>
        <FormRow
          htmlFor="title2"
          label="타이틀2"
          required={true}
          NeedWrapper={false}
        >
          <SubTitleInputGroup />
        </FormRow>

        <FormRow
          htmlFor="inquiry"
          label="핵심문의사항"
          required={false}
          NeedWrapper={false}
        >
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            name="Description"
            id="Description"
            placeholder="내용을 입력해 주세요"
          />
        </FormRow>
        <FormRow
          htmlFor="photoUpload"
          label="사진첨부"
          required={false}
          NeedWrapper={false}
        >
          <MainImgInput />
        </FormRow>
        <MainModalButtonBox />
      </Section>
    </Div>
  );
}
