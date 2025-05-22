import React, { useState } from "react";
import SearchBar from "./SearchBar";
import ButtonWrap from "./ButtonWrap";
import { FormData } from "@/types/forms";
import TableForm from "./TableForm";

export default function MyListSection() {
  const [form, setForm] = useState<FormData[]>([]);

  return (
    <section>
      <ButtonWrap form={form} setForm={setForm} />
      <TableForm form={form} setForm={setForm} />
    </section>
  );
}
