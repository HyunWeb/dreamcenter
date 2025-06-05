import PageHeader from "@/components/common/PageHeader";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TabSwitch from "./About&Office/TabSwitch";
import { useUserStore } from "@/store/userStore";
import { useNavigate } from "react-router-dom";
import MyListSection from "./Reservation/MyListSection";
import FormSection from "./Reservation/FormSection";
import PageCountUI from "@/components/common/PageCountUI";
import { FormData } from "@/types/forms";

const Div = styled.div`
  text-align: center;
  margin-bottom: 170px;
  display: flex;
  flex-direction: column;
`;

export default function ReservationPage() {
  const [selectTab, setSelectTab] = useState(true);
  const [form, setForm] = useState<FormData[]>([]);

  return (
    <Div>
      <PageHeader
        title="예약상담"
        root="예약상담"
        root1Url="/reservation"
        root2={selectTab ? "예약상담" : "나의 문의/신청내역"}
      />
      <TabSwitch
        Title1="예약상담"
        Title2="나의 문의/신청내역"
        selectTab={selectTab}
        setSelectTab={setSelectTab}
      />
      {selectTab ? (
        <FormSection />
      ) : (
        <MyListSection form={form} setForm={setForm} />
      )}

      {!selectTab && (
        <PageCountUI<FormData>
          form={form}
          setForm={setForm}
          type={"mySubmitList"}
        />
      )}
    </Div>
  );
}
