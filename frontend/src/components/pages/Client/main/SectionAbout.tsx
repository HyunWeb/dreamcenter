import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const AboutSection = styled.section<{ $imageUrl: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
  color: white;
  margin-bottom: 120px;

  height: 633px;
  overflow: hidden;

  button {
    width: 86px;
    height: 54px;
    position: absolute;
    z-index: 1;
    right: 10px;
    top: 10px;
    background-color: transparent;
    /*background-image: url("./edit.svg");
    background-repeat: no-repeat; */

    color: white;
    border: none;
    cursor: pointer;
    padding: 0;
    svg {
      width: 30px;
      height: 30px;
    }
  }

  &::before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 0;

    background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
      url(${(props) => props.$imageUrl});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    filter: blur(2px);
  }

  div {
    position: relative;
    z-index: 1;

    h1 {
      font-size: 24px;
      font-weight: 500;
      margin-bottom: 10px;
    }
    h2 {
      font-size: 36px;
      font-weight: 600;
      margin-bottom: 20px;
    }

    p {
      margin-bottom: 50px;
      line-height: 1.3;
    }

    a {
      text-decoration: none;
      background-color: transparent;
      border: 1px solid #ffffff6b;
      border-radius: 5px;
      color: white;
      padding: 10px 24px;
      transition-duration: 200ms;

      &:hover {
        border: 1px solid white;
      }
    }
  }
`;

export default function SectionAbout() {
  const [imageUrl, setImageUrl] = useState<string>(
    "https://dreamcenter-image-bucket.s3.ap-northeast-2.amazonaws.com/uploads/Layer+3.png"
  );
  return (
    <AboutSection $imageUrl={imageUrl}>
      <button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-pencil-square"
          viewBox="0 0 16 16"
        >
          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
          <path
            fillRule="evenodd"
            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
          />
        </svg>
      </button>
      <div>
        <h1>해외 의대 전문 유학원</h1>
        <h2>드림유학원, 당신의 글로벌 미래를 응원합니다.</h2>
        <p>
          2020 ~ 2025 우즈베키스탄 의대 전체 수속 학생수 1위
          <br />
          2020 ~ 2025 우즈베키스탄 의대 편입 성공 학생수 1위
        </p>
        <Link to="/about">자세히 보기</Link>
      </div>
    </AboutSection>
  );
}
