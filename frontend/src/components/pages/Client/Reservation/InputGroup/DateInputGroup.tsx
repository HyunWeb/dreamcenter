import { ReservationInputStore } from "@/store/userStore";
import React from "react";
import DatePicker from "react-datepicker";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  max-width: 326px;
  display: flex;
  justify-content: flex-start;
`;

const StyledSelect = styled.select`
  width: 50%;
  height: 40px;
  border: 1px solid #dddddd;
  padding-left: 10px;
  font-size: 16px;
  cursor: pointer;
`;

export default function DateInputGroup() {
  const { selectedDate, setSelectedDate } = ReservationInputStore();
  // 자동 시간 생성기
  const generateTimeSlot = (startHour: number, endHour: number) => {
    const TimeSlot = [];
    for (let hours = startHour; hours <= endHour; hours++) {
      TimeSlot.push(`${String(hours).padStart(2, "0")}: 00`);
      TimeSlot.push(`${String(hours).padStart(2, "0")}: 30`);
    }
    return TimeSlot;
  };
  const TimeSlot: string[] = generateTimeSlot(10, 18);

  return (
    <Wrapper className="custom1">
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        dateFormat="yyyy.MM.dd"
        placeholderText="2025.01.01"
        id="consultDate"
        name="consultDate"
        required
        className="DataPicker"
      />
      <StyledSelect name="consultTime" id="consultTime" required>
        <option value="">시간 선택</option>
        {TimeSlot.map((item, index) => {
          return (
            <option value={item} key={index}>
              {item}
            </option>
          );
        })}
      </StyledSelect>
    </Wrapper>
  );
}
