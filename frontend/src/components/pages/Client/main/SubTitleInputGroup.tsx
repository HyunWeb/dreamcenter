import { MainStore } from "@/store/userStore";
import React from "react";
import styled from "styled-components";

const SingleInput = styled.input`
  height: 40px;
  width: 100%;
  border: 1px solid #dddddd;
  padding-left: 10px;
  font-size: 16px;
`;

export default function SubTitleInputGroup() {
  const { title2, setTitle2 } = MainStore();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle2(e.target.value);
  };
  return (
    <>
      <SingleInput
        type="text"
        id="title"
        name="title"
        placeholder="서브 타이틀을 입력해주세요"
        required
        value={title2}
        onChange={handleChange}
      />
    </>
  );
}
