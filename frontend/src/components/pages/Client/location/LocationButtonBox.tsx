import { PostLocation } from "@/api/postApi";
import Button from "@/components/common/Button";
import { MapStore, useAlertStore } from "@/store/userStore";
import React from "react";
import styled from "styled-components";
import { geocode } from "./geocode";

const ButtonBox = styled.div`
  display: flex;
  gap: 24px;
  justify-content: center;
  align-items: center;
  margin-top: 60px;
  @media (max-width: 1024px) {
    margin-top: 30px;
  }
`;
const StyleButton = styled(Button)`
  padding: 15px 45px;
  font-size: 16px;
  border-radius: 8px;
  @media (max-width: 1024px) {
    padding: 12px 40px;
    font-size: 15px;
  }
`;

export default function LocationButtonBox() {
  const { showAlert } = useAlertStore();
  const {
    setIsModalOpen,
    address,
    setAddress,
    setEditAdress,
    phone1,
    phone2,
    OPDays,
    startTime,
    endTime,
  } = MapStore();

  const handleCancle = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async () => {
    const data = {
      address,
      phone1,
      phone2,
      OPDays,
      startTime,
      endTime,
    };
    try {
      if (!phone1.length) {
        showAlert("메인 전화번호를 입력해주세요");
        return;
      }
      const result = await geocode(address);
      const res = await PostLocation(data);
      console.log(data);
      if (res.message) {
        showAlert("성공적으로 저장되었습니다.");
        setIsModalOpen(false);
        setEditAdress(address);
      }
    } catch (err) {
      showAlert("주소가 유효하지 않습니다.");
    }
  };
  return (
    <ButtonBox>
      <StyleButton
        name="취소"
        Bgcolor="grey"
        TitleColor="darkGrey"
        onClick={handleCancle}
      />
      <StyleButton
        name="수정"
        Bgcolor="green"
        TitleColor="white"
        onClick={handleSubmit}
      />
    </ButtonBox>
  );
}
