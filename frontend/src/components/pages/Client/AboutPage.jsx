import React from "react";
import PageHeader from "../../common/PageHeader";
import styled from "styled-components";
import ImgViewBox from "./About/ImgViewBox";
import ImgListBox from "./About/ImgListBox";
import Wysiwyg from "./About/Wysiwyg";

const Div = styled.div`
  text-align: center;
`;
const Section = styled.section`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 120px;
`;

export default function AboutPage() {
  return (
    <Div>
      <PageHeader title={"드림유학원"} root={"드림유학원"} />
      <Section>
        <ImgViewBox />
        <ImgListBox />
      </Section>
      <Wysiwyg />
    </Div>
  );
}
