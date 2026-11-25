import Button from "@/components/common/Button";
import PageHeader from "@/components/common/PageHeader";
import Masonry from "react-masonry-css";
import { UseModalStore, useUserStore } from "@/store/userStore";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import EditModal from "./About&Office/EditModal";
import { GetGalleryImages, GetGalleryPage } from "@/api/postApi";
import { GallerySlide } from "@/types/forms";
import SeoHead from "@/components/common/SeoHead";

const breakpointColumnsObj = {
  default: 3,
  1024: 3,
  768: 2,
  375: 2,
};

// 처음에 그릴 사진 수, 스크롤할 때마다 추가로 그릴 사진 수
const PAGE_SIZE = 24;

const Div = styled.div`
  margin-bottom: 170px;
  img {
    width: 100%;
    margin-bottom: 16px;
    cursor: pointer;
  }
  /* 받기 전 사진도 자리를 차지하게 해서 lazy 로딩이 동작하고 격자가 덜 밀리게 한다.
     (높이 0이면 브라우저가 모든 사진을 화면 안으로 보고 한꺼번에 받는다) */
  img:not(.loaded) {
    min-height: 240px;
    background-color: #f0f0f0;
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
  const { isModalOpen, setIsModalOpen, setImageModal, setImageSrc } =
    UseModalStore();
  const [form, setForm] = useState<GallerySlide[]>([]);
  const handleModalOpen = () => {
    setIsModalOpen(!isModalOpen);
  };
  const { role } = useUserStore();
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fatchGalleryImg = async () => {
      const res = await GetGalleryPage();
      if (res?.success) {
        setForm(res.result);
      }
    };
    fatchGalleryImg();
  }, []);

  // 목록 끝의 감지용 요소가 화면 근처(600px 전)에 오면 다음 사진들을 그린다.
  const hasMore = visibleCount < form.length;
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !hasMore) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((count) => count + PAGE_SIZE);
        }
      },
      { rootMargin: "600px 0px" }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, visibleCount]);

  const handleOverlay = (ImgSrc: string) => {
    setImageModal(true);
    setImageSrc(ImgSrc);
  };
  return (
    <Div>
      <SeoHead
        title="갤러리 | 드림유학원"
        description="드림유학원과 함께한 우즈베키스탄 의대 유학생들의 생생한 현지 활동 사진을 확인하세요."
        path="/gallery"
      />
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
        {form.slice(0, visibleCount).map((img, index) => (
          <img
            key={img.id ?? index}
            src={img.image_url}
            alt="드림 유학원 관련 이미지"
            loading="lazy"
            onLoad={(e) => e.currentTarget.classList.add("loaded")}
            onClick={() => handleOverlay(img.image_url)}
          />
        ))}
      </Masonry>
      {hasMore && <div ref={sentinelRef} aria-hidden="true" />}
      {isModalOpen && <EditModal />}
    </Div>
  );
}
