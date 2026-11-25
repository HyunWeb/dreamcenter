import React, { useEffect } from "react";
import styled from "styled-components";
import ImgMovBtn from "./ImgMovBtn";
import {
  UseModalStore,
  ImgPreviewStore,
  useUserStore,
} from "@/store/userStore";

const ViewBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-bottom: 40px;
  overflow: hidden;
`;

// 큰 사진: PC·모바일 모두 정사각형 틀에 사진을 꽉 채워 보여준다.
// (예전에는 PC가 가로 80% × 세로 50vh라 사진 위아래가 크게 잘렸고,
//  모바일은 기기 높이에 따라 비율이 달라졌다.)
const ImgContainer = styled.div`
  width: min(80%, 640px);
  aspect-ratio: 1 / 1;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  div {
    width: 100%;
    height: 100%;
    background-color: #dddddd;
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
      color: #888888;
      width: 20%;
      height: 20%;
    }
  }

  @media (max-width: 1024px) {
    width: 100%;
  }
`;

export default function ImgViewBox() {
  const { imgPreview, index, imgList, setImagePreview, setIndex } =
    ImgPreviewStore();
  const { setIsModalOpen, setImageModal, setImageSrc } = UseModalStore();

  const handleRightMove = () => {
    if (!imgList.length) return;
    let nextIndex;
    if (index === imgList.length - 1) {
      nextIndex = 0;
    } else {
      nextIndex = index + 1;
    }
    const nextImgUrl = imgList[nextIndex].image_url;
    setImagePreview(nextImgUrl);
    setIndex(nextIndex);
  };

  const handleLeftMove = () => {
    if (!imgList.length) return;
    let prevIndex;
    if (index === 0) {
      prevIndex = imgList.length - 1;
    } else {
      prevIndex = index - 1;
    }
    const prevImgUrl = imgList[prevIndex].image_url;
    setImagePreview(prevImgUrl);
    setIndex(prevIndex);
  };

  const handleOverlay = (ImgSrc: string) => {
    setImageModal(true);
    setImageSrc(ImgSrc);
  };
  return (
    <ViewBox>
      <ImgMovBtn direction={"leftBig"} onClick={handleLeftMove} />
      <ImgContainer>
        {imgPreview ? (
          <img
            src={imgPreview}
            alt="유학원 이미지"
            onClick={() => handleOverlay(imgPreview)}
          />
        ) : (
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-image"
              viewBox="0 0 16 16"
            >
              <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
              <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1z" />
            </svg>
          </div>
        )}
      </ImgContainer>
      <ImgMovBtn direction={"rightBig"} onClick={handleRightMove} />
    </ViewBox>
  );
}
