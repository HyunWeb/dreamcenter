import React from "react";
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
    padding: 40px 0;

    h2 {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 20px;
    }
    p {
      font-size: 14px;
      color: #aaaaaa;
      line-height: 1.3;
    }
  }
`;

export default function FooterLayout() {
  return (
    <Footer>
      <div>
        <h2>UZBEKISTAN MEDICAL SCHOOLS</h2>
        <p>
          드림 유학원 | 우즈베키스탄 유학 전문 상담 기관
          <br />
          대표자: 홍길동 | 사업자등록번호: 405-04-98518
          <br />
          주소: 대구 광역시 수성구 화랑로8길 11-13 성화빌딩 2층
          <br />
          연락처: 010-1234-5678 | 이메일: uzbekdoctordream@gmail.com
          <br />
          운영시간: 평일 10:00 - 18:00 (주말/공휴일 휴무)
        </p>
      </div>
    </Footer>
  );
}
