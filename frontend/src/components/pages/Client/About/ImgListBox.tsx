import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import ImgMovBtn from "./ImgMovBtn";
import { GetAboutImages } from "../../../../api/postApi";

interface Slide {
  created_at: string;
  id: number;
  name: string;
  image_url: string;
  sort_order: number;
}

interface setImagePreviewProps {
  setImagePreview: React.Dispatch<React.SetStateAction<string>>;
  setImgList: React.Dispatch<React.SetStateAction<Slide[]>>;
  imgList: Slide[];
}

const Div = styled.div`
  position: relative;
`;

const ImgListView = styled.div`
  width: 100%;
  overflow: hidden;
`;

const ImageList = styled.ul<{ $imgLeng: number }>`
  display: flex;
  margin-left: 0;
  /* transition-duration: 200ms; */
  width: ${(props) => `calc(100% / 4 * ${props.$imgLeng})`};
`;

const ImgListItem = styled.li<{ $imgLeng: number }>`
  height: 20vh;
  width: ${(props) => `calc(100% / ${props.$imgLeng})`};
  padding: 5px;
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
`;
export default function ImgListBox({
  setImagePreview,
  setImgList,
  imgList,
}: setImagePreviewProps) {
  const [imgLength, setImgLength] = useState<number>(0);
  useEffect(() => {
    const getImg = async () => {
      const response = await GetAboutImages();
      setImgList(response.slides);
      setImgLength(response.slides.length);
    };
    getImg();
  }, []);
  const ulRef = useRef<HTMLUListElement>(null);

  const handleRightMov = () => {
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

  const ClickImg = (url: string) => {
    setImagePreview(url);
  };

  return (
    <Div>
      <ImgMovBtn direction="leftSmall" onClick={handleLeftMov} />
      <ImgListView>
        <ImageList ref={ulRef} $imgLeng={imgLength}>
          {imgList.map((item, index) => (
            <ImgListItem key={index} $imgLeng={imgLength}>
              <img
                src={item.image_url}
                alt="유학원 사진"
                onClick={() => ClickImg(item.image_url)}
              />
            </ImgListItem>
          ))}
        </ImageList>
      </ImgListView>
      <ImgMovBtn direction="rightSmall" onClick={handleRightMov} />
    </Div>
  );
}
