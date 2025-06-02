import Button from "@/components/common/Button";
import PageHeader from "@/components/common/PageHeader";
import { ControlModalStore, UseModalStore } from "@/store/userStore";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import EditModal from "./About&Office/EditModal";
import PageCountUI from "@/components/common/PageCountUI";
import { GetGalleryImages } from "@/api/postApi";
import { GallerySlide } from "@/types/forms";
import ImageOverlay from "@/components/common/ImageOverlay";

const Div = styled.div`
  margin-bottom: 170px;
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
`;

const Ul = styled.ul`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
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
`;

export default function GalleryPage() {
  const {
    isModalOpen,
    setIsModalOpen,
    ImageModal,
    setImageModal,
    ImageSrc,
    setImageSrc,
  } = UseModalStore();
  const [form, setForm] = useState<GallerySlide[]>([]);
  const handleModalOpen = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleOverlay = (ImgSrc: string) => {
    setImageModal(true);
    setImageSrc(ImgSrc);
  };
  return (
    <Div>
      <PageHeader title="갤러리" root="갤러리" />
      <ButtonWrap>
        <Button
          name="이미지 수정"
          Bgcolor="green"
          TitleColor="white"
          onClick={handleModalOpen}
        />
      </ButtonWrap>
      <Ul>
        {form.map((item, index) => {
          return (
            <Li onClick={() => handleOverlay(item.image_url)} key={index}>
              <img src={item.image_url} alt="갤러리 이미지" />
            </Li>
          );
        })}
      </Ul>
      <PageCountUI<GallerySlide>
        form={form}
        setForm={setForm}
        type="GalleryImage"
      />

      {ImageModal && <ImageOverlay />}
      {isModalOpen && <EditModal />}
    </Div>
  );
}
