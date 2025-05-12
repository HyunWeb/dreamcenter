import React from "react";
import CustomLink from "../../../common/CustomLink";
import styled from "styled-components";

const Section = styled.section`
  div {
    display: flex;
    justify-content: space-between;
  }

  article {
    display: flex;
  }
`;

export default function SectionNews() {
  return (
    <Section>
      <div>
        <h2 className="Section-title">한눈에 보는 드림센터 소식</h2>
        <CustomLink to={"news"} />
      </div>
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
        </ul>
        <div>
          <img src="./news0.jpg" alt="뉴스기사 이미지" loading="lazy" />
          <p></p>
        </div>
      </article>
    </Section>
  );
}
