import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { postLogin } from "../../../api/postApi";
import { useUserStore } from "../../../store/userStore";

export default function NaverLogin() {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const { setIsLogin, setUserName, setRole, setUser_id } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    const storedState = localStorage.getItem("naver_oauth_state"); // 위조 방지를 위한 확인
    localStorage.removeItem("naver_oauth_state");
    if (code) {
      postLogin({ code, state, originalState: storedState })
        .then((userData) => {
          setIsLogin(true);
          setUserName(userData.user.name);
          setRole(userData.user.role);
          setUser_id(userData.user.sns_id);
          // 로그인 완료 시 다시 페이지 이동
          const redirectTo =
            localStorage.getItem("naver_redirect_after_login") || "/";
          localStorage.removeItem("naver_redirect_after_login");
          navigate(redirectTo, { replace: true });
        })
        .catch((error) => {
          console.error("로그인 실패", error);
          alert("로그인에 실패하였습니다.");
        });
    } else {
      alert("로그인에 필요한 url 코드가 없습니다.");
    }
  }, [code]);
  return null;
}
