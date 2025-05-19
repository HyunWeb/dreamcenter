import React from "react";
import styled from "styled-components";

const SingleInput = styled.input`
  height: 40px;
  width: 100%;
  border: 1px solid #dddddd;
  padding-left: 10px;
  font-size: 16px;
`;
export default function SchoolInputGroup() {
  return (
    <>
      <SingleInput
        type="text"
        id="school"
        placeholder="ex) 한국대학교 경영학과 재학중"
        required
      />
    </>
  );
}
