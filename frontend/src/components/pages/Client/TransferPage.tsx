import React, { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import PageHeader from "@/components/common/PageHeader";
import SeoHead from "@/components/common/SeoHead";
import Button from "@/components/common/Button";
import TransferEditModal from "./TransferEditModal";
import { TransferStore, useUserStore } from "@/store/userStore";
import { GetTransferContent } from "@/api/postApi";

const Div = styled.div`
  text-align: center;
  margin-bottom: 170px;
`;

const EditButtonWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  max-width: 860px;
  margin: 0 auto 10px;
  padding: 0 20px;
  box-sizing: border-box;
`;

const Intro = styled.p`
  max-width: 760px;
  margin: 0 auto 60px;
  line-height: 1.6;
  color: #555555;
  white-space: pre-line;
  @media (max-width: 1024px) {
    font-size: 14px;
    padding: 0 20px;
  }
`;

const Content = styled.section`
  max-width: 860px;
  margin: 0 auto 60px;
  padding: 0 20px;
  text-align: left;

  h2 {
    font-size: 24px;
    font-weight: 600;
    margin-top: 56px;
    margin-bottom: 16px;
    color: #111111;
    border-left: 4px solid #49b736;
    padding-left: 12px;

    &:first-child {
      margin-top: 0;
    }
  }

  p {
    line-height: 1.7;
    margin-bottom: 14px;
    color: #333333;
    white-space: pre-line;
  }

  ol {
    padding-left: 20px;
    li {
      line-height: 1.8;
      margin-bottom: 8px;
      color: #333333;
    }
  }

  ol + p {
    margin-top: 32px;
  }

  @media (max-width: 1024px) {
    h2 {
      font-size: 19px;
    }
    p,
    li {
      font-size: 14px;
    }
  }
`;

const NoticeBox = styled.div`
  max-width: 860px;
  margin: 0 auto 80px;
  padding: 30px;
  background-color: #f8f8f8;
  border-radius: 12px;
  text-align: left;

  strong {
    display: block;
    margin-bottom: 8px;
    color: #49b736;
  }
  p {
    line-height: 1.6;
    font-size: 14px;
    color: #555555;
    margin-bottom: 4px;
    white-space: pre-line;
  }
`;

const CTA = styled(Link)`
  display: inline-block;
  padding: 14px 40px;
  background-color: #49b736;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;

  &:hover {
    opacity: 0.9;
  }
`;

export default function TransferPage() {
  const { role } = useUserStore();
  const { data, setData, setDraft, isModalOpen, setIsModalOpen } =
    TransferStore();

  useEffect(() => {
    const fetchContent = async () => {
      const res = await GetTransferContent();
      if (res?.result) {
        setData(res.result);
      }
    };
    fetchContent();
  }, []);

  const handleEditOpen = () => {
    setDraft(data);
    setIsModalOpen(true);
  };

  const steps = (data.steps_body || "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  return (
    <Div>
      <SeoHead
        title="우즈베키스탄 의대편입 안내 | 드림유학원"
        description="국내외 4년제 대학 졸업(예정)자를 위한 우즈베키스탄 의대편입 안내. 타슈켄트·사마르칸트·안디잔의대 편입 자격과 절차를 드림유학원에서 확인하세요."
        path="/transfer"
      />
      <PageHeader title="편입안내" root="편입안내" />

      {role === "admin" && (
        <EditButtonWrap>
          <Button
            name="문구 수정"
            Bgcolor="green"
            TitleColor="white"
            onClick={handleEditOpen}
          />
        </EditButtonWrap>
      )}

      <Intro>{data.intro}</Intro>

      <Content>
        <h2>의대편입 대상 및 대학</h2>
        <p>{data.eligibility_body}</p>

        <h2>편입 절차</h2>
        <ol>
          {steps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
        <p>{data.procedure_note}</p>
      </Content>

      {(data.mou_notice_body || data.contact_note) && (
        <NoticeBox>
          <strong>공식 MOU 체결 유학원을 확인하세요</strong>
          {data.mou_notice_body && <p>{data.mou_notice_body}</p>}
          {data.contact_note && <p>{data.contact_note}</p>}
        </NoticeBox>
      )}

      <CTA to="/reservation">편입 상담 예약하기</CTA>

      {isModalOpen && <TransferEditModal />}
    </Div>
  );
}
