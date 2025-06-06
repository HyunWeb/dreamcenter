import React, { useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import Gnb from "../../common/Gnb";
import styled from "styled-components";
import FooterLayout from "../../common/FooterLayout";
import CustomAlert from "@/components/common/CustomAlert";
import { ControlModalStore, useUserStore } from "@/store/userStore";
import FloatingButton from "@/components/common/FloatingButton";
import ModalUI from "@/components/common/Modal/ModalUI";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  min-height: 100vh;
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
  flex-grow: 1;
`;

const Logo = styled.img`
  max-width: 224px;
`;
export default function LayoutPage() {
  const { viewModal, type, setViewModal } = ControlModalStore();
  const location = useLocation();
  useEffect(() => {
    setViewModal(false);
  }, [location.pathname]);
  return (
    <Layout>
      <CustomAlert />
      {viewModal && <ModalUI type={type} />}
      <Header>
        <LogoDiv>
          <Link to="/">
            <Logo src="./logo.png" alt="메인 로고" />
          </Link>
        </LogoDiv>
        <Gnb />
      </Header>
      <Main>
        <Outlet />
      </Main>
      <FooterLayout />
      <FloatingButton />
    </Layout>
  );
}
