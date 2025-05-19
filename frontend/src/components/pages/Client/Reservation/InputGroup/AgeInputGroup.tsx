import React from "react";
import styled from "styled-components";

const SingleInput = styled.input`
  height: 40px;
  width: 100%;
  border: 1px solid #dddddd;
  padding-left: 10px;
  font-size: 16px;
`;

export default function AgeInputGroup() {
  return (
    <>
      <SingleInput
        type="number"
        id=" age"
        name="age"
        max={90}
        placeholder="만 나이를 입력해주세요"
        required
      />
    </>
  );
}
