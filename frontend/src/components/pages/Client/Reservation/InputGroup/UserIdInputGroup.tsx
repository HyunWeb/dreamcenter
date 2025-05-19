import { ReservationInputStore } from "@/store/userStore";
import React from "react";
import styled from "styled-components";

const Inputdiv = styled.div`
  margin-bottom: 24px;
  display: flex;
  width: 100%;
  .custom1 {
    gap: 10px;
  }
`;

const Label = styled.label`
  line-height: 44px;
  font-size: 18px;
  font-weight: 500;
  width: 20%;
  display: block;
  text-align: left;
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 326px;
  display: flex;
  justify-content: flex-start;
`;

export default function UserIdInputGroup() {
  const { userId, setUserId } = ReservationInputStore();

  // useEffect로 받아오면 설정하도록 변경
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value);
  };

  return (
    <>
      <input
        id="userId"
        name="userId"
        readOnly
        value={userId}
        className="readOnlyInput"
      />
    </>
  );
}
