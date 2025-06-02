import { UseModalStore } from "@/store/userStore";
import React from "react";
import styled from "styled-components";

const Div = styled.div`
  cursor: pointer;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #000000bf;
  img {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    max-width: 800px;
  }
`;

const CancleButton = styled.button`
  width: 10vw;
  height: 10vh;
  background-color: transparent;
  color: white;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 5vw;
  right: 5vh;

  svg {
    width: 30px;
    height: 30px;
  }
`;

export default function ImageOverlay() {
  const { ImageSrc, setImageModal } = UseModalStore();
  return (
    <Div onClick={() => setImageModal(false)}>
      <CancleButton onClick={() => setImageModal(false)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-x-lg"
          viewBox="0 0 16 16"
        >
          <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
        </svg>
      </CancleButton>
      <img src={ImageSrc} alt="이미지 오버레이" />
    </Div>
  );
}
