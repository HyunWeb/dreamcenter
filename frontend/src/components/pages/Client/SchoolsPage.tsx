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

const StatBox = styled.div`
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
  return (
    <Div>
      <SeoHead
        title="우즈베키스탄 의과대학 안내(타슈켄트·사마르칸트·안디잔) | 드림유학원"
        description="우즈베키스탄 의대 유학, 타슈켄트의대·사마르칸트의대·안디잔의대를 드림유학원이 안내합니다. 한국 보건복지부 인정 의과대학 정보와 신입학·편입학 절차를 확인하세요."
        path="/schools"
      />
      <PageHeader title="대학안내" root="대학안내" />

      <Intro>
        드림유학원은 해외의대 중에서도 한국 보건복지부가 인정한 우즈베키스탄 의과대학(우즈벡의대)의 신입학·편입학
        수속을 지원하는 유학원입니다. 타슈켄트, 사마르칸트, 안디잔 등 우즈베키스탄 주요 도시의 의과대학 정보를
        소개합니다.
      </Intro>

      <SchoolSection>
        <h2>타슈켄트의대</h2>
        <p>
          우즈베키스탄의 수도 타슈켄트에는 타슈켄트 국립의과대학교(옛 타슈켄트 의과대학과 타슈켄트 소아의과대학이
          통합)와, 새롭게 한국 보건복지부 인정 외국 의과대학 목록에 등록된 Central Asian University(CAU)
          의과대학이 있습니다.
        </p>
        <p>
          드림유학원은 타슈켄트 현지 사무소를 직접 운영하며, 서류 준비부터 비자, 현지 정착까지 신입학·편입학
          전 과정을 관리합니다.
        </p>
      </SchoolSection>

      <SchoolSection>
        <h2>사마르칸트국립의과대학교</h2>
        <p>
          드림유학원은 사마르칸트 국립의과대학교(Samarkand State Medical University)와 공식 MOU를 체결한
          대한민국 공식 파트너 유학원입니다. 사마르칸트는 2,700년 역사를 가진 실크로드의 중심 도시로, 온화한
          기후와 안정된 치안, 타슈켄트보다 저렴한 생활비를 갖춘 교육 도시입니다.
        </p>
        <p>
          공식 MOU를 통해 학교와 직접 소통하며 입학 후에도 학생 관리를 지속할 수 있다는 점이 드림유학원을 통한
          사마르칸트 의대 진학의 가장 큰 강점입니다.
        </p>
      </SchoolSection>

      <SchoolSection>
        <h2>안디잔국립의과대학교</h2>
        <p>
          안디잔 국립의과대학교(Andijan State Medical Institute) 역시 한국 보건복지부가 인정한 우즈베키스탄
          의과대학 목록에 포함되어 있습니다. 드림유학원은 안디잔 의대 신입학·편입학 상담도 함께 진행하고 있으니,
          우즈베키스탄 내 여러 의과대학을 비교해보고 싶으신 분은 편하게 문의해주세요.
        </p>
      </SchoolSection>

      <StatBox>
        <strong>우즈베키스탄 의대 졸업 후 한국 의사 국가고시</strong>
        <p>
          국회 보건복지위원회 자료에 따르면 2001~2023년 외국 의대 졸업자의 한국 의사 국가고시 평균 합격률은
          60.4%이며, 이 중 우즈베키스탄 의대 출신 합격률은 76.3%로 높은 수준을 기록했습니다.
        </p>
      </StatBox>

      <CTA to="/reservation">무료 입학 상담 예약하기</CTA>
    </Div>
  );
}
