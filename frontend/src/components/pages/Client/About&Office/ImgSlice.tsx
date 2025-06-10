import React from "react";
import styled from "styled-components";
import ImgViewBox from "./ImgViewBox";
import ImgListBox from "./ImgListBox";
import { UseModalStore, useUserStore } from "@/store/userStore";
import Button from "@/components/common/Button";

const Section = styled.section`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 100px;
  @media (max-width: 1024px) {
    margin-top: 0px;
  }
`;

const EditButton = styled(Button)`
  /* position: absolute;
  right: 110px;
  top: -60px; */
  align-self: flex-end;
  margin-bottom: 20px;

  @media (max-width: 1024px) {
    right: 0px;
    top: 10px;
    font-size: 13px;
    padding: 8px 12px;
  }
`;
export default function ImgSlice() {
  const { setIsModalOpen } = UseModalStore();
  const { role } = useUserStore();
  const OpenModal = () => {
    setIsModalOpen(true);
  };
  return (
    <Section>
      {role === "admin" && (
        <EditButton
          name="이미지 수정"
          Bgcolor="green"
          TitleColor="white"
          onClick={OpenModal}
        />
      )}
      <ImgViewBox />
      <ImgListBox />
    </Section>
  );
}
