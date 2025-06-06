import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import LoginControl from "./LoginControl";
import { useUserStore } from "@/store/userStore";

const MenuBtn = styled.button`
  display: none;
  @media (max-width: 1024px) {
    padding: 0;
    margin: 0;
    border: none;
    background-color: white;
    display: block;
    width: 40px;
    height: 40px;
    position: fixed;
    top: 15px;
    right: 10px;
    svg {
      width: 30px;
      height: 30px;
    }
  }
`;

const Nav = styled.nav<{ $isOpen: boolean }>`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #dddddd;
  @media (max-width: 1024px) {
    right: ${(props) => (props.$isOpen ? "0" : "-100%")};
    transition-duration: 500ms;
    width: 70vw;
    flex-direction: column;
    position: fixed;
    top: 70px;
    z-index: 90;
    background-color: white;
    height: calc(100vh - 70px);
  }
`;
const Ul = styled.ul`
  display: flex;
  @media (max-width: 1024px) {
    flex-direction: column;
    margin-top: 40px;
  }

  a {
    text-decoration: none;
    color: #111111;
    display: block;
    padding: 20px 20px;
  }

  .active {
    font-weight: 600;
    color: #49b736;
    border-bottom: 2px solid #49b736;
  }
`;

export default function Gnb() {
  const { role } = useUserStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navItems = [
    { to: "/", label: "Home" },
    { to: "about", label: "About" },
    { to: "office", label: "사무소" },
    { to: "news", label: "소식" },
    { to: "questions", label: "질문게시판" },
    { to: "reservation", label: "예약상담" },
    { to: "gallery", label: "갤러리" },
    { to: "location", label: "오시는길" },
    // { to: "adminReservation", label: "예약관리" },
  ];

  const handleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };
  return (
    <Nav $isOpen={isMenuOpen}>
      <MenuBtn onClick={handleMenu}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-list"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
          />
        </svg>
      </MenuBtn>
      <Ul>
        {navItems.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              {item.label}
            </NavLink>
          </li>
        ))}
        {role === "admin" && (
          <li>
            <NavLink to="adminReservation">예약관리</NavLink>
          </li>
        )}
      </Ul>
      <LoginControl />
    </Nav>
  );
}
