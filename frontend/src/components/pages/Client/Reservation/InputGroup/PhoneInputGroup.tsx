import { ReservationInputStore } from "@/store/userStore";
import React, { SetStateAction, useEffect, useState } from "react";
import styled from "styled-components";

const SingleInput = styled.input`
  height: 40px;
  width: 100%;
  border: 1px solid #dddddd;
  padding-left: 10px;
  font-size: 16px;
`;
const PhoneDash = styled.span`
  padding: 0 10px;
`;

export default function PhoneInputGroup() {
  const [start, setStart] = useState("");
  const [middle, setMiddle] = useState("");
  const [end, setEnd] = useState("");
  const { phone, setPhone } = ReservationInputStore(); //Zustand

  useEffect(() => {
    setPhone(`${start}-${middle}-${end}`);
  }, [start, middle, end]);

  useEffect(() => {
    if (phone !== "") return;
    setStart("");
    setMiddle("");
    setEnd("");
  }, [phone]);

  const handleChange = (
    setter: React.Dispatch<SetStateAction<string>>,
    maxLength: number
  ) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.replace(/\D/g, "").slice(0, maxLength);
      setter(value);
    };
  };

  return (
    <>
      <SingleInput
        type="text"
        id="phone1"
        name="phone1"
        maxLength={3}
        placeholder="010"
        required
        value={start}
        onChange={handleChange(setStart, 3)}
      />
      <PhoneDash>-</PhoneDash>
      <SingleInput
        type="text"
        id="phone2"
        name="phone2"
        maxLength={4}
        placeholder="1234"
        required
        value={middle}
        onChange={handleChange(setMiddle, 4)}
      />
      <PhoneDash>-</PhoneDash>
      <SingleInput
        type="text"
        id="phone3"
        name="phone3"
        maxLength={4}
        placeholder="5678"
        required
        value={end}
        onChange={handleChange(setEnd, 4)}
      />
    </>
  );
}
