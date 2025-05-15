import Button from "../../../common/Button";
import React from "react";
import styled from "styled-components";

interface ViewBoxProps {
  content: string;
  ChangeState: () => void;
}

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

export default function ViewBox({ content, ChangeState }: ViewBoxProps) {
  return (
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
  );
}
