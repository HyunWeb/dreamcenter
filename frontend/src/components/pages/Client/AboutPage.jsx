import React, { useState } from "react";
import PageHeader from "../../common/PageHeader";
import styled from "styled-components";
import ImgViewBox from "./About/ImgViewBox";
import ImgListBox from "./About/ImgListBox";
import Wysiwyg from "./About/Wysiwyg";
import TabSwitch from "./About/TabSwitch";
import Button from "../../common/Button";

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

const WriteSection = styled.section`
  margin-bottom: 120px;
`;

const ViewSection = styled.section`
  margin-bottom: 120px;
  position: relative;
  text-align: left;
  padding: 20px;
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
`;

const EditButton = styled(Button)`
  position: absolute;
  top: 0;
  right: 0;
  transform: translateY(-100%);
`;
export default function AboutPage() {
  const [content, setContent] = useState("");
  const [selectTab, setSelectTab] = useState(true);
  const [editSection, setEditSection] = useState(true);

  const ChangeState = () => {
    setEditSection((prev) => !prev);
  };
  return (
    <Div>
      <PageHeader title={"드림유학원"} root={"드림유학원"} />
      <Section>
        <ImgViewBox />
        <ImgListBox />
      </Section>
      {editSection ? (
        <ViewSection>
          {/* <EditButton onClick={ChangeState}>수정하기</EditButton> */}
          <EditButton
            name="내용 수정"
            Bgcolor="green"
            TitleColor="white"
            onClick={ChangeState}
          />
          <div
            className="editor-preview"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </ViewSection>
      ) : (
        <WriteSection>
          <TabSwitch selectTab={selectTab} setSelectTab={setSelectTab} />
          {selectTab ? (
            <Wysiwyg content={content} setContent={setContent} />
          ) : (
            <div
              className="editor-preview"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          )}
          <ButtonWrap>
            <Button
              name="취소"
              Bgcolor="grey"
              TitleColor="black"
              onClick={ChangeState}
            />
            <Button name="등록" Bgcolor="green" TitleColor="white" />
          </ButtonWrap>
        </WriteSection>
      )}
    </Div>
  );
}
