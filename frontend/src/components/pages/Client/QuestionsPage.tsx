import PageHeader from "@/components/common/PageHeader";
import React, { useState } from "react";
import styled from "styled-components";
import TableForm from "./Reservation/TableForm";
import Button from "@/components/common/Button";
import { Link } from "react-router-dom";
import PageCountUI from "@/components/common/PageCountUI";
import { QuestionData } from "@/types/forms";
import QTableLIstItems from "./Question/QTableLIstItems";
import ModalUI from "@/components/common/ModalUI";
import { ControlModalStore } from "@/store/userStore";

const Section = styled.section`
  background-color: #f8f8f8;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
  margin: 50px 0 30px;
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 170px;
`;

const ButtonWrap = styled.div`
  margin-top: 20px;
  text-align: right;
`;

export default function QuestionsPage() {
  const { viewModal } = ControlModalStore();
  const [form, setForm] = useState<QuestionData[]>([]);
  return (
    <Div>
      <PageHeader title="질문게시판" root="질문게시판" />
      <Section>
        <select name="" id="">
          <option value="제목">제목</option>
          <option value="글쓴이">글쓴이</option>
        </select>
        <input type="text" placeholder="검색어를 입력하세요" />
        <button>확인</button>
      </Section>
      <TableForm<QuestionData>
        form={form}
        headers={["번호", "제목", "글쓴이", "등록일", "답변여부"]}
      >
        {form.map((form, index) => {
          return <QTableLIstItems form={form} key={index} orderNum={index} />;
        })}
      </TableForm>
      <ButtonWrap>
        <Link to={`/questions/write`}>
          <Button name="글쓰기" Bgcolor="green" TitleColor="white" />
        </Link>
      </ButtonWrap>
      <PageCountUI<QuestionData>
        type="QuestionSubmitList"
        form={form}
        setForm={setForm}
      />
      {viewModal && <ModalUI />}
    </Div>
  );
}
