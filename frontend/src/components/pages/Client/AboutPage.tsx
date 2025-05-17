import React, { useEffect, useState } from "react";
import PageHeader from "../../common/PageHeader";
import styled from "styled-components";

import ViewBox from "./About&Office/ViewBox";
import WriteBox from "./About&Office/WriteBox";
import EditModal from "./About&Office/EditModal";
import {
  AboutAndOfficeStore,
  ImgPreviewStore,
  WriteAboutStore,
} from "@/store/userStore";
import ImgSlice from "./About&Office/ImgSlice";
import { GetAboutImages } from "@/api/postApi";

// type Slide = {
//   created_at: string;
//   id: number;
//   name: string;
//   image_url: string;
//   sort_order: number;
// };

const Div = styled.div`
  text-align: center;
`;

export default function AboutPage() {
  const { setImagePreview, imgList, setIndex, setImgList, setImgLength } =
    ImgPreviewStore();
  const { editSection, setEditSection } = WriteAboutStore();
  const { isModalOpen, setIsModalOpen } = AboutAndOfficeStore();
  // const [imgLength, setImgLength] = useState<number>(0);

  // 저장되어있던 이미지 데이터 불러오기
  useEffect(() => {
    setEditSection(true);
    setIsModalOpen(false);
    const getImg = async () => {
      const response: any = await GetAboutImages();
      setImgList(response.slides);
      setImgLength(response.slides.length);
      setIndex(0);
    };
    getImg();
  }, []);

  useEffect(() => {
    if (!imgList) return;
    setImagePreview(imgList[0]?.image_url);
  }, [imgList, setImagePreview]);

  return (
    <Div>
      <PageHeader title={"드림유학원"} root={"드림유학원"} />
      <ImgSlice />
      {editSection ? <ViewBox /> : <WriteBox />}
      {isModalOpen && <EditModal />}
    </Div>
  );
}
