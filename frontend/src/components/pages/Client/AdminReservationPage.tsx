import PageHeader from "@/components/common/PageHeader";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ButtonWrap from "./Reservation/ButtonWrap";
import PageCountUI from "@/components/common/PageCountUI";
import { FormData } from "@/types/forms";
import { Navigate, useNavigate } from "react-router-dom";
import {
  ReservationMyListStore,
  useAlertStore,
  useUserStore,
} from "@/store/userStore";
import TableForm from "./Reservation/TableForm";
import Button from "@/components/common/Button";
import { ChangeChackState } from "@/api/postApi";
import TableListItem from "./Reservation/TableListItem";

const Div = styled.div`
  text-align: center;
  margin-bottom: 170px;
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

  li {
    border-bottom: 1px solid #dddddd;
  }

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

  img {
    width: 100%;
  }
  @media (max-width: 1024px) {
    padding: 20px 0;

    strong {
      font-size: 15px;
      min-width: 145px;
    }
    span {
      font-size: 14px;
    }
  }
`;

const StyleButton = styled(Button)`
  padding: 15px 45px;
  font-size: 16px;
  border-radius: 8px;
  @media (max-width: 1024px) {
    font-size: 14px;
    padding: 12px 30px;
  }
`;

const ButtonBox = styled.div`
  display: flex;
  gap: 24px;
  justify-content: center;
  align-items: center;
  margin-top: 70px;
`;
export default function AdminReservationPage() {
  const { showAlert } = useAlertStore();
  const [form, setForm] = useState<FormData[]>([]);
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
  ];
  useEffect(() => {
    if (!isLogin) {
      showAlert("로그인 후 이용해주세요");
      navigate("/", { replace: true });
    }
    setViewMode(["list", 0]);
  }, []);

  const handleViewMode = () => {
    setViewMode(["list", 0]);
  };

  const handleCheck = async () => {
    if (!currentDetail) return;
    const res = await ChangeChackState(currentDetail?.id);
    setViewMode(["list", 0]);
    showAlert("확인 전환 처리되었습니다.");
  };
  return (
    <Div>
      <PageHeader title="예약관리" root="예약관리" />
      <Section $viewMode={viewMode[0]}>
        {viewMode[0] === "list" ? (
          <>
            <ButtonWrap form={form} setForm={setForm} type="AdminPage" />
            <TableForm<FormData>
              form={form}
              headers={["선택", "번호", "신청인", "등록일", "확인여부"]}
            >
              {form.map((form, index) => {
                return (
                  <TableListItem form={form} key={index} orderNum={index} />
                );
              })}
            </TableForm>
            <PageCountUI<FormData>
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
                  return (
                    <li key={key}>
                      <strong>{label}</strong>{" "}
                      <span>{currentDetail?.[key] || "-"}</span>
                    </li>
                  );
                })}
                <li>
                  <strong>사진첨부</strong>
                  {JSON.parse(currentDetail.file).map((file: string) => {
                    return (
                      <img src={file} alt="예약상담 첨부 이미지" key={file} />
                    );
                  })}
                </li>
              </Ul>
            )}
          </div>
        )}
      </Section>
      {viewMode[0] === "detail" && (
        <ButtonBox>
          {currentDetail?.is_confirmed ? (
            <StyleButton
              name="확인취소"
              Bgcolor="red"
              TitleColor="white"
              onClick={handleCheck}
            />
          ) : (
            <StyleButton
              name="확인완료"
              Bgcolor="green"
              TitleColor="white"
              onClick={handleCheck}
            />
          )}

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
