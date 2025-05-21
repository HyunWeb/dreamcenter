import { ReservationInputStore } from "@/store/userStore";
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
  const { admission, setAdmission } = ReservationInputStore();
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAdmission(e.target.value);
  };
  return (
    <>
      <StyledSelect
        name="admissionType"
        id="admissionType"
        required
        value={admission}
        onChange={handleChange}
      >
        <option value="">지원전공 선택</option>
        <option value="신입학">신입학</option>
        <option value="편입학">편입학</option>
      </StyledSelect>
    </>
  );
}
