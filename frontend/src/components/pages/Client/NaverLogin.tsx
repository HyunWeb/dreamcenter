import axios from "axios";
import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { postLogin } from "../../../api/postApi";

export default function NaverLogin() {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const state = searchParams.get("state");

  useEffect(() => {
    if (code) {
      postLogin({ code, state })
        .then((userData) => {
          console.log("유저 데이터", userData);
          // 로그인 완료 → 메인으로 이동
          alert("로그인이 완료되었습니다.");
          window.location.href = "/";
        })
        .catch((error) => {
          console.error("로그인 실패", error);
          alert("로그인에 실패하였습니다.");
        });
    }
  }, [code]);
  return <div>로그인 중입니다...</div>;
}
