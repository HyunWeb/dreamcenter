import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
interface CustomLinkProps {
  to: string;
}

const StyledLink = styled(Link)`
  position: absolute;
  top: 50%;
  right: 0px;
  transform: translateY(-50%);
  transition-duration: 150ms;
  width: 33px;
  height: 33px;

  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    height: 80%;
  }

  span {
    width: 100%;
    height: 100%;
    display: none;
    text-align: center;
    line-height: 28px;
    transition-duration: 150ms;
  }

  &:hover {
    width: 80px;

    svg {
      display: none;
    }

    span {
      display: block;
    }
  }

  text-decoration: none;
  background-color: #49b736; //로고 색
  color: white;
  border-radius: 20px;
  @media (max-width: 1024px) {
    width: 30px;
    height: 30px;
  }
`;

export default function CustomLink({ to }: CustomLinkProps) {
  return (
    <StyledLink to={to}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-plus"
        viewBox="0 0 16 16"
      >
        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
      </svg>
      <span>더보기</span>
    </StyledLink>
  );
}
