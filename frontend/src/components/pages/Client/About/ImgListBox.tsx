import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import ImgMovBtn from "./ImgMovBtn";
import { GetAboutImages } from "../../../../api/postApi";
import { ImgPreviewStore } from "@/store/userStore";

const Div = styled.div`
  width: 100%;
  position: relative;
`;

const ImgListView = styled.div`
  width: 100%;
  overflow: hidden;
`;

const ImageList = styled.ul<{ $imgLeng: number }>`
  display: flex;
  margin-left: 0;
  width: ${(props) =>
    `calc(100% / 4 * ${props.$imgLeng ? props.$imgLeng : 4})`};

  div {
  }
`;

const ImgListItem = styled.li<{ $imgLeng: number }>`
  height: 20vh;
  width: ${(props) => `calc(100% / ${props.$imgLeng})`};
  box-sizing: border-box;
  flex-shrink: 0;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  img {
    width: 100%;
  }
  div {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #dddddd;
    margin: 5px;
    svg {
      color: #888888;
      width: 30px;
      height: 30px;
    }
  }
`;
export default function ImgListBox() {
  const [imgLength, setImgLength] = useState<number>(0);
  const ulRef = useRef<HTMLUListElement>(null);

  const { setImagePreview, setIndex, setImgList, imgList, index } =
    ImgPreviewStore();

  // 저장되어있던 이미지 데이터 불러오기
  useEffect(() => {
    const getImg = async () => {
      const response = await GetAboutImages();
      setImgList(response.slides);
      setImgLength(response.slides.length);
      setIndex(0);
    };
    getImg();
  }, []);

  const handleRightMov = () => {
    if (!imgList.length) return;
    if (!ulRef.current) return;
    const ul = ulRef.current;
    ul.style.transitionDuration = "200ms";
    ul.style.marginLeft = "-25%";

    setTimeout(() => {
      ul.style.transitionDuration = "0ms";
      const first = ul.firstElementChild;
      if (first) ul.appendChild(first);
      ul.style.marginLeft = "0";
    }, 200);
  };

  const handleLeftMov = () => {
    if (!imgList.length) return;
    if (!ulRef.current) return;
    const ul = ulRef.current;

    const last = ul.lastElementChild;
    if (last) ul.prepend(last);

    ul.style.transition = "none";
    ul.style.marginLeft = "-25%";
    void ul.offsetHeight;
    ul.style.transition = "margin-left 200ms ease";
    ul.style.marginLeft = "0";
  };

  const ClickImg = (
    e: React.MouseEvent<HTMLLIElement>,
    url: string,
    index: number
  ) => {
    setImagePreview(url);
    setIndex(index);
  };
  return (
    <Div>
      <ImgMovBtn direction="leftSmall" onClick={handleLeftMov} />
      <ImgListView className="ViewBox">
        <ImageList ref={ulRef} $imgLeng={imgLength}>
          {imgList.length ? (
            imgList.map((item, indexNum) => (
              <ImgListItem
                key={indexNum}
                $imgLeng={imgLength}
                onClick={(e) => ClickImg(e, item.image_url, item.sort_order)}
                className={indexNum === index ? "selected" : "deSelected"}
              >
                <img src={item.image_url} alt="유학원 사진" />
              </ImgListItem>
            ))
          ) : (
            <>
              {Array.from({ length: 4 }).map((_, i) => (
                // 더미 이미지
                <ImgListItem $imgLeng={4} key={i}>
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
                </ImgListItem>
              ))}
            </>
          )}
        </ImageList>
      </ImgListView>
      <ImgMovBtn direction="rightSmall" onClick={handleRightMov} />
    </Div>
  );
}
