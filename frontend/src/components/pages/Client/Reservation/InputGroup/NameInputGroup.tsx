import React from "react";
import styled from "styled-components";

const SingleInput = styled.input`
  height: 40px;
  width: 100%;
  border: 1px solid #dddddd;
  padding-left: 10px;
  font-size: 16px;
`;

export default function NameInputGroup() {
  return (
    <>
      <SingleInput
        type="text"
        id="name"
        name="name"
        placeholder="홍길동"
        required
      />
    </>
  );
}
