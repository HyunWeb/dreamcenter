import { GetAnswer, GetQuestion } from "@/api/postApi";
import PageHeader from "@/components/common/PageHeader";
import { AnswerData, QuestionData } from "@/types/forms";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import DetailQuestion from "./Question/DetailQuestion";
import DetailButtons from "./Question/DetailButtons";
import DetailAnswer from "./Question/DetailAnswer";
import WriteAnswer from "./Question/WriteAnswer";
import { useUserStore } from "@/store/userStore";

const Div = styled.div`
  margin-bottom: 170px;

  // 질문과 답변 모두 사용
  .Question_title {
    font-size: 24px;
    font-weight: 700;
  }

  @media (max-width: 1024px) {
    margin-bottom: 100px;
    .Question_title {
      font-size: 20px;
    }
  }
`;

export default function QuestionDetail() {
  const [question, setQuestion] = useState<QuestionData>();
  const [answer, setAnswer] = useState<AnswerData>();
  const [ViewWriteAnswer, setVeiwWriteAnswer] = useState(false);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const handleGetQuestion = async () => {
      if (!id) return;
      const question = await GetQuestion(id);
      setQuestion(question.result);
      const resultA = await GetAnswer(id);
      setAnswer(resultA.result);
    };
    handleGetQuestion();
  }, [id, ViewWriteAnswer]);

  return (
    <Div>
      <PageHeader
        title="질문확인"
        root="질문게시판"
        root1Url="/questions"
        root2="질문확인"
      />
      <DetailButtons
        ViewWriteAnswer={ViewWriteAnswer}
        setVeiwWriteAnswer={setVeiwWriteAnswer}
        answer={answer}
        sns_id={question?.sns_id}
      />
      {question && <DetailQuestion question={question} />}
      {answer && <DetailAnswer answer={answer} />}
      {ViewWriteAnswer && (
        <WriteAnswer setVeiwWriteAnswer={setVeiwWriteAnswer} answer={answer} />
      )}
    </Div>
  );
}
