import React, { useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import Gnb from "../../common/Gnb";
import styled from "styled-components";
import FooterLayout from "../../common/FooterLayout";
import CustomAlert from "@/components/common/CustomAlert";
import {
  ControlModalStore,
  FooterStore,
  UseModalStore,
  useUserStore,
} from "@/store/userStore";
import FloatingButton from "@/components/common/FloatingButton";
import ModalUI from "@/components/common/Modal/ModalUI";
import ImageOverlay from "@/components/common/ImageOverlay";
import FooterModal from "@/components/common/Modal/FooterModal";

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
  @media (max-width: 1024px) {
    z-index: 90;
    background-color: white;
    position: fixed;
    top: 0;
    left: 50%;
    transform: translate(-50%, 0);
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
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
  @media (max-width: 1024px) {
    padding: 70px 20px 0;
    box-sizing: border-box;
  }
`;

const Logo = styled.img`
  max-width: 224px;
  @media (max-width: 1024px) {
    max-width: 120px;
  }
`;
export default function LayoutPage() {
  const { viewModal, type, setViewModal } = ControlModalStore();
  const { ImageModal, setImageModal, setImageSrc } = UseModalStore();
  const location = useLocation();
  const { isModalOpen } = FooterStore();
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
            <Logo src="/logo.png" alt="메인 로고" />
          </Link>
        </LogoDiv>
        <Gnb />
      </Header>
      <Main>
        <Outlet />
      </Main>
      <FooterLayout />
      <FloatingButton />
      {ImageModal && <ImageOverlay />}
      {isModalOpen && <FooterModal />}
    </Layout>
  );
}
