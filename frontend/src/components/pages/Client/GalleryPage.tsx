import Button from "@/components/common/Button";
import PageHeader from "@/components/common/PageHeader";
import Masonry from "react-masonry-css";
import {
  ControlModalStore,
  UseModalStore,
  useUserStore,
} from "@/store/userStore";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import EditModal from "./About&Office/EditModal";
import PageCountUI from "@/components/common/PageCountUI";
import { GetGalleryImages, GetGalleryPage } from "@/api/postApi";
import { GallerySlide } from "@/types/forms";
import ImageOverlay from "@/components/common/ImageOverlay";

const breakpointColumnsObj = {
  default: 3,
  1024: 3,
  768: 2,
  375: 2,
};

const Div = styled.div`
  margin-bottom: 170px;
  img {
    width: 100%;
    margin-bottom: 16px;
    cursor: pointer;
  }
  .my-masonry-grid {
    margin-top: 70px;
    @media (max-width: 1024px) {
      margin-top: 10px;
    }
  }
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
  @media (max-width: 1024px) {
    margin-top: 10px;
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
  const { role } = useUserStore();

  useEffect(() => {
    const fatchGalleryImg = async () => {
      const res = await GetGalleryPage();
      if (res.success) {
        setForm(res.result);
      }
    };
    fatchGalleryImg();
  }, []);

  const handleOverlay = (ImgSrc: string) => {
    setImageModal(true);
    setImageSrc(ImgSrc);
  };
  return (
    <Div>
      <PageHeader title="갤러리" root="갤러리" />
      {role === "admin" && (
        <ButtonWrap>
          <Button
            name="이미지 수정"
            Bgcolor="green"
            TitleColor="white"
            onClick={handleModalOpen}
          />
        </ButtonWrap>
      )}

      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {form?.map((img, index) => (
          <img
            key={index}
            src={img.image_url}
            alt="드림 유학원 관련 이미지"
            loading="lazy"
            onClick={() => handleOverlay(img.image_url)}
          />
        ))}
      </Masonry>

      {ImageModal && <ImageOverlay />}
      {isModalOpen && <EditModal />}
    </Div>
  );
}
