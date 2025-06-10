import { useAlertStore } from "@/store/userStore";
import React from "react";
import styled from "styled-components";

const Div = styled.div<{ $visible: boolean }>`
  position: fixed;
  z-index: 90;
  top: ${(props) => (props.$visible ? "20px" : "-100px")};
  left: 50%;
  transform: translateX(-50%);
  transition: top 0.4s ease;
  width: 400px;
  max-width: 400px;
  height: 60px;
  background-color: white;
  box-shadow: 0 2px 8px rgb(0 0 0 / 39%);
  border-radius: 8px;
  padding: 16px;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  font-size: 15px;
  font-weight: 500;
  border-bottom: 5px solid #49b736;
  svg {
    width: 25px;
    height: 25px;
    color: #49b736;
  }
  @media (max-width: 1024px) {
    width: 90%;
    top: ${(props) => (props.$visible ? "75px" : "-100px")};
  }
`;

const Button = styled.button`
  margin-left: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
  svg {
    width: 25px;
    height: 25px;
    color: #888888;
  }
`;

export default function CustomAlert() {
  const { message, isVisible, hideAlert } = useAlertStore();
  const handleClose = () => {
    hideAlert();
  };
  return (
    <Div $visible={isVisible}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-check-circle-fill"
        viewBox="0 0 16 16"
      >
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
      </svg>
      {message}
      <Button onClick={handleClose}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-x"
          viewBox="0 0 16 16"
        >
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
        </svg>
      </Button>
    </Div>
  );
}
