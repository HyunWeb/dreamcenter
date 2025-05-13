import React from "react";
import styled from "styled-components";
import CustomLink from "../../../common/CustomLink";

const Section = styled.section`
  margin-bottom: 120px;
  div {
    position: relative;
    padding: 24px 0;
    border-bottom: 1px solid #dddddd;
    margin-bottom: 30px;

    h2 {
      margin-bottom: 12px;
    }
  }
`;

const Ul = styled.ul`
  display: flex;
  justify-content: space-between;
  li {
    width: 30%;
    height: 420px;
    overflow: hidden;
    position: relative;
  }
  img {
    height: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export default function SectionOffice() {
  return (
    <Section>
      <div>
        <h2 className="Section-title">타슈켄트 사무소, 든든한 현지 파트너</h2>
        <p className="Section-description">
          우즈베키스탄 현지에서 직접 관리하며, 학생 여러분의 유학 생활을
          든든하게 돕겠습니다.
        </p>
        <CustomLink to={"office"} />
      </div>
      <Ul>
        <li>
          <img
            src="https://dreamcenter-image-bucket.s3.ap-northeast-2.amazonaws.com/uploads/%E1%84%92%E1%85%A7%E1%86%AB%E1%84%8C%E1%85%B5+%E1%84%89%E1%85%A1%E1%84%86%E1%85%AE%E1%84%89%E1%85%B5%E1%86%AF+0.jpg"
            alt="타슈켄트 사무소 사진1"
            loading="lazy"
          />
        </li>
        <li>
          <img
            src="https://dreamcenter-image-bucket.s3.ap-northeast-2.amazonaws.com/uploads/%E1%84%92%E1%85%A7%E1%86%AB%E1%84%8C%E1%85%B5+%E1%84%89%E1%85%A1%E1%84%86%E1%85%AE%E1%84%89%E1%85%B5%E1%86%AF+1.JPG"
            alt="타슈켄트 사무소 사진2"
            loading="lazy"
          />
        </li>
        <li>
          <img
            src="https://dreamcenter-image-bucket.s3.ap-northeast-2.amazonaws.com/uploads/%E1%84%92%E1%85%A7%E1%86%AB%E1%84%8C%E1%85%B5+%E1%84%89%E1%85%A1%E1%84%86%E1%85%AE%E1%84%89%E1%85%B5%E1%86%AF+2.JPG"
            alt="타슈켄트 사무소 사진3"
            loading="lazy"
          />
        </li>
      </Ul>
    </Section>
  );
}
