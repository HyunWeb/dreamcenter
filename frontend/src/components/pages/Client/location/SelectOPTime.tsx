import { MapStore } from "@/store/userStore";
import React from "react";
import styled from "styled-components";

const Div = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;
const StyledSelect = styled.select`
  width: 50%;
  height: 40px;
  border: 1px solid #dddddd;
  padding-left: 10px;
  font-size: 16px;
  cursor: pointer;
`;
export default function SelectOPTime() {
  const { OPDays, setOPDays, startTime, setStartTime, endTime, setEndTime } =
    MapStore();
  const handleOpDayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOPDays(e.target.value);
  };
  const handleStartTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStartTime(e.target.value);
  };
  const handleEndTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEndTime(e.target.value);
  };
  return (
    <Div>
      <StyledSelect
        name="opday"
        id="opday"
        required
        value={OPDays}
        onChange={handleOpDayChange}
      >
        <option value="평일">평일</option>
        <option value="주말">주말</option>
        <option value="연중무휴">연중무휴</option>
      </StyledSelect>
      <StyledSelect
        name="startTime"
        id="startTime"
        required
        value={startTime}
        onChange={handleStartTimeChange}
      >
        {Array.from({ length: 24 }).map((_, i) => (
          <option key={i} value={`${i.toString().padStart(2, "0")}:00`}>
            {`${i.toString().padStart(2, "0")}:00`}
          </option>
        ))}
      </StyledSelect>
      <span>~</span>
      <StyledSelect
        name="endTime"
        id="endTime"
        required
        value={endTime}
        onChange={handleEndTimeChange}
      >
        {Array.from({ length: 24 }).map((_, i) => (
          <option key={i} value={`${i.toString().padStart(2, "0")}:00`}>
            {`${i.toString().padStart(2, "0")}:00`}
          </option>
        ))}
      </StyledSelect>
    </Div>
  );
}
