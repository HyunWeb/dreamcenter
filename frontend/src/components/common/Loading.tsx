import React from "react";
import styled from "styled-components";

const LoadingDiv = styled.div`
  position: fixed;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;

  div {
    width: 40px;
    height: 40px;
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-left-color: #49b736;
    border-radius: 50%;
    animation: spin 0.8s ease-in-out infinite;
  }
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default function Loading() {
  return (
    <LoadingDiv>
      <div></div>
    </LoadingDiv>
  );
}
