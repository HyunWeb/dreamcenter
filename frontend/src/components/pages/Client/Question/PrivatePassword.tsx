import { QuestionWritePageStore } from "@/store/userStore";
import React from "react";
import styled from "styled-components";
const Input = styled.input`
  width: 50%;
  border: 1px solid #dddddd;
  height: 40px;
  padding-left: 10px;
  font-size: 16px;
  margin-left: -20px;
  font-size: 16px;
`;

export default function PrivatePassword() {
  const { privatePassword, setPrivatePassword } = QuestionWritePageStore();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrivatePassword(e.target.value);
  };
  return (
    <Input
      type="password"
      id="PrivatePassword"
      name="PrivatePassword"
      placeholder="4자리 숫자를 입력해주세요"
      maxLength={4}
      onChange={handleChange}
      value={privatePassword ? privatePassword : ""}
    />
  );
}
