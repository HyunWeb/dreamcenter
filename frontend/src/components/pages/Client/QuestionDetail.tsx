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

const Div = styled.div`
  .Question_title {
    font-size: 24px;
    font-weight: 700;
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
      const answer = await GetAnswer(id);
      console.log(answer);
      setAnswer(answer.Answer);
    };
    handleGetQuestion();
  }, [id]);

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
      />
      {question && <DetailQuestion question={question} />}
      {answer && <DetailAnswer answer={answer} />}
      {ViewWriteAnswer && <WriteAnswer />}
    </Div>
  );
}
