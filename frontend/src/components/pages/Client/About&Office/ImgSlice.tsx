import React from "react";
import styled from "styled-components";
import ImgViewBox from "./ImgViewBox";
import ImgListBox from "./ImgListBox";

const Section = styled.section`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 100px;
`;
export default function ImgSlice() {
  return (
    <Section>
      <ImgViewBox />
      <ImgListBox />
    </Section>
  );
}
