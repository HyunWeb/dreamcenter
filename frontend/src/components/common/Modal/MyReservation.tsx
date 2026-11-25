import { GetMyReservation } from "@/api/postApi";
import { ControlModalStore } from "@/store/userStore";
import { FormData } from "@/types/forms";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Status = styled.div<{ $confirmed: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 16px;
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 600;
  color: ${({ $confirmed }) => ($confirmed ? "#2f8a20" : "#b26a00")};
  background-color: ${({ $confirmed }) =>
    $confirmed ? "#eaf6e7" : "#fff4e0"};
`;

// 왼쪽 항목명, 오른쪽 값의 2열 표
const Table = styled.dl`
  border-top: 2px solid #49b736;

  div {
    display: flex;
    border-bottom: 1px solid #eeeeee;
  }

  dt {
    flex-shrink: 0;
    width: 150px;
    padding: 14px 16px;
    background-color: #f7faf6;
    font-size: 15px;
    font-weight: 600;
    color: #555555;
  }

  dd {
    flex: 1;
    min-width: 0;
    padding: 14px 16px;
    font-size: 15px;
    line-height: 1.6;
    color: #111111;
    white-space: pre-wrap;
    word-break: break-all;
  }

  @media (max-width: 1024px) {
    dt {
      width: 96px;
      padding: 12px;
      font-size: 13px;
    }
    dd {
      padding: 12px;
      font-size: 14px;
    }
  }
`;

const Thumbs = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  a {
    display: block;
    width: 96px;
    height: 96px;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid #eeeeee;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Loading = styled.p`
  padding: 40px 0;
  text-align: center;
  color: #888888;
`;

const parseFiles = (file: string | undefined): string[] => {
  if (!file) return [];
  try {
    const parsed = JSON.parse(file);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export default function MyReservation() {
  const [currentDetail, setCurrentDetail] = useState<FormData>();
  const [loaded, setLoaded] = useState(false);
  const { postId } = ControlModalStore();

  useEffect(() => {
    const fetchMyReservation = async () => {
      if (!postId) return;
      const res = await GetMyReservation(postId);
      setCurrentDetail(res?.result ?? undefined);
      setLoaded(true);
    };
    fetchMyReservation();
  }, []);

  if (!loaded) return <Loading>불러오는 중…</Loading>;
  if (!currentDetail) return <Loading>예약 내역을 찾을 수 없습니다.</Loading>;

  const files = parseFiles(currentDetail.file);
  const dateTime = [currentDetail.date, currentDetail.time]
    .filter(Boolean)
    .join(" ");
  const rows: { label: string; value: string }[] = [
    { label: "글쓴이", value: currentDetail.userId },
    { label: "이름", value: currentDetail.name },
    { label: "연락처", value: currentDetail.phone },
    { label: "상담 일시", value: dateTime },
    { label: "나이", value: currentDetail.age },
    { label: "학교/전공/학력", value: currentDetail.school },
    { label: "신입학/편입학", value: currentDetail.admission },
    { label: "추천인", value: currentDetail.recommender },
    { label: "핵심문의사항", value: currentDetail.message },
  ];

  return (
    <>
      <Status $confirmed={currentDetail.is_confirmed}>
        {currentDetail.is_confirmed
          ? "✓ 상담 확인 완료"
          : "상담 확인 대기 중"}
      </Status>
      <Table>
        {rows.map(({ label, value }) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value || "-"}</dd>
          </div>
        ))}
        <div>
          <dt>사진첨부</dt>
          <dd>
            {files.length > 0 ? (
              <Thumbs>
                {files.map((url) => (
                  <a key={url} href={url} target="_blank" rel="noreferrer">
                    <img src={url} alt="예약상담 첨부 이미지" />
                  </a>
                ))}
              </Thumbs>
            ) : (
              "-"
            )}
          </dd>
        </div>
      </Table>
    </>
  );
}
