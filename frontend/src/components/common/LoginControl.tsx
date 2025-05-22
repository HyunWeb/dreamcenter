import React from "react";
import { postLogout } from "../../api/postApi";
import { useUserStore } from "../../store/userStore";
import styled from "styled-components";

const Div = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  span {
    font-weight: bold;
  }
`;

export default function LoginControl() {
  // const NAVER_CLIENT_ID = ;
  // const REDIRECT_URI = "http://localhost:3000/naver/callback"; // 네가 등록한 Callback URL
  const { isLogin, setIsLogin, userName } = useUserStore();

  function naverLogin() {
    // 로그인 직전 페이지 url 저장
    const redirectUrl = window.location.pathname + window.location.search;
    localStorage.setItem("naver_redirect_after_login", redirectUrl);

    const STATE = Math.random().toString(36).substring(2, 15); // CSRF 공격 방어용 (ex: uuid 같은 거 써도 되고, 간단하게 random string)
    const url = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${
      process.env.REACT_APP_NAVER_CLIENT_ID
    }&redirect_uri=${encodeURIComponent(
      process.env.REACT_APP_REDIRECT_URI!
    )}&state=${STATE}`;

    localStorage.setItem("naver_oauth_state", STATE);
    window.location.href = url;
  }

  const naverLogOutUrl = async () => {
    try {
      const response = await postLogout();
      setIsLogin(false);
    } catch (error) {
      console.error("로그아웃 실패", error);
    }
  };

  return (
    <Div>
      {isLogin ? (
        <div>
          <span>{userName}</span>님{" "}
          <button onClick={naverLogOutUrl}>네이버 로그아웃</button>
        </div>
      ) : (
        <button onClick={naverLogin}>네이버 로그인</button>
      )}
    </Div>
  );
}
