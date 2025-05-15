import React from "react";
import styled from "styled-components";

interface ImgMovBtnProps {
  direction: "leftBig" | "rightBig" | "leftSmall" | "rightSmall";
  onClick?: () => void;
}

const Button = styled.button`
  width: 100px;
  transition-duration: 50ms;
  background-color: transparent;
  display: flex;
  border: none;
  cursor: pointer;
  align-items: center;

  svg {
    width: 40px;
    height: 40px;
    color: black;
  }

  &:hover {
    svg {
      color: #49b736;
    }
  }
`;

const LeftButton = styled(Button)`
  height: 50vh;
  justify-content: flex-start;
`;

const RightButton = styled(Button)`
  height: 50vh;
  justify-content: flex-end;
`;
const SmallLeftButton = styled(Button)`
  height: 20vh;
  justify-content: flex-start;
  position: absolute;
  left: -100px;
  top: 0;
`;

const SmallRightButton = styled(Button)`
  height: 20vh;
  justify-content: flex-end;
  position: absolute;
  right: -100px;
  top: 0;
`;

export default function ImgMovBtn({ direction, onClick }: ImgMovBtnProps) {
  let type;

  switch (direction) {
    case "leftBig":
      type = (
        <LeftButton onClick={onClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-chevron-left"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
            />
          </svg>
        </LeftButton>
      );
      break;

    case "rightBig":
      type = (
        <RightButton onClick={onClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-chevron-right"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
            />
          </svg>
        </RightButton>
      );
      break;
    case "leftSmall":
      type = (
        <SmallLeftButton onClick={onClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-chevron-left"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
            />
          </svg>
        </SmallLeftButton>
      );
      break;
    case "rightSmall":
      type = (
        <SmallRightButton onClick={onClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-chevron-right"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
            />
          </svg>
        </SmallRightButton>
      );
      break;
  }
  return <>{type}</>;
}
