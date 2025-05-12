import React from "react";
import CustomLink from "../../../common/CustomLink";
import styled from "styled-components";

const Section = styled.section`
  margin-bottom: 120px;
  article {
    display: flex;
    justify-content: space-between;

    ul {
      width: 45%;
      display: flex;
      flex-direction: column;
      gap: 20px;
      li {
        padding: 16px 40px;
        cursor: pointer;
        border-bottom: 1px solid #dddddd;
      }
    }
    div {
      width: 45%;
      display: flex;
      flex-direction: column;
      align-items: center;

      p {
        margin-top: 20px;
        line-height: 1.4;
      }
    }

    img {
      width: 100%;
    }
  }
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #dddddd;

  padding: 24px 16px;
  margin-bottom: 30px;
`;
export default function SectionNews() {
  return (
    <Section>
      <Header>
        <h2 className="Section-title">한눈에 보는 드림센터 소식</h2>
        <CustomLink to={"news"} />
      </Header>
      <article>
        <ul>
          <li>
            <h3 className="Section-NewsTitle">
              2025년 봄학기 우즈베키스탄 의대 합격자 명단 발표
            </h3>
            <time className="Section-NewsDate" dateTime="2000-01-01">
              2000-01-01
            </time>
          </li>
          <li>
            <h3 className="Section-NewsTitle">
              2025년 봄학기 우즈베키스탄 의대 합격자 명단 발표
            </h3>
            <time className="Section-NewsDate" dateTime="2000-01-01">
              2000-01-01
            </time>
          </li>
          <li>
            <h3 className="Section-NewsTitle">
              2025년 봄학기 우즈베키스탄 의대 합격자 명단 발표
            </h3>
            <time className="Section-NewsDate" dateTime="2000-01-01">
              2000-01-01
            </time>
          </li>
          <li>
            <h3 className="Section-NewsTitle">
              2025년 봄학기 우즈베키스탄 의대 합격자 명단 발표
            </h3>
            <time className="Section-NewsDate" dateTime="2000-01-01">
              2000-01-01
            </time>
          </li>
        </ul>
        <div>
          <img src="./news0.jpg" alt="뉴스기사 이미지" loading="lazy" />
          <p>
            드림유학원은 2025년 봄학기 우즈베키스탄 의대 진학 프로그램을 통해 총
            25명의 학생이 최종 합격했다는 기쁜 소식을 전합니다. 이번 합격자는
            타슈켄트 국립 의과대학을 비롯한 주요 의대에 고르게 배출되었으며,
            드림유학원의 전문 상담과 현지 밀착 지원이 큰 역할을 했습니다.
            앞으로도 학생 여러분의 꿈을 실현할 수 있도록 최선을 다하겠습니다.
          </p>
        </div>
      </article>
    </Section>
  );
}
