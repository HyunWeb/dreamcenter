import { checkLoginStatus } from "@/api/postApi";
import { useAlertStore, useUserStore } from "@/store/userStore";
import React, { useEffect } from "react";
import { setTime } from "react-datepicker/dist/date_utils";
import { useLocation, useNavigate } from "react-router-dom";

export default function LoginInitializer() {
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
  const location = useLocation();
  const {
    setIsLogin,
    setUserName,
    setRole,
    setUser_id,
    setIsLoginChecked,
    isLoginChecked,
  } = useUserStore();
  const { showAlert } = useAlertStore();
  const navigate = useNavigate();

  const PathArr = [
    "/questions",
    "/reservation",
    "/adminReservation",
    "/questions/write",
    "questions/:id",
  ];

  useEffect(() => {
    const fetchLoginState = async () => {
      try {
        const res = await checkLoginStatus(); // 로그인 가능 상태 확인
        if (res.code === "TOKEN_EXPIRED") {
          naverLogin();
        } else if (res.code === "SUCCESS") {
          setIsLogin(true);
          setUserName(res.name);
          setRole(res.role);
          setUser_id(res.sns_id);
        } else if (res.code === "NO_TOKEN") {
          naverLogin();
        } else if (res.code === "NO_USER") {
          naverLogin();
        }
      } catch (e) {
        console.error("로그인 상태 확인 실패", e);
      } finally {
        setIsLoginChecked(true); // 모든 판단 완료 후 여타 컴포넌트 진입
      }
    };

    if (PathArr.includes(location.pathname)) {
      fetchLoginState();
    } else {
      setIsLoginChecked(true); // 예외 url은 바로 진입
      const fetchLogin = async () => {
        const res = await checkLoginStatus();
        if (res?.code === "SUCCESS") {
          setIsLogin(true);
          setUserName(res.name);
          setRole(res.role);
          setUser_id(res.sns_id);
        }
      };
      fetchLogin();
    }
  }, [location.pathname]);

  return null;
}
