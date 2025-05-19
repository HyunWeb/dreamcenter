import React from "react";
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
  return (
    <>
      <SingleInput
        type="text"
        id="phone1"
        name="phone1"
        maxLength={3}
        placeholder="010"
        required
      />
      <PhoneDash>-</PhoneDash>
      <SingleInput
        type="text"
        id="phone2"
        name="phone2"
        maxLength={4}
        placeholder="1234"
        required
      />
      <PhoneDash>-</PhoneDash>
      <SingleInput
        type="text"
        id="phone3"
        name="phone3"
        maxLength={4}
        placeholder="5678"
        required
      />
    </>
  );
}
