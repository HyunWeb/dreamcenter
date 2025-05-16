import React, { useEffect, useState } from "react";
import PageHeader from "../../common/PageHeader";
import styled from "styled-components";
import ImgViewBox from "./About/ImgViewBox";
import ImgListBox from "./About/ImgListBox";

import ViewBox from "./About/ViewBox";
import WriteBox from "./About/WriteBox";
import EditModal from "./About/EditModal";
import { ImgPreviewStore, WriteAboutStore } from "@/store/userStore";

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
const Section = styled.section`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 100px;
`;

export default function AboutPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [editSection, setEditSection] = useState(true);
  const { setImagePreview, imgList } = ImgPreviewStore();
  const { content, editSection } = WriteAboutStore();

  useEffect(() => {
    if (!imgList) return;
    setImagePreview(imgList[0]?.image_url);
    console.log(imgList);
  }, [imgList, setImagePreview]);

  return (
    <Div>
      <PageHeader title={"드림유학원"} root={"드림유학원"} />
      <Section>
        <ImgViewBox setIsModalOpen={setIsModalOpen} />
        <ImgListBox />
      </Section>
      {editSection ? <ViewBox /> : <WriteBox />}
      {isModalOpen && <EditModal setIsModalOpen={setIsModalOpen} />}
    </Div>
  );
}
