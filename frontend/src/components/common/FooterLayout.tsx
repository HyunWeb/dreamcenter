import { GetFooter } from "@/api/postApi";
import { FooterStore, useUserStore } from "@/store/userStore";
import React, { useEffect } from "react";
import styled from "styled-components";

const Footer = styled.footer`
  background-color: #3b3b3b;
  width: 100%;
  color: white;
  display: flex;
  justify-content: center;
  div {
    max-width: 1200px;
    width: 100%;
    padding: 20px 0;
    @media (max-width: 1024px) {
      padding: 20px;
    }

    h2 {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 20px;
      @media (max-width: 1024px) {
        font-size: 14px;
        margin-bottom: 10px;
      }
    }
    p {
      white-space: pre;
      @media (max-width: 1024px) {
        font-size: 12px;
      }
      font-size: 14px;
      color: #aaaaaa;
      line-height: 1.3;
    }
  }
`;

const EditButton = styled.button`
  align-self: flex-start;
  width: 40px;
  height: 40px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  svg {
    width: 25px;
    height: 25px;
    color: white;
  }
`;

export default function FooterLayout() {
  const { role } = useUserStore();
  const {
    isModalOpen,
    setIsModalOpen,
    viewTitle,
    viewDescription,
    setViewTitle,
    setViewDescription,
  } = FooterStore();
  useEffect(() => {
    const fetchData = async () => {
      const res = await GetFooter();
      if (res.result) {
        setViewTitle(res.result.title);
        setViewDescription(res.result.description);
      } else {
        setViewTitle("UZBEKISTAN MEDICAL SCHOOLS");
        setViewDescription(`
              드림 유학원 | 우즈베키스탄 유학 전문 상담 기관
              대표자: 홍길동 | 사업자등록번호: 405-04-98518
              주소: 대구 광역시 수성구 화랑로8길 11-13 성화빌딩 2층
              연락처: 010-1234-5678 | 이메일: uzbekdoctordream@gmail.com
              운영시간: 평일 10:00 - 18:00 (주말/공휴일 휴무)
              `);
      }
    };
    fetchData();
  }, [isModalOpen]);

  return (
    <Footer>
      <div>
        <h2>{viewTitle}</h2>
        <p>{viewDescription}</p>
      </div>
      {role === "admin" && (
        <EditButton onClick={() => setIsModalOpen(true)}>
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
        </EditButton>
      )}
    </Footer>
  );
}
