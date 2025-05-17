import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import {
  GetAboutImages,
  GetOfficeImages,
  PostAboutImages,
} from "../../../../api/postApi";
import TabSwitch from "./TabSwitch";

import SaveImgSection from "./Modal/SaveImgSection";
import LoadImgSection from "./Modal/LoadImgSection";
import SwichButtons from "./Modal/SwichButtons";
import { useLocation } from "react-router-dom";

type FileItem = {
  id: string;
  file: File;
};
interface Slide {
  created_at: string;
  id: number;
  name: string;
  image_url: string;
  sort_order: number;
}
const Div = styled.div`
  position: fixed;
  z-index: 10;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 55vw;
  max-width: 880px;
  height: 500px;
  border-radius: 20px;
  background-color: white;
  padding: 40px 60px;
  box-sizing: border-box;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

export default function EditModal() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [existingImages, setExistingImages] = useState<Slide[]>([]);
  const [selectTab, setSelectTab] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const getImageFetch = async () => {
      let response;
      if (location.pathname.includes("/about")) {
        response = await GetAboutImages();
      } else if (location.pathname.includes("/office")) {
        response = await GetOfficeImages();
      }

      setExistingImages(response.slides);
    };
    getImageFetch();
  }, [files]);

  return (
    <Div>
      <TabSwitch
        selectTab={selectTab}
        setSelectTab={setSelectTab}
        Title1="이미지 등록"
        Title2="이미지 목록"
      />
      {selectTab ? (
        <SaveImgSection files={files} setFiles={setFiles} />
      ) : (
        <LoadImgSection
          existingImages={existingImages}
          setExistingImages={setExistingImages}
        />
      )}
      <SwichButtons
        selectTab={selectTab}
        existingImages={existingImages}
        files={files}
        setFiles={setFiles}
      />
    </Div>
  );
}
