import { MainStore } from "@/store/userStore";
import React, { useEffect } from "react";
import styled from "styled-components";

const SingleInput = styled.input`
  height: 40px;
  width: 100%;
  border: 1px solid #dddddd;
  padding-left: 10px;
  font-size: 16px;

  @media (max-width: 1024px) {
    box-sizing: border-box;
    font-size: 15px;
  }
`;

export default function TitleInputGroup() {
  const { title1, setTitle1 } = MainStore();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle1(e.target.value);
  };
  return (
    <>
      <SingleInput
        type="text"
        id="title"
        name="title"
        placeholder="메인 타이틀을 입력해주세요"
        required
        value={title1}
        onChange={handleChange}
      />
    </>
  );
}
