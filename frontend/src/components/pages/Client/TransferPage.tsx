import PageHeader from "@/components/common/PageHeader";
import SeoHead from "@/components/common/SeoHead";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Div = styled.div`
  text-align: center;
  margin-bottom: 170px;
`;

const Intro = styled.p`
  max-width: 760px;
  margin: 0 auto 60px;
  line-height: 1.6;
  color: #555555;
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
    margin-bottom: 16px;
    color: #111111;
    border-left: 4px solid #49b736;
    padding-left: 12px;
  }

  p {
    line-height: 1.7;
    margin-bottom: 14px;
    color: #333333;
  }

  ol {
    padding-left: 20px;
    li {
      line-height: 1.8;
      margin-bottom: 8px;
      color: #333333;
    }
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
  return (
    <Div>
      <SeoHead
        title="우즈베키스탄 의대편입 안내 | 드림유학원"
        description="국내외 4년제 대학 졸업(예정)자를 위한 우즈베키스탄 의대편입 안내. 타슈켄트·사마르칸트·안디잔의대 편입 자격과 절차를 드림유학원에서 확인하세요."
        path="/transfer"
      />
      <PageHeader title="편입안내" root="편입안내" />

      <Intro>
        우즈베키스탄 의대는 신입학뿐만 아니라 편입학도 함께 모집합니다. 국내외 4년제 대학을 졸업했거나
        졸업 예정인 분이라면, 처음부터 다시 시작하지 않고 의대편입을 통해 진학할 수 있습니다.
      </Intro>

      <Content>
        <h2>의대편입 대상 및 대학</h2>
        <p>
          타슈켄트 국립의과대학교, 사마르칸트 국립의과대학교, 안디잔 국립의과대학교 등 한국 보건복지부가 인정한
          우즈베키스탄 의과대학들이 신입학과 편입학을 동시에 모집합니다. 4년제 대학 학사 학위를 소지했거나
          졸업 예정인 국내외 대학생이 편입 대상이 됩니다.
        </p>

        <h2>편입 절차</h2>
        <ol>
          <li>무료 상담 — 현재 학력과 상황에 맞는 편입 가능 여부 확인</li>
          <li>서류 준비 — 성적증명서 등 학교 제출용 서류 준비</li>
          <li>서류 제출 및 접수확인서 발급 — 학교의 공식 검토 및 승인</li>
          <li>입학허가서 발급 및 비자 신청</li>
          <li>출국 및 현지 정착 지원</li>
        </ol>
        <p>
          우즈베키스탄 의대는 통상 9월학기를 정규 입학 시즌으로 운영하며, 학기별로 지원 마감일이 정해져 있어
          미리 상담을 시작하는 것이 좋습니다.
        </p>
      </Content>

      <NoticeBox>
        <strong>공식 MOU 체결 유학원을 확인하세요</strong>
        <p>
          해외의대 편입은 학교와 직접 소통할 수 있는 공식 파트너 유학원을 통해 진행하는 것이 중요합니다.
          드림유학원은 사마르칸트 국립의과대학교와 공식 MOU를 체결한 대한민국 공식 파트너 유학원으로,
          입학 이후의 학생 관리까지 책임집니다.
        </p>
        <p>편입 관련 문의 및 성적증명서 제출은 uzbekdoctordream@gmail.com 으로도 보내주실 수 있습니다.</p>
      </NoticeBox>

      <CTA to="/reservation">편입 상담 예약하기</CTA>
    </Div>
  );
}
