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

const Button = styled.button`
  font-size: 15px;
  font-weight: 600;
  line-height: 16px;
  background-color: transparent;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  padding: 10px;
  svg {
    width: 22px;
    height: 22px;
    color: #888888;
  }
`;
const LoginWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
`;

export default function LoginControl() {
  // const NAVER_CLIENT_ID = ;
  // const REDIRECT_URI = "http://localhost:3000/naver/callback"; // 네가 등록한 Callback URL
  const { isLogin, setIsLogin, userName } = useUserStore();

  function naverLogin() {
    // 로그인 직전 페이지 url 저장
    const redirectUrl = window.location.pathname + window.location.search;
    localStorage.setItem("naver_redirect_after_login", redirectUrl);

    // 고유한 값을 로그인 시 url에 state로 포함해서 요청 > 이후 서버에서 해당 고유값과 url에 state값이 일치하는지 확인 후 로그인 진행
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
        <LoginWrap>
          <div>
            <span>{userName}</span>님
          </div>
          <Button onClick={naverLogOutUrl}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-box-arrow-left"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z"
              />
              <path
                fillRule="evenodd"
                d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708z"
              />
            </svg>
            네이버 로그아웃
          </Button>
        </LoginWrap>
      ) : (
        <Button onClick={naverLogin}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-box-arrow-right"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"
            />
            <path
              fillRule="evenodd"
              d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
            />
          </svg>
          네이버 로그인
        </Button>
      )}
    </Div>
  );
}
