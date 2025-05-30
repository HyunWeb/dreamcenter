import { GetQuestion } from "@/api/postApi";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function QuestionDetail() {
  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    const handleGetQuestion = async () => {
      if (!id) return;
      const res = await GetQuestion(id);
    };
    handleGetQuestion();
  }, [id]);
  return <div>QuestionDetail</div>;
}
