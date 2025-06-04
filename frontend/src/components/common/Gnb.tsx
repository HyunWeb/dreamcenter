import React from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import LoginControl from "./LoginControl";
import { useUserStore } from "@/store/userStore";

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #dddddd;
`;
const Ul = styled.ul`
  display: flex;

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
  return (
    <Nav>
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
