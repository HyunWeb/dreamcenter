import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledLink = styled(Link)`
  position: absolute;
  top: 50%;
  right: 0px;
  transform: translateY(-50%);
`;

interface CustomLinkProps {
  to: string;
}

export default function CustomLink({ to }: CustomLinkProps) {
  return <StyledLink to={to}>더보기</StyledLink>;
}
