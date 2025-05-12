import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import LoginControl from "./LoginControl";

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
`;

export default function Gnb() {
  return (
    <Nav>
      <Ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="about">About</Link>
        </li>
        <li>
          <Link to="office">사무소</Link>
        </li>
        <li>
          <Link to="news">소식</Link>
        </li>
        <li>
          <Link to="questions">질문게시판</Link>
        </li>
        <li>
          <Link to="reservation">예약상담</Link>
        </li>
        <li>
          <Link to="gallery">갤러리</Link>
        </li>
        <li>
          <Link to="location">오시는길</Link>
        </li>
        <li>
          <Link to="adminReservation">예약관리</Link>
        </li>
      </Ul>
      <LoginControl />
    </Nav>
  );
}
