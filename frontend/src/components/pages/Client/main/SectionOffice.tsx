import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CustomLink from "../../../common/CustomLink";
import { ImgPreviewStore, UseModalStore } from "@/store/userStore";
import { GetOfficeImages } from "@/api/postApi";
import { ImageItem } from "@/types/forms";

const Section = styled.section`
  margin-bottom: 120px;
  @media (max-width: 1024px) {
    margin-bottom: 50px;
  }
  .MainOfficeTitle {
    position: relative;
    padding: 24px 0;
    border-bottom: 1px solid #dddddd;
    margin-bottom: 30px;

    h2 {
      margin-bottom: 12px;
      @media (max-width: 1024px) {
        margin-bottom: 8px;
      }
    }
  }

  .MainOfficeImg {
    @media (max-width: 1024px) {
      width: 100%;
    }
  }
`;

const Ul = styled.ul`
  display: flex;
  justify-content: space-between;
  li {
    width: 30%;
    height: 420px;
    overflow: hidden;
    position: relative;
  }
  img {
    height: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  @media (max-width: 1024px) {
    overflow-x: auto;
    scrollbar-width: none;
    li {
      flex-shrink: 0;
      width: 200px;
      height: 300px;
      border-radius: 10px;
      padding: 20px;
      box-sizing: border-box;
      margin-right: 10px;
    }
  }
`;

export default function SectionOffice() {
  const { imgList } = ImgPreviewStore();
  const [OfficeImg, setOfficeImg] = useState<ImageItem[]>();
  const { setImageModal, setImageSrc } = UseModalStore();

  useEffect(() => {
    const fetchImage = async () => {
      const response = await GetOfficeImages();
      setOfficeImg(response.slides.slice(0, 3));
    };
    fetchImage();
  }, [imgList]);

  const handleOverlay = (ImgSrc: string) => {
    setImageModal(true);
    setImageSrc(ImgSrc);
  };

  return (
    <Section>
      <div className="MainOfficeTitle">
        <h2 className="Section-title">타슈켄트 사무소</h2>
        <p className="Section-description">
          우즈베키스탄 현지에서 직접 관리하며,
          <br /> 학생 여러분의 유학 생활을 든든하게 돕겠습니다.
        </p>
        <CustomLink to={"office"} />
      </div>
      <div className="MainOfficeImg">
        <Ul>
          {OfficeImg?.map((item, index) => {
            return (
              <li key={index} onClick={() => handleOverlay(item.image_url)}>
                <img
                  src={item.image_url}
                  alt="타슈켄트 사무소 사진"
                  loading="lazy"
                />
              </li>
            );
          })}
        </Ul>
      </div>
    </Section>
  );
}
