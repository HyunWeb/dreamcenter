import React, { useState } from "react";
import styled from "styled-components";
import { ReactSortable } from "react-sortablejs";
import PreviewImgList from "../Modal/PreviewImgList";

const Section = styled.section`
  display: flex;
  margin-top: 40px;
  justify-content: space-around;
  align-items: flex-start;
  height: 50%;
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
`;

const PreviewImg = styled.div`
  width: 40%;
  height: 100%;
  background-color: #dddddd;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  img {
    width: 100%;
  }

  svg {
    width: 45px;
    height: 45px;
    color: #888888;
  }
`;
interface Slide {
  created_at: string;
  id: number;
  name: string;
  image_url: string;
  sort_order: number;
}

interface LoadImgSectionProps {
  existingImages: Slide[];
  setExistingImages: React.Dispatch<React.SetStateAction<Slide[]>>;
}
export default function LoadImgSection({
  existingImages,
  setExistingImages,
}: LoadImgSectionProps) {
  const [prevImg, setPrevImg] = useState("");
  return (
    <Section>
      <PreviewImg>
        {prevImg ? (
          <img src={prevImg} alt="미리보기 사진" />
        ) : (
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
        )}
      </PreviewImg>
      <ReactSortable
        tag="ul"
        list={existingImages}
        setList={setExistingImages}
        animation={150}
        style={{
          width: "50%",
          overflowY: "auto",
          height: "100%",
          scrollbarWidth: "thin",
        }}
      >
        {existingImages.map((file, index) => (
          <PreviewImgList
            file={file}
            key={index}
            existingImages={existingImages}
            setExistingImages={setExistingImages}
            setPrevImg={setPrevImg}
          />
        ))}
      </ReactSortable>
    </Section>
  );
}
