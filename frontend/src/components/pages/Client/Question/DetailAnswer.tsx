import { AnswerData } from "@/types/forms";
import React from "react";
import styled from "styled-components";

const ASection = styled.section`
  background-color: #f8f8f8;
`;

const ATitle = styled.div`
  background-color: #f8f8f8;
  border-bottom: 1px solid #dddddd;
  padding: 20px 25px;
  display: flex;
  justify-content: space-between;

  .meta-Info {
    color: #888888;
    display: flex;
    gap: 12px;
  }
`;

const Amessage = styled.div`
  white-space: pre-line;
  line-height: 1.5;
  padding: 30px;
`;
type Props = {
  answer: AnswerData;
};
export default function DetailAnswer({ answer }: Props) {
  const dateObj = answer?.createdAt ? new Date(answer.createdAt) : null;
  const year = dateObj ? dateObj.getFullYear() : "";
  const month = dateObj ? String(dateObj.getMonth() + 1).padStart(2, "0") : "";
  const date = dateObj ? String(dateObj.getDate()).padStart(2, "0") : "";
  return (
    <ASection>
      <ATitle>
        <h2 className="Question_title">고객센터 담당자의 답변</h2>
        <div className="meta-Info">
          <span>admin</span>
          <span>|</span>
          <span>{`${year}.${month}.${date}`}</span>
        </div>
      </ATitle>
      <Amessage>{answer.content}</Amessage>
    </ASection>
  );
}
