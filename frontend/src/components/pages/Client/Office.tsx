import PageHeader from "@/components/common/PageHeader";
import React, { useEffect } from "react";
import styled from "styled-components";
import ImgSlice from "./About&Office/ImgSlice";
import {
  AboutAndOfficeStore,
  ImgPreviewStore,
  WriteAboutStore,
} from "@/store/userStore";
import EditModal from "./About&Office/EditModal";
import { GetOfficeImages } from "@/api/postApi";
import ViewBox from "./About&Office/ViewBox";
import WriteBox from "./About&Office/WriteBox";

const Div = styled.div`
  text-align: center;
`;

export default function Office() {
  const { isModalOpen, setIsModalOpen } = AboutAndOfficeStore();
  const { setImagePreview, imgList, setIndex, setImgList, setImgLength } =
    ImgPreviewStore();
  const { editSection, setEditSection } = WriteAboutStore();

  // 저장되어있던 이미지 데이터 불러오기
  useEffect(() => {
    setEditSection(true);
    setIsModalOpen(false);
    const getImg = async () => {
      const response: any = await GetOfficeImages();
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
      <PageHeader title={"타슈켄트 사무소"} root={"타슈켄트 사무소"} />
      <ImgSlice />
      {editSection ? <ViewBox /> : <WriteBox />}
      {isModalOpen && <EditModal />}
    </Div>
  );
}
