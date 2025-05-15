import React, { useEffect, useState } from "react";
import PageHeader from "../../common/PageHeader";
import styled from "styled-components";
import ImgViewBox from "./About/ImgViewBox";
import ImgListBox from "./About/ImgListBox";

import ViewBox from "./About/ViewBox";
import WriteBox from "./About/WriteBox";
import EditModal from "./About/EditModal";

type Slide = {
  created_at: string;
  id: number;
  name: string;
  image_url: string;
  sort_order: number;
};

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
  const [content, setContent] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editSection, setEditSection] = useState(true);
  const [imgList, setImgList] = useState<Slide[]>([]);
  const [imgPreview, setImagePreview] = useState("");

  useEffect(() => {
    if (!imgList) return;
    setImagePreview(imgList[0]?.image_url);
  }, [imgList]);

  const ChangeState = () => {
    setEditSection((prev) => !prev);
  };

  return (
    <Div>
      <PageHeader title={"드림유학원"} root={"드림유학원"} />
      <Section>
        <ImgViewBox setIsModalOpen={setIsModalOpen} imgPreview={imgPreview} />
        <ImgListBox
          setImagePreview={setImagePreview}
          setImgList={setImgList}
          imgList={imgList}
        />
      </Section>
      {editSection ? (
        <ViewBox content={content} ChangeState={ChangeState} />
      ) : (
        <WriteBox
          content={content}
          setContent={setContent}
          ChangeState={ChangeState}
        />
      )}
      {isModalOpen && <EditModal setIsModalOpen={setIsModalOpen} />}
    </Div>
  );
}
