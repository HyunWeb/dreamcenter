import { QuestionWritePageStore } from "@/store/userStore";
import React from "react";
import styled from "styled-components";

const Textarea = styled.textarea`
  flex-grow: 1;
  height: 400px;
  padding: 17px 0 0 19px;
  border: 1px solid #dddddd;
  font-size: 16px;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 1024px) {
    height: 200px;
  }
`;

export default function MessageInput() {
  const { message, setMessage } = QuestionWritePageStore();

  return (
    <Textarea
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      name="Message"
      id="Message"
      placeholder="내용을 입력해 주세요"
    />
  );
}
