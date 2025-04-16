import React, { useEffect } from "react";
import logo from "../../../logo.svg";

export default function Main() {
  const NAVER_CLIENT_ID = "ZrPAGA0oGqag2F39pAFq";
  const REDIRECT_URI = "http://localhost:3000/naver/callback"; // 네가 등록한 Callback URL

  function naverLogin() {
    const STATE = Math.random().toString(36).substring(2, 15); // CSRF 공격 방어용 (ex: uuid 같은 거 써도 되고, 간단하게 random string)
    const url = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${encodeURIComponent(
      REDIRECT_URI
    )}&state=${STATE}`;

    localStorage.setItem("naver_oauth_state", STATE);
    window.location.href = url;
  }

  // 임시 로그아웃 기능
  // 로그인후 토큰을 로컬스토리나 세션에 저장해놓고 그것만 삭제하는 방식으로 제작하자.
  const naverLogOutUrl = () =>
    (window.location.href = "https://nid.naver.com/nidlogin.logout");

  return (
    <div className="App">
      <button onClick={naverLogin}>네이버 로그인</button>
      <button onClick={naverLogOutUrl}>네이버 로그아웃</button>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
