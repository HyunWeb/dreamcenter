import React, { SetStateAction, useState } from "react";
import SearchBar from "./SearchBar";
import ButtonWrap from "./ButtonWrap";
import { FormData } from "@/types/forms";
import TableForm from "./TableForm";
interface MyListSectionProps {
  form: FormData[];
  setForm: React.Dispatch<SetStateAction<FormData[]>>;
}

export default function MyListSection({ form, setForm }: MyListSectionProps) {
  return (
    <section>
      <ButtonWrap form={form} setForm={setForm} />
      <TableForm form={form} setForm={setForm} />
    </section>
  );
}
