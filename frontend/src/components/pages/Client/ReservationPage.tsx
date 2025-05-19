import PageHeader from "@/components/common/PageHeader";
import React, { useState } from "react";
import styled from "styled-components";
import TabSwitch from "./About&Office/TabSwitch";
import FormSection from "./Reservation/FormSection";

const Div = styled.div`
  text-align: center;
`;

export default function ReservationPage() {
  const [selectTab, setSelectTab] = useState(true);
  return (
    <Div>
      <PageHeader
        title="예약상담"
        root="예약상담"
        root1Url="/reservation"
        root2="예약상담"
      />
      <TabSwitch
        Title1="예약상담"
        Title2="나의 문의/신청내역"
        selectTab={selectTab}
        setSelectTab={setSelectTab}
      />
      {selectTab ? <FormSection /> : <section>2</section>}
    </Div>
  );
}
