import { checkLoginStatus } from "@/api/postApi";
import { useUserStore } from "@/store/userStore";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function LoginInitializer() {
  const location = useLocation();
  const { setIsLogin, setUserName, setRole, setUser_id } = useUserStore();
  useEffect(() => {
    if (location.pathname === "/naver/callback") return;
    const fetchLoginState = async () => {
      const res = await checkLoginStatus();
      if (res.code === "TOKEN_EXPIRED") {
        alert("세션이 만료되었습니다. 다시 로그인해주세요.");
      } else if (res.code === "SUCCESS") {
        setIsLogin(true);
        setUserName(res.name);
        setRole(res.role);
        setUser_id(res.sns_id);
      }
    };
    fetchLoginState();
  }, [location.pathname]);
  return null;
}
