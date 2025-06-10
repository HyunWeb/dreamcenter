import { GetMyReservation } from "@/api/postApi";
import { ControlModalStore } from "@/store/userStore";
import { FormData } from "@/types/forms";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../Button";

const Div = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  scrollbar-width: none;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MyRTitle = styled.h2`
  text-align: center;
  font-size: 22px;
  font-weight: 700;
  padding: 20px;

  @media (max-width: 1024px) {
    font-size: 20px;
    padding: 10px;
  }
`;
const Ul = styled.ul`
  text-align: left;
  box-sizing: border-box;
  width: 100%;
  li {
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid #dddddd;
  }

  strong {
    font-size: 18px;
    font-weight: 600;
    display: inline-block;
    padding: 20px 0 10px;
    min-width: 180px;
  }

  span {
    font-size: 16px;
    margin-bottom: 10px;
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
  margin-top: 30px;
  @media (max-width: 1024px) {
    margin-top: 0px;
  }
`;

export default function MyReservation() {
  const [currentDetail, setCurrentDetail] = useState<FormData>();
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
  const { postId, setViewModal } = ControlModalStore();

  const handleClose = () => {
    setViewModal(false);
  };

  useEffect(() => {
    const fetchMyReservation = async () => {
      if (!postId) return;
      const res = await GetMyReservation(postId);
      setCurrentDetail(res.result);
    };
    fetchMyReservation();
  }, []);
  return (
    <Div>
      <MyRTitle>나의 예약 내역</MyRTitle>
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
          {currentDetail && JSON.parse(currentDetail.file).length > 0 ? (
            JSON.parse(currentDetail.file).map((file: string) => {
              return <img src={file} alt="예약상담 첨부 이미지" key={file} />;
            })
          ) : (
            <span>-</span>
          )}
        </li>
      </Ul>
      <StyleButton
        name="확인"
        Bgcolor="green"
        TitleColor="white"
        onClick={handleClose}
      />
    </Div>
  );
}
