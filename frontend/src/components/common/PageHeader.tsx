import React from "react";
import CurrentRoot from "./CurrentRoot";
import styled from "styled-components";

interface HeaderProps {
  title: string;
  root: string;
  root1Url?: string;
  root2?: string;
}

const Title = styled.h2`
  margin-bottom: 12px;
`;

export default function PageHeader({
  title,
  root,
  root1Url,
  root2,
}: HeaderProps) {
  return (
    <>
      <Title className="Section-title">{title}</Title>
      <CurrentRoot root1={root} root1Url={root1Url} root2={root2} />
    </>
  );
}
