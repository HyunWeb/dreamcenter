import React, { useState } from "react";
import styled from "styled-components";
import TabSwitch from "./TabSwitch";
import Wysiwyg from "./Wysiwyg";
import Button from "../../../common/Button";
import { WriteAboutStore } from "@/store/userStore";
import { GetAboutWrite, PostAboutWrite } from "@/api/postApi";

const WriteSection = styled.section`
  margin-bottom: 120px;
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
`;

export default function WriteBox() {
  const [selectTab, setSelectTab] = useState(true);
  const {
    content,
    setContent,
    setEditSection,
    aboutTextData,
    setAboutTextData,
  } = WriteAboutStore();

  const CancleHandler = () => {
    setContent("");
    setEditSection(true);
  };

  const submitHandler = async () => {
    setEditSection(true);
    if (content === "") return;
    await PostAboutWrite(content);
    const res = await GetAboutWrite();
    setAboutTextData(res.result.content);
  };
  return (
    <WriteSection>
      <TabSwitch
        selectTab={selectTab}
        setSelectTab={setSelectTab}
        Title1="작성하기"
        Title2="미리보기"
      />
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
          onClick={CancleHandler}
        />
        <Button
          name="등록"
          Bgcolor="green"
          TitleColor="white"
          onClick={submitHandler}
        />
      </ButtonWrap>
    </WriteSection>
  );
}
