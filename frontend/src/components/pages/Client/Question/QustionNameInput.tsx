import { QuestionWritePageStore } from "@/store/userStore";
import React from "react";
import styled from "styled-components";

const SingleInput = styled.input`
  height: 40px;
  width: 100%;
  border: 1px solid #dddddd;
  padding-left: 10px;
  font-size: 16px;
`;

export default function QustionNameInput() {
  const { title, setTitle } = QuestionWritePageStore();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  return (
    <SingleInput
      type="text"
      id="Title"
      name="Title"
      placeholder="제목을 입력해주세요"
      required
      value={title}
      onChange={handleChange}
    />
  );
}
