import React from "react";
import styled from "styled-components";

const Inputdiv = styled.div`
  margin-bottom: 24px;
  display: flex;
  width: 100%;
  .custom1 {
    gap: 10px;
  }

  @media (max-width: 1024px) {
    flex-direction: column;
    margin-bottom: 10px;
  }

  /* 필수 항목을 비운 채 제출했을 때 강조 */
  &.invalid label {
    color: #d93025;
  }
  &.invalid input,
  &.invalid select,
  &.invalid textarea {
    border-color: #d93025;
    background-color: #fff6f5;
  }
`;

const Label = styled.label`
  line-height: 44px;
  font-size: 18px;
  font-weight: 500;
  width: 20%;
  min-width: 180px;
  display: block;
  text-align: left;

  @media (max-width: 1024px) {
    font-size: 15px;
    min-width: 100px;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 326px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
interface FormRowProps {
  htmlFor: string;
  label: string;
  required: boolean;
  children: React.ReactNode;
  NeedWrapper?: boolean;
  invalid?: boolean;
}

export default function FormRow({
  htmlFor,
  label,
  required,
  children,
  NeedWrapper = true,
  invalid = false,
}: FormRowProps) {
  return (
    <Inputdiv className={invalid ? "invalid" : undefined}>
      <Label htmlFor={htmlFor}>
        {label}
        {required && <span className="required">*</span>}
      </Label>
      {NeedWrapper ? <Wrapper>{children}</Wrapper> : <>{children}</>}
    </Inputdiv>
  );
}
