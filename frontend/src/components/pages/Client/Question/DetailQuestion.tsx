import { QuestionData } from "@/types/forms";
import React from "react";
import styled from "styled-components";

const QTitle = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 25px;
  border-top: 1px solid #111111;
  border-bottom: 1px solid #111111;
  margin-top: 60px;

  .meta-Info {
    color: #888888;
    display: flex;
    gap: 12px;
  }
  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 12px;
    .Question_title {
      font-size: 20px;
    }
    .meta-Info {
      font-size: 14px;
    }
  }
`;

const QMessage = styled.div`
  padding: 30px;
  border-bottom: 1px solid #dddddd;
  display: flex;
  flex-direction: column;
  @media (max-width: 1024px) {
    padding: 15px;
  }
`;
const QImage = styled.div`
  margin: 70px 0;
  @media (max-width: 1024px) {
    margin: 30px 0;
    img {
      width: 100%;
    }
  }
`;

type Props = {
  question: QuestionData;
};

export default function DetailQuestion({ question }: Props) {
  const dateObj = question?.createdAt ? new Date(question.createdAt) : null;
  const year = dateObj ? dateObj.getFullYear() : "";
  const month = dateObj ? String(dateObj.getMonth() + 1).padStart(2, "0") : "";
  const date = dateObj ? String(dateObj.getDate()).padStart(2, "0") : "";
  return (
    <section>
      <QTitle>
        <h2 className="Question_title">{question?.title}</h2>
        <div className="meta-Info">
          <span>{question?.nickname}</span>
          <span>|</span>
          <span>{`${year}.${month}.${date}`}</span>
        </div>
      </QTitle>
      <QMessage>{question?.message}</QMessage>
      <QImage>
        {question?.file.map((item, index) => {
          return <img src={item} alt="질문 등록 이미지" key={index} />;
        })}
      </QImage>
    </section>
  );
}
