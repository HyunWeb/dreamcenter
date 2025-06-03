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
  min-width: 180px;
  display: block;
  text-align: left;
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
}

export default function FormRow({
  htmlFor,
  label,
  required,
  children,
  NeedWrapper = true,
}: FormRowProps) {
  return (
    <Inputdiv>
      <Label htmlFor={htmlFor}>
        {label}
        {required && <span className="required">*</span>}
      </Label>
      {NeedWrapper ? <Wrapper>{children}</Wrapper> : <>{children}</>}
    </Inputdiv>
  );
}
