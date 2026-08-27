import React, { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import PageHeader from "@/components/common/PageHeader";
import SeoHead from "@/components/common/SeoHead";
import Button from "@/components/common/Button";
import SchoolsEditModal from "./SchoolsEditModal";
import { SchoolsStore, useUserStore } from "@/store/userStore";
import { GetSchoolsContent } from "@/api/postApi";

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

const SchoolSection = styled.section`
  max-width: 860px;
  margin: 0 auto 60px;
  padding: 0 20px;
  text-align: left;

  h2 {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 16px;
    color: #111111;
    border-left: 4px solid #49b736;
    padding-left: 12px;
  }

  p {
    line-height: 1.7;
    margin-bottom: 14px;
    color: #333333;
    white-space: pre-line;
  }

  @media (max-width: 1024px) {
    h2 {
      font-size: 19px;
    }
    p {
      font-size: 14px;
    }
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

export default function SchoolsPage() {
  const { role } = useUserStore();
  const { data, setData, setDraft, isModalOpen, setIsModalOpen } =
    SchoolsStore();

  useEffect(() => {
    const fetchContent = async () => {
      const res = await GetSchoolsContent();
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

  return (
    <Div>
      <SeoHead
        title="우즈베키스탄 의과대학 안내(타슈켄트·사마르칸트·부하라) | 드림유학원"
        description="우즈베키스탄 의대 유학, 타슈켄트의대·사마르칸트의대·부하라의대를 드림유학원이 안내합니다. 한국 보건복지부 인정 의과대학 정보와 신입학·편입학 절차를 확인하세요."
        path="/schools"
      />
      <PageHeader title="대학안내" root="대학안내" />

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

      <SchoolSection>
        <h2>타슈켄트</h2>
        <p>{data.tashkent_body}</p>
      </SchoolSection>

      <SchoolSection>
        <h2>사마르칸트</h2>
        <p>{data.samarkand_body}</p>
      </SchoolSection>

      <SchoolSection>
        <h2>부하라</h2>
        <p>{data.andijan_body}</p>
      </SchoolSection>

      <CTA to="/reservation">무료 입학 상담 예약하기</CTA>

      {isModalOpen && <SchoolsEditModal />}
    </Div>
  );
}
