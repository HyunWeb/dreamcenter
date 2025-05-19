import React, { useState } from "react";
import styled from "styled-components";

import "react-datepicker/dist/react-datepicker.css";

import UserIdInputGroup from "./InputGroup/UserIdInputGroup";
import FormRow from "./InputGroup/FormRow";
import NameInputGroup from "./InputGroup/NameInputGroup";
import PhoneInputGroup from "./InputGroup/PhoneInputGroup";
import DateInputGroup from "./InputGroup/DateInputGroup";
import AgeInputGroup from "./InputGroup/AgeInputGroup";
import SchoolInputGroup from "./InputGroup/SchoolInputGroup";
import AdmissionInputGroup from "./InputGroup/AdmissionInputGroup";
import RecommenderInputGroup from "./InputGroup/RecommenderInputGroup";
import ImgInputGroup from "./InputGroup/ImgInputGroup";

const Description = styled.p`
  line-height: 1.5;
  font-weight: 500;
  font-size: 15px;
  margin-bottom: 30px;
`;

const Form = styled.form`
  display: flex;
  justify-content: center;
  padding: 0px 150px;
`;
const Fieldset = styled.fieldset`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

const Span = styled.span`
  display: block;
  margin-bottom: 34px;
  text-align: left;
`;

const Textarea = styled.textarea`
  flex-grow: 1;
  height: 400px;
  padding: 17px 0 0 19px;
  border: 1px solid #dddddd;
  font-size: 16px;
`;

const AgreeLabel = styled.label`
  position: relative;
  margin-top: 38px;
  align-self: center;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  width: 100%;
  border-top: 1px solid #dddddd;
  padding: 38px;

  input {
    width: 16px;
    height: 16px;
  }
  a {
    color: #888888;
  }
`;

const SubmitButton = styled.button`
  padding: 12px 45px;
  color: white;
  background-color: #49b736;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  margin-bottom: 178px;
`;

export default function FormSection() {
  const [message, setMessage] = useState("");

  return (
    <div>
      <Description className="description">
        모든 상담은 아래 예약을 한 경우에만 진행이 가능합니다. <br />
        정확하지 않거나 성실하지 않은 답변은 상담이 어려울 수있습니다.
        감사합니다.
      </Description>
      <Form>
        <Fieldset>
          <FormRow htmlFor="userId" label="글쓴이" required={true}>
            <UserIdInputGroup />
          </FormRow>

          <FormRow htmlFor="name" label="이름" required={true}>
            <NameInputGroup />
          </FormRow>

          <FormRow htmlFor="phone1" label="연락처" required={true}>
            <PhoneInputGroup />
          </FormRow>

          <FormRow htmlFor="consultDate" label="상담날짜" required={true}>
            <DateInputGroup />
          </FormRow>

          <FormRow htmlFor="age" label="나이" required={true}>
            <AgeInputGroup />
          </FormRow>

          <FormRow
            htmlFor="school"
            label="학교명/전공/최종학력"
            required={true}
          >
            <SchoolInputGroup />
          </FormRow>

          <FormRow
            htmlFor="admissionType"
            label="신입합/편입학"
            required={true}
          >
            <AdmissionInputGroup />
          </FormRow>

          <Span className="description">
            ※ 편입 문의는 uzbekdoctordream@gmail.com 으로 성적 증명서 보내주세요
          </Span>

          <FormRow htmlFor="recommender" label="추천인" required={false}>
            <RecommenderInputGroup />
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
              name="inquiry"
              id="inquiry"
              placeholder="내용을 입력해 주세요"
            />
          </FormRow>

          <FormRow
            htmlFor="photoUpload"
            label="사진첨부"
            required={false}
            NeedWrapper={false}
          >
            <ImgInputGroup />
          </FormRow>

          <AgreeLabel>
            <input type="checkbox" name="agreePrivacy" required />
            개인정보 수집에 동의합니다.
            <a href="/privacy" target="_blank" rel="noopener noreferrer">
              내용 보기
            </a>
          </AgreeLabel>
        </Fieldset>
      </Form>
      <SubmitButton>등록</SubmitButton>
    </div>
  );
}
