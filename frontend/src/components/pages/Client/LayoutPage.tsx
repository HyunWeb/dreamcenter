import React from "react";
import { Link, Outlet } from "react-router-dom";
import Gnb from "../../common/Gnb";
import styled from "styled-components";
import FooterLayout from "../../common/FooterLayout";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
`;

const Header = styled.header`
  width: 100%;
  max-width: 1200px;
  margin-bottom: 30px;
`;

const LogoDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Main = styled.main`
  width: 100%;
  max-width: 1200px;
`;

export default function LayoutPage() {
  return (
    <Layout>
      <Header>
        <LogoDiv>
          <Link to="/">
            <img src="./logo.png" alt="메인 로고" />
          </Link>
        </LogoDiv>
        <Gnb />
      </Header>
      <Main>
        <Outlet />
      </Main>
      <FooterLayout />
    </Layout>
  );
}
