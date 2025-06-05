import React, { useState } from "react";
import styled from "styled-components";
import TabSwitch from "./TabSwitch";
import Wysiwyg from "./Wysiwyg";
import Button from "../../../common/Button";
import { useAlertStore, WriteAboutStore } from "@/store/userStore";
import {
  GetAboutWrite,
  GetOfficeWrite,
  PostAboutWrite,
  PostOfficeWrite,
} from "@/api/postApi";
import { useLocation } from "react-router-dom";

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
  const { showAlert } = useAlertStore();
  const [selectTab, setSelectTab] = useState(true);
  const {
    content,
    setContent,
    setEditSection,
    aboutTextData,
    setAboutTextData,
  } = WriteAboutStore();
  const location = useLocation();

  const CancleHandler = () => {
    setContent("");
    setEditSection(true);
  };

  const submitHandler = async () => {
    setEditSection(true);

    if (location.pathname.includes("/about")) {
      await PostAboutWrite(content);
    } else if (location.pathname.includes("/office")) {
      await PostOfficeWrite(content);
    }

    let res;
    if (location.pathname.includes("/about")) {
      res = await GetAboutWrite();
    } else if (location.pathname.includes("/office")) {
      res = await GetOfficeWrite();
    }

    setAboutTextData(res.result.content);
    showAlert("수정이 완료되었습니다.");
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
