import React from "react";
import styled from "styled-components";
import Button from "../Button";
import { ControlModalStore } from "@/store/userStore";

const Div = styled.div`
  overflow-y: auto;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  text-align: left;
  p {
    margin-top: 20px;
  }

  strong {
    font-size: 17px;
    font-weight: 600;
  }
  ul {
    margin-top: 12px;
  }
`;

const StyleButton = styled(Button)`
  align-self: center;
  padding: 15px 45px;
  font-size: 16px;
  border-radius: 8px;
  margin-top: 30px;
`;

export default function Privacy() {
  const { setViewModal } = ControlModalStore();
  const handleClose = () => {
    setViewModal(false);
  };
  return (
    <Div>
      <p>
        <strong>1. 수집 항목</strong>
      </p>
      <ul>
        <li>
          이름, 연락처, 나이, 상담 희망일자 및 시간, 학교명/전공/최종학력, 사진,
          추천인, 핵심문의사항
        </li>
      </ul>

      <p>
        <strong>2. 수집 목적</strong>
      </p>
      <ul>
        <li>
          유학 상담 제공, 상담 일정 조율, 지원자 정보 확인 및 맞춤형 안내 제공
        </li>
      </ul>

      <p>
        <strong>3. 보유 및 이용 기간</strong>
      </p>
      <ul>
        <li>수집일로부터 1년간 보관 후 파기</li>
      </ul>

      <p>
        <strong>4. 동의 거부 권리 및 불이익 안내</strong>
      </p>
      <ul>
        <li>
          개인정보 제공을 거부할 수 있으나, 이 경우 상담 서비스 이용이 제한될 수
          있습니다.
        </li>
      </ul>
      <StyleButton
        name="확인"
        Bgcolor="green"
        TitleColor="white"
        onClick={handleClose}
      />
    </Div>
  );
}
