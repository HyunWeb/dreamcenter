import React from "react";
import styled from "styled-components";

const Intro = styled.p`
  font-size: 15px;
  line-height: 1.6;
  color: #555555;
  margin-bottom: 20px;
`;

// 왼쪽 항목명, 오른쪽 내용의 안내표
const Table = styled.dl`
  border-top: 2px solid #49b736;

  div {
    display: flex;
    border-bottom: 1px solid #eeeeee;
  }

  dt {
    flex-shrink: 0;
    width: 150px;
    padding: 16px;
    background-color: #f7faf6;
    font-size: 15px;
    font-weight: 600;
    color: #333333;
  }

  dd {
    flex: 1;
    padding: 16px;
    font-size: 15px;
    line-height: 1.6;
    color: #333333;
  }

  em {
    font-style: normal;
    font-weight: 700;
    color: #2f8a20;
  }

  @media (max-width: 1024px) {
    div {
      flex-direction: column;
    }
    dt {
      width: auto;
      padding: 10px 14px;
      font-size: 14px;
    }
    dd {
      padding: 10px 14px 14px;
      font-size: 14px;
    }
  }
`;

export default function Privacy() {
  return (
    <>
      <Intro>
        드림유학원은 상담 예약을 위해 아래와 같이 개인정보를 수집·이용합니다.
      </Intro>
      <Table>
        <div>
          <dt>수집 항목</dt>
          <dd>
            이름, 연락처, 나이, 상담 희망일자 및 시간, 학교명/전공/최종학력,
            사진, 추천인, 핵심문의사항
          </dd>
        </div>
        <div>
          <dt>수집 목적</dt>
          <dd>
            유학 상담 제공, 상담 일정 조율, 지원자 정보 확인 및 맞춤형 안내 제공
          </dd>
        </div>
        <div>
          <dt>보유 및 이용 기간</dt>
          <dd>
            <em>수집일로부터 1년간 보관 후 파기</em>
          </dd>
        </div>
        <div>
          <dt>동의 거부 권리</dt>
          <dd>
            개인정보 제공을 거부할 수 있으나, 이 경우 상담 서비스 이용이 제한될
            수 있습니다.
          </dd>
        </div>
      </Table>
    </>
  );
}
