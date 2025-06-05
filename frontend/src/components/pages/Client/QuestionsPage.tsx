import PageHeader from "@/components/common/PageHeader";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TableForm from "./Reservation/TableForm";
import Button from "@/components/common/Button";
import { Link, useNavigate } from "react-router-dom";
import PageCountUI from "@/components/common/PageCountUI";
import { QuestionData } from "@/types/forms";
import QTableLIstItems from "./Question/QTableLIstItems";
import ModalUI from "@/components/common/Modal/ModalUI";
import {
  ControlModalStore,
  SearchStore,
  useUserStore,
} from "@/store/userStore";
import Search from "./Question/Search";

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
  const { isLogin } = useUserStore();
  const { viewModal } = ControlModalStore();
  const [form, setForm] = useState<QuestionData[]>([]);
  const { searchList, setSearchList } = SearchStore();
  const navigate = useNavigate();
  useEffect(() => {
    setSearchList(false);
    return () => setSearchList(false); // cleanup
  }, []);

  return (
    <Div>
      <PageHeader title="질문게시판" root="질문게시판" />
      <Search setForm={setForm} />
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

      {searchList ? (
        <PageCountUI<QuestionData>
          type="SearchList"
          form={form}
          setForm={setForm}
        />
      ) : (
        <PageCountUI<QuestionData>
          type="QuestionSubmitList"
          form={form}
          setForm={setForm}
        />
      )}
    </Div>
  );
}
