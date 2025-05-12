import React from "react";
import Masonry from "react-masonry-css";
import styled from "styled-components";
import CustomLink from "../../../common/CustomLink";

const breakpointColumnsObj = {
  default: 3,
  1100: 2,
  700: 1,
};
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
`;

const Header = styled.div`
  text-align: center;
  padding-top: 80px;
  margin-bottom: 54px;

  div {
    position: relative;
  }
`;
export default function SectionGallery() {
  const images: string[] = [
    "./news0.jpg",
    "./office0.jpg",
    "./office0.jpg",
    "./office1.jpg",
    "./office0.jpg",
    "./news0.jpg",
    "./office0.jpg",
    "./office0.jpg",
    "./office0.jpg",
  ];
  return (
    <Section>
      <Header>
        <div>
          <h2 className="Section-title">드림유학원 갤러리</h2>
          <CustomLink to={"gallery"} />
        </div>
      </Header>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt="드림 유학원 관련 이미지"
            loading="lazy"
          />
        ))}
      </Masonry>
    </Section>
  );
}
