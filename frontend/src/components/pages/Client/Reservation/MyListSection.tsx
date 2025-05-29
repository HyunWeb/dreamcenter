import React, { SetStateAction, useState } from "react";
import SearchBar from "./SearchBar";
import ButtonWrap from "./ButtonWrap";
import { FormData } from "@/types/forms";
import TableForm from "./TableForm";
import TableListItem from "./TableListItem";
interface MyListSectionProps {
  form: FormData[];
  setForm: React.Dispatch<SetStateAction<FormData[]>>;
}

export default function MyListSection({ form, setForm }: MyListSectionProps) {
  return (
    <section>
      <ButtonWrap form={form} setForm={setForm} />
      <TableForm<FormData>
        form={form}
        headers={["선택", "번호", "신청인", "등록일", "확인여부"]}
      >
        {form.map((form, index) => {
          return <TableListItem form={form} key={index} orderNum={index} />;
        })}
      </TableForm>
    </section>
  );
}
