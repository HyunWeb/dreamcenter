import React, { useEffect } from "react";
import styled from "styled-components";

import { FooterStore, MapStore } from "@/store/userStore";

import { GetFooter, GetLocation } from "@/api/postApi";
import FormRow from "@/components/pages/Client/Reservation/InputGroup/FormRow";
import LocationButtonBox from "@/components/pages/Client/location/LocationButtonBox";
import FooterButtonBox from "./FooterButtonBox";

const Div = styled.div`
  position: fixed;
  z-index: 100;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 880px;
  background-color: white;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  text-align: center;
  padding: 60px 40px;
  box-sizing: border-box;
  overflow: auto;
  scrollbar-width: none;

  h2 {
    padding-bottom: 44px;
    border-bottom: 1px solid #dddddd;
  }

  .Info {
    font-size: 14px;
    color: #888888;
    display: block;
    text-align: left;
  }

  @media (max-width: 1024px) {
    width: 90%;
    background-color: white;
    padding: 20px 20px;

    h2 {
      padding-bottom: 20px;
    }
  }
`;

const Section = styled.section`
  padding: 40px;

  @media (max-width: 1024px) {
    padding: 0;
    padding-top: 20px;
  }
`;

const Textarea = styled.textarea`
  flex-grow: 1;
  padding: 17px 0 0 19px;
  border: 1px solid #dddddd;
  font-size: 16px;
  min-height: 150px;
  @media (max-width: 1024px) {
    box-sizing: border-box;
    font-size: 15px;
    padding: 10px;
  }
`;

const SingleInput = styled.input`
  height: 40px;
  width: 100%;
  border: 1px solid #dddddd;
  padding-left: 10px;
  font-size: 16px;

  @media (max-width: 1024px) {
    box-sizing: border-box;
    font-size: 15px;
  }
`;

export default function FooterModal() {
  const { description, setDescription, footerTitle, setFooterTitle } =
    FooterStore();
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFooterTitle(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await GetFooter();
      if (res.result) {
        setFooterTitle(res.result.title);
        setDescription(res.result.description);
      } else {
        setFooterTitle("UZBEKISTAN MEDICAL SCHOOLS");
        setDescription(`
          드림 유학원 | 우즈베키스탄 유학 전문 상담 기관
          대표자: 홍길동 | 사업자등록번호: 405-04-98518
          주소: 대구 광역시 수성구 화랑로8길 11-13 성화빌딩 2층
          연락처: 010-1234-5678 | 이메일: uzbekdoctordream@gmail.com
          운영시간: 평일 10:00 - 18:00 (주말/공휴일 휴무)
          `);
      }
    };
    fetchData();
  }, []);

  return (
    <Div>
      <h2 className="Section-title">정보 수정</h2>
      <Section>
        <FormRow
          htmlFor="title"
          label="타이틀"
          required={true}
          NeedWrapper={false}
        >
          <SingleInput
            type="text"
            id="title"
            name="title"
            placeholder="페이지 타이틀을 입력해주세요"
            required
            value={footerTitle}
            onChange={handleTitleChange}
          />
        </FormRow>
        <FormRow
          htmlFor="description"
          label="상세 설명"
          required={true}
          NeedWrapper={false}
        >
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            name="description"
            id="description"
            placeholder="상세 정보를 입력해주세요"
          />
        </FormRow>
      </Section>
      <FooterButtonBox />
    </Div>
  );
}
