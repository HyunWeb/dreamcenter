import React, { useState } from "react";
import styled from "styled-components";
import TabSwitch from "./TabSwitch";
import Wysiwyg from "./Wysiwyg";
import Button from "../../../common/Button";

interface ViewBoxProps {
  content: string;
  setContent: () => void;
  ChangeState: () => void;
}

const WriteSection = styled.section`
  margin-bottom: 120px;
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
`;

export default function WriteBox({
  content,
  setContent,
  ChangeState,
}: ViewBoxProps) {
  const [selectTab, setSelectTab] = useState(true);
  return (
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
  );
}
