import { ControlModalStore, MapStore, useAlertStore } from "@/store/userStore";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Ul = styled.ul<{ $isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  position: fixed;
  bottom: 20px;
  right: 20px;
  gap: 15px;
  z-index: 88;
  @media (max-width: 1024px) {
    bottom: 90px;
    transition: transform 0.5s ease, opacity 0.5s ease;
    transform: ${({ $isOpen }) =>
      $isOpen ? "translateY(0)" : "translateY(100%)"};
    opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
    pointer-events: ${({ $isOpen }) =>
      $isOpen ? "auto" : "none"}; // 클릭 방지
  }

  li {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    box-shadow: 0 4px 16px rgb(0 0 0 / 28%);
    display: flex;
    justify-content: center;
    align-items: center;
    @media (max-width: 1024px) {
      width: 50px;
      height: 50px;
    }
    button {
      cursor: pointer;
      background-color: transparent;
      border: none;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    overflow: hidden;
    svg {
      width: 26px;
      height: 26px;
      @media (max-width: 1024px) {
        widht: 20px;
        height: 20px;
      }
    }
    a {
      cursor: pointer;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .FloatGreenButton {
    background-color: #49b736;
    svg {
      color: white;
    }
  }
  .FloatGreyButton {
    background-color: #dddddd;
    svg {
      color: #888888;
    }
  }
`;
// 모바일 컨트롤 전용
const Div = styled.div`
  z-index: 89;
  .FloatControl {
    display: none;
    z-index: 89;
  }
  @media (max-width: 1024px) {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    box-shadow: 0 4px 16px rgb(0 0 0 / 28%);
    border-radius: 50%;
    .FloatControl {
      position: absolute;
      display: block;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      border: 2px solid #49b736;
      background-color: white;

      svg {
        width: 20px;
        height: 20px;
        color: #49b736;
      }
    }
  }
`;

const MobileButton = styled.button<{ $isOpen: boolean }>`
  transition-duration: 300ms;
  transform: ${({ $isOpen }) => ($isOpen ? "rotate(45deg)" : "rotate(0)")};
`;

export default function FloatingButton() {
  const { viewModal, setViewModal, setType } = ControlModalStore();
  const { editphone1 } = MapStore();
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen((prev) => !prev);

  const isMobile = () => {
    return /Mobi|Android|iPhone/i.test(navigator.userAgent);
  };

  const handlePhoneClick = () => {
    if (isMobile()) {
      // 모바일이면 전화 앱 실행
      window.location.href = `tel:${editphone1}`;
    } else {
      // 데스크탑이면 모달 표시
      setViewModal(true);
      setType("FloatTelePhone");
    }
  };
  return (
    <Div>
      <MobileButton
        $isOpen={isOpen}
        className="FloatControl"
        onClick={toggleMenu}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-plus-lg"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"
          />
        </svg>
      </MobileButton>
      <Ul $isOpen={isOpen}>
        <li className="FloatGreenButton">
          <Link to="questions">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-question-lg"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M4.475 5.458c-.284 0-.514-.237-.47-.517C4.28 3.24 5.576 2 7.825 2c2.25 0 3.767 1.36 3.767 3.215 0 1.344-.665 2.288-1.79 2.973-1.1.659-1.414 1.118-1.414 2.01v.03a.5.5 0 0 1-.5.5h-.77a.5.5 0 0 1-.5-.495l-.003-.2c-.043-1.221.477-2.001 1.645-2.712 1.03-.632 1.397-1.135 1.397-2.028 0-.979-.758-1.698-1.926-1.698-1.009 0-1.71.529-1.938 1.402-.066.254-.278.461-.54.461h-.777ZM7.496 14c.622 0 1.095-.474 1.095-1.09 0-.618-.473-1.092-1.095-1.092-.606 0-1.087.474-1.087 1.091S6.89 14 7.496 14"
              />
            </svg>
          </Link>
        </li>
        <li className="FloatGreenButton">
          <button onClick={handlePhoneClick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-telephone-fill"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"
              />
            </svg>
          </button>
        </li>
        <li className="FloatGreenButton">
          <Link to="reservation">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-calendar-check"
              viewBox="0 0 16 16"
            >
              <path d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0" />
              <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
            </svg>
          </Link>
        </li>
        <li className="FloatGreenButton">
          <Link to="location">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-geo-alt"
              viewBox="0 0 16 16"
            >
              <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10" />
              <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
            </svg>
          </Link>
        </li>
        <li className="FloatGreyButton">
          <button onClick={handleClick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-arrow-up"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5"
              />
            </svg>
          </button>
        </li>
      </Ul>
    </Div>
  );
}
