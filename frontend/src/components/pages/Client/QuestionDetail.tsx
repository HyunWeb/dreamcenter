import React from "react";
import { useParams } from "react-router-dom";

export default function QuestionDetail() {
  const { id } = useParams<{ id: string }>();
  return <div>QuestionDetail</div>;
}
