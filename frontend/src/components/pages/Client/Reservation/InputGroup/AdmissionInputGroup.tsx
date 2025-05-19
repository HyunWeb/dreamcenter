import React from "react";
import styled from "styled-components";

const StyledSelect = styled.select`
  width: 50%;
  height: 40px;
  border: 1px solid #dddddd;
  padding-left: 10px;
  font-size: 16px;
  cursor: pointer;
`;

export default function AdmissionInputGroup() {
  return (
    <>
      <StyledSelect name="admissionType" id="admissionType" required>
        <option value="">지원전공 선택</option>
        <option value="신입학">신입학</option>
        <option value="편입학">편입학</option>
      </StyledSelect>
    </>
  );
}
