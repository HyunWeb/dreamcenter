import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { MainStore, useUserStore } from "@/store/userStore";
import { GetMainAbout } from "@/api/postApi";

const AboutSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
  color: white;
  height: 633px;
  margin-bottom: 120px;
  @media (max-width: 1024px) {
    margin-bottom: 50px;
    height: 500px;
  }

  button {
    width: 86px;
    height: 54px;
    position: absolute;
    z-index: 1;
    right: 10px;
    top: 10px;
    background-color: transparent;

    color: white;
    border: none;
    cursor: pointer;
    padding: 0;
    svg {
      width: 30px;
      height: 30px;
    }

    @media (max-width: 1024px) {
      width: 30px;
      height: 30px;

      svg {
        width: 25px;
        height: 25px;
      }
    }
  }

  /* 이미지가 오기 전 자리를 채우는 어두운 바탕 (기본 사진이 잠깐 보이지 않도록) */
  &::before {
    content: "";
    width: 100vw;
    height: 100%;
    position: absolute;
    z-index: 0;
    background-color: #1c1f1b;
  }

  div {
    position: relative;
    z-index: 1;

    h1 {
      font-size: 24px;
      font-weight: 500;
      margin-bottom: 10px;
      @media (max-width: 1024px) {
        font-size: 20px;
      }
    }
    h2 {
      font-size: 36px;
      font-weight: 600;
      margin-bottom: 20px;
      @media (max-width: 1024px) {
        font-size: 23px;
        line-height: 1.2;
        text-align: center;
      }
    }

    p {
      margin-bottom: 50px;
      line-height: 1.3;
      @media (max-width: 1024px) {
        font-size: 14px;
      }
    }

    a {
      text-decoration: none;
      background-color: transparent;
      border: 1px solid #ffffff6b;
      border-radius: 5px;
      color: white;
      padding: 10px 24px;
      transition-duration: 200ms;

      &:hover {
        border: 1px solid white;
      }

      @media (max-width: 1024px) {
        font-size: 14px;
      }
    }
  }
`;

// 설정된 배경 사진 레이어. 사진을 다 받은 뒤에만 보이게 해서 깜빡임을 없앤다.
const BackgroundLayer = styled.span<{ $imageUrl: string; $visible: boolean }>`
  width: 100vw;
  height: 100%;
  position: absolute;
  z-index: 0;
  background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
    url(${(props) => props.$imageUrl});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  opacity: ${(props) => (props.$visible ? 1 : 0)};
  transition: opacity 0.4s ease;
`;

const Content = styled.div<{ $visible: boolean }>`
  opacity: ${(props) => (props.$visible ? 1 : 0)};
  transition: opacity 0.3s ease;
`;

const Paragraph = styled.p`
  white-space: pre-line;
`;
const DEFAULT_IMAGE = "defaultBanner.png";
const CACHE_KEY = "dreamcenter:mainAbout";

// 지난 방문 때 받은 메인 데이터. 재방문 시 기본값 대신 바로 이 값으로 그린다.
const readCache = () => {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export default function SectionAbout() {
  const { setIsModalOpen, MainAbout, setMainAbout } = MainStore();
  const { role } = useUserStore();
  // 서버(또는 캐시) 데이터를 받았는지. 받기 전에는 기본 문구·사진을 보여주지 않는다.
  const [dataReady, setDataReady] = useState(false);
  // 화면에 띄울 수 있게 다 받아진 사진 주소
  const [loadedImage, setLoadedImage] = useState<string | null>(null);

  useEffect(() => {
    const cached = readCache();
    if (cached) {
      setMainAbout(cached);
      setDataReady(true);
    }

    const fetchMain = async () => {
      const res = await GetMainAbout();
      if (res?.result) {
        setMainAbout(res.result);
      } else if (!cached) {
        // 서버 응답이 없으면 기본 사진으로 대신한다.
        setLoadedImage(DEFAULT_IMAGE);
      }
      setDataReady(true);
    };
    fetchMain();
  }, []);

  // 사진 주소가 정해지거나 관리자가 사진을 바꾸면, 미리 받아둔 뒤 교체한다.
  const imageUrl = MainAbout?.image_url;
  useEffect(() => {
    if (!imageUrl) return;
    let cancelled = false;
    const img = new Image();
    img.onload = () => !cancelled && setLoadedImage(imageUrl);
    img.onerror = () => !cancelled && setLoadedImage(DEFAULT_IMAGE);
    img.src = imageUrl;
    return () => {
      cancelled = true;
    };
  }, [imageUrl]);

  // 최신 메인 데이터를 다음 방문용으로 저장
  useEffect(() => {
    if (!MainAbout?.image_url) return;
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify(MainAbout));
    } catch {
      // 저장 공간을 쓸 수 없는 환경이면 캐시 없이 동작한다.
    }
  }, [MainAbout]);

  return (
    <AboutSection>
      <BackgroundLayer
        $imageUrl={loadedImage ?? ""}
        $visible={loadedImage !== null}
        aria-hidden="true"
      />
      {role === "admin" && (
        <button onClick={() => setIsModalOpen(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-pencil-square"
            viewBox="0 0 16 16"
          >
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
            <path
              fillRule="evenodd"
              d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
            />
          </svg>
        </button>
      )}
      <Content $visible={dataReady}>
        <h1>{MainAbout?.title_main || "우즈베키스탄 의대 유학 전문 드림유학원"}</h1>
        <h2>
          {MainAbout?.title_sub ||
            "드림유학원, 당신의 글로벌 미래를 응원합니다."}
        </h2>
        <Paragraph>
          {MainAbout?.content ||
            "2020 ~ 2025 우즈베키스탄 의대 전체 수속 학생수 1위"}
        </Paragraph>
        <Link to="/about">자세히 보기</Link>
      </Content>
    </AboutSection>
  );
}
