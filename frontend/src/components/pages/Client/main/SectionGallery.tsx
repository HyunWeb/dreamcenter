import React, { useEffect, useState } from "react";

import styled from "styled-components";
import CustomLink from "../../../common/CustomLink";
import { GetGalleryImg } from "@/api/postApi";
import { GallerySlide } from "@/types/forms";
import { UseModalStore } from "@/store/userStore";
import ImageOverlay from "@/components/common/ImageOverlay";

const Section = styled.section`
  position: relative;
  z-index: 1;
  padding-bottom: 150px;

  img {
    width: 100%;
    margin-bottom: 16px;
  }
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100vw;
    height: 100%;
    background-color: #f9f9f9;
    z-index: -1;
  }
  @media (max-width: 1024px) {
    padding-bottom: 70px;
  }
`;

const Header = styled.div`
  text-align: center;
  padding-top: 80px;
  margin-bottom: 54px;

  div {
    position: relative;
  }
  @media (max-width: 1024px) {
    padding-top: 30px;
    margin-bottom: 30px;
  }
`;

const ViewImg = styled.div`
  @media (max-width: 1024px) {
    width: 100%;
    overflow-x: auto;
    scrollbar-width: none;
  }
`;

const Ul = styled.ul`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  @media (max-width: 1024px) {
    flex-wrap: nowrap;
    justify-content: flex-start;
  }
`;
const Li = styled.li`
  padding: 12px;
  box-sizing: border-box;
  width: 25%;
  min-width: 276px;
  overflow: hidden;
  aspect-ratio: 1 / 1; // 1:1 정사각형
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  @media (max-width: 1024px) {
    flex-shrink: 0;
    width: 50vw;
    min-width: 100px;
    padding: 5px;
  }
`;
export default function SectionGallery() {
  const [images, setImages] = useState<GallerySlide[]>();
  const [form, setForm] = useState<GallerySlide[]>([]);
  const {
    isModalOpen,
    setIsModalOpen,
    ImageModal,
    setImageModal,
    ImageSrc,
    setImageSrc,
  } = UseModalStore();

  const fetchGalleryImg = async () => {
    const res = await GetGalleryImg();
    if (res.success) {
      setImages(res.result);
    }
  };
  useEffect(() => {
    fetchGalleryImg();
  }, []);

  const handleOverlay = (ImgSrc: string) => {
    setImageModal(true);
    setImageSrc(ImgSrc);
  };
  return (
    <Section>
      <Header>
        <div>
          <h2 className="Section-title">드림유학원 갤러리</h2>
          <CustomLink to={"gallery"} />
        </div>
      </Header>
      <ViewImg>
        <Ul>
          {images?.map((item, index) => {
            return (
              <Li onClick={() => handleOverlay(item.image_url)} key={index}>
                <img src={item.image_url} alt="갤러리 이미지" />
              </Li>
            );
          })}
        </Ul>
      </ViewImg>
    </Section>
  );
}
