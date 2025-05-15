import React from "react";
import styled from "styled-components";
import ImgMovBtn from "./ImgMovBtn";
import Button from "../../../common/Button";

interface ImgViewBoxProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ViewBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  margin-bottom: 40px;
`;

const EditButton = styled(Button)`
  position: absolute;
  right: 110px;
  top: -60px;
`;
const ImgContainer = styled.div`
  width: 80%;
  height: 50vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;
  img {
    width: 100%;
  }
`;

export default function ImgViewBox({ setIsModalOpen }: ImgViewBoxProps) {
  const OpenModal = () => {
    setIsModalOpen((prev) => !prev);
  };
  return (
    <ViewBox>
      <EditButton
        name="이미지 수정"
        Bgcolor="green"
        TitleColor="white"
        onClick={OpenModal}
      />
      <ImgMovBtn direction={"leftBig"} />
      <ImgContainer>
        <img src="./office0.jpg" alt="" />
      </ImgContainer>
      <ImgMovBtn direction={"rightBig"} />
    </ViewBox>
  );
}
