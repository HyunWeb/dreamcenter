import React, { useEffect } from "react";
import styled from "styled-components";

import PrivateLock from "./PrivateLock";
import Button from "../Button";
import FloatTelePhone from "./FloatTelePhone";
import MyReservation from "./MyReservation";
import Privacy from "./Privacy";
import { ControlModalStore } from "@/store/userStore";

// 뒤 화면을 어둡게 가리는 배경. 클릭하면 모달을 닫는다.
// 알림(CustomAlert)은 모달 위에 보여야 하므로 그보다 낮게 둔다.
const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 95;
  background-color: rgba(0, 0, 0, 0.45);
`;

// 짧은 확인용 모달 (비밀글 비밀번호, 전화 안내)
const SmallPanel = styled.div`
  overflow-y: auto;
  box-sizing: border-box;
  width: 490px;
  height: 410px;
  position: fixed;
  z-index: 96;
  border-radius: 20px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  padding: 40px 60px;

  @media (max-width: 1024px) {
    width: 90%;
    height: 350px;
    max-width: 370px;
    padding: 20px 30px;
  }
`;

// 내용이 긴 모달 (개인정보 안내, 나의 예약 내역): 제목·버튼 고정, 내용만 스크롤
const LargePanel = styled.div`
  position: fixed;
  z-index: 96;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-sizing: border-box;
  width: 640px;
  max-width: 92vw;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.25);
  overflow: hidden;

  @media (max-width: 1024px) {
    max-height: 85vh;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 22px 28px;
  border-bottom: 1px solid #eeeeee;

  h2 {
    font-size: 20px;
    font-weight: 700;
    color: #111111;
  }

  @media (max-width: 1024px) {
    padding: 16px 20px;
    h2 {
      font-size: 17px;
    }
  }
`;

const CloseButton = styled.button`
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 50%;
  background: transparent;
  color: #888888;
  font-size: 24px;
  line-height: 1;
  cursor: pointer;

  &:hover {
    background-color: #f3f3f3;
    color: #111111;
  }
`;

const Body = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 24px 28px;
  text-align: left;

  @media (max-width: 1024px) {
    padding: 16px 20px;
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: center;
  padding: 16px 28px 22px;
  border-top: 1px solid #eeeeee;
`;

const StyleButton = styled(Button)`
  padding: 13px 56px;
  font-size: 16px;
  border-radius: 8px;
`;

const LARGE_TITLES: Record<string, string> = {
  privacy: "개인정보 수집·이용 안내",
  MyReservation: "나의 예약 내역",
};

type Props = {
  type: string;
};
export default function ModalUI({ type }: Props) {
  const { setViewModal } = ControlModalStore();
  const handleClose = () => setViewModal(false);

  // ESC로 닫기 + 모달이 열린 동안 뒤 페이지 스크롤 막기
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setViewModal(false);
    };
    window.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  const largeTitle = LARGE_TITLES[type];

  return (
    <>
      <Backdrop onClick={handleClose} />
      {largeTitle ? (
        <LargePanel role="dialog" aria-modal="true" aria-label={largeTitle}>
          <Header>
            <h2>{largeTitle}</h2>
            <CloseButton type="button" aria-label="닫기" onClick={handleClose}>
              ×
            </CloseButton>
          </Header>
          <Body>
            {type === "MyReservation" && <MyReservation />}
            {type === "privacy" && <Privacy />}
          </Body>
          <Footer>
            <StyleButton
              name="확인"
              Bgcolor="green"
              TitleColor="white"
              onClick={handleClose}
            />
          </Footer>
        </LargePanel>
      ) : (
        <SmallPanel role="dialog" aria-modal="true">
          {type === "privateLock" && <PrivateLock />}
          {type === "FloatTelePhone" && <FloatTelePhone />}
        </SmallPanel>
      )}
    </>
  );
}
