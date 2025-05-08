import React from "react";
import { Outlet } from "react-router-dom";
import { postLogout } from "../../../api/postApi";
import { useUserStore } from "../../../store/userStore";

export default function LayoutPage() {
  const NAVER_CLIENT_ID = "ZrPAGA0oGqag2F39pAFq";
  const REDIRECT_URI = "http://localhost:3000/naver/callback"; // 네가 등록한 Callback URL
  const { name, isLogin, setLogout } = useUserStore();

  function naverLogin() {
    // 로그인 직전 페이지 url 저장
    const redirectUrl = window.location.pathname + window.location.search;
    localStorage.setItem("naver_redirect_after_login", redirectUrl);

    const STATE = Math.random().toString(36).substring(2, 15); // CSRF 공격 방어용 (ex: uuid 같은 거 써도 되고, 간단하게 random string)
    const url = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${encodeURIComponent(
      REDIRECT_URI
    )}&state=${STATE}`;

    localStorage.setItem("naver_oauth_state", STATE);
    window.location.href = url;
  }

  // 임시 로그아웃 기능
  // 로그인후 토큰을 로컬스토리나 세션에 저장해놓고 그것만 삭제하는 방식으로 제작하자.
  const naverLogOutUrl = async () => {
    try {
      const response = await postLogout();
      setLogout();
      localStorage.removeItem("user-storage");

      console.log(response.message);
    } catch (error) {
      console.error("로그아웃 실패", error);
    }
  };

  return (
    <div>
      LayoutPage 안녕하세요 반갑습니다.
      {isLogin ? (
        <h1>{name}님 환영합니다!</h1>
      ) : (
        <button onClick={naverLogin}>네이버 로그인</button>
      )}
      <button onClick={naverLogOutUrl}>네이버 로그아웃</button>
      <Outlet />
    </div>
  );
}
