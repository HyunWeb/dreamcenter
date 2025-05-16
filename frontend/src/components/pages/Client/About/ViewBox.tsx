import { WriteAboutStore } from "@/store/userStore";
import Button from "../../../common/Button";
import React, { useEffect } from "react";
import styled from "styled-components";
import { GetAboutWrite } from "@/api/postApi";

const ViewSection = styled.section`
  margin-bottom: 120px;
  position: relative;
  text-align: left;
  padding: 20px;
`;

const EditButton = styled(Button)`
  position: absolute;
  top: 0;
  right: 0;
  transform: translateY(-100%);
`;

export default function ViewBox() {
  const { setEditSection, setContent, aboutTextData, setAboutTextData } =
    WriteAboutStore();

  useEffect(() => {
    const fetchText = async () => {
      const res = await GetAboutWrite();
      setAboutTextData(res.result.content);
    };
    fetchText();
  }, []);

  const OpenHandler = () => {
    setEditSection(false);
    setContent(aboutTextData);
  };
  return (
    <ViewSection>
      {/* <EditButton onClick={ChangeState}>수정하기</EditButton> */}
      <EditButton
        name="내용 수정"
        Bgcolor="green"
        TitleColor="white"
        onClick={OpenHandler}
      />
      <div
        className="editor-preview"
        dangerouslySetInnerHTML={{ __html: aboutTextData }}
      />
    </ViewSection>
  );
}
