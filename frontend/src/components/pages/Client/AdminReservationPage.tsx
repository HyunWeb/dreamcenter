import PageHeader from "@/components/common/PageHeader";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ButtonWrap from "./Reservation/ButtonWrap";
import PageCountUI from "@/components/common/PageCountUI";
import { FormData } from "@/types/forms";
import { Navigate, useNavigate } from "react-router-dom";
import { ReservationMyListStore, useUserStore } from "@/store/userStore";
import TableForm from "./Reservation/TableForm";
import Button from "@/components/common/Button";

const Div = styled.div`
  text-align: center;
`;

const Section = styled.section<{ $viewMode: string }>`
  margin-top: 50px;
  border-top: ${({ $viewMode }) =>
    $viewMode === "list" ? "none" : "1px solid #dddddd;"};
  border-bottom: ${({ $viewMode }) =>
    $viewMode === "list" ? "none" : "1px solid #dddddd;"};
`;

const Ul = styled.ul`
  text-align: left;
  padding: 50px 150px;
  box-sizing: border-box;

  strong {
    font-size: 20px;
    font-weight: 600;
    display: inline-block;
    padding: 20px 0;
    min-width: 240px;
  }

  span {
    font-size: 16px;
  }
`;

const StyleButton = styled(Button)`
  padding: 15px 45px;
  font-size: 16px;
  border-radius: 8px;
`;

const ButtonBox = styled.div`
  display: flex;
  gap: 24px;
  justify-content: center;
  align-items: center;
  margin: 70px 0 170px;
`;
export default function AdminReservationPage() {
  const [form, setForm] = useState<FormData[]>([]);
  const [detail, setDetail] = useState<FormData[]>([]);
  const { isLogin } = useUserStore();
  const navigate = useNavigate();
  const { viewMode, setViewMode } = ReservationMyListStore();
  const currentDetail = form.find((item) => item.id === viewMode[1]);
  const labelArray: { label: string; key: keyof FormData }[] = [
    { label: "글쓴이", key: "userId" },
    { label: "이름", key: "name" },
    { label: "연락처", key: "phone" },
    { label: "상담날짜", key: "date" },
    { label: "나이", key: "age" },
    { label: "최종학력/학교명/전공", key: "school" },
    { label: "신입학/편입학", key: "admission" },
    { label: "추천인", key: "recommender" },
    { label: "핵심문의사항", key: "message" },
    { label: "사진첨부", key: "file" },
  ];
  useEffect(() => {
    if (!isLogin) {
      alert("로그인 후 이용해주세요");
      navigate("/", { replace: true });
    }
    setViewMode(["list", 0]);
    console.log(form);
  }, []);

  const handleViewMode = () => {
    setViewMode(["list", 0]);
  };

  return (
    <Div>
      <PageHeader title="예약관리" root="예약관리" />
      <Section $viewMode={viewMode[0]}>
        {viewMode[0] === "list" ? (
          <>
            <ButtonWrap form={form} setForm={setForm} />
            <TableForm form={form} setForm={setForm} />
            <PageCountUI
              form={form}
              setForm={setForm}
              type={"AdminSubmitList"}
            />
          </>
        ) : (
          <div>
            {currentDetail && (
              <Ul>
                {labelArray.map(({ label, key }) => {
                  // 빈 배열이면 없음 처리
                  if (currentDetail.file === "[]") {
                    currentDetail.file = "";
                  }
                  return (
                    <li key={key}>
                      <strong>{label}</strong>{" "}
                      <span>{currentDetail?.[key] || "-"}</span>
                    </li>
                  );
                })}
              </Ul>
            )}
          </div>
        )}
      </Section>
      {viewMode[0] === "detail" && (
        <ButtonBox>
          <StyleButton name="확인완료" Bgcolor="green" TitleColor="white" />
          <StyleButton
            name="목록보기"
            Bgcolor="grey"
            TitleColor="darkGrey"
            onClick={handleViewMode}
          />
        </ButtonBox>
      )}
    </Div>
  );
}
