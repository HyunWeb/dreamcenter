import React from "react";
import CurrentRoot from "./CurrentRoot";
import styled from "styled-components";

interface HeaderProps {
  title: string;
  root: string;
}

const Title = styled.h2`
  margin-bottom: 12px;
`;

export default function PageHeader({ title, root }: HeaderProps) {
  return (
    <>
      <Title className="Section-title">{title}</Title>
      <CurrentRoot root1={root} />
    </>
  );
}
