import { getUserInfo } from "@/api/postApi";
import { ReservationInputStore, useUserStore } from "@/store/userStore";
import React, { useEffect } from "react";
import styled from "styled-components";

export default function UserIdInputGroup() {
  const { userId, setUserId } = ReservationInputStore();
  const { isLogin } = useUserStore();

  useEffect(() => {
    if (!isLogin) return;
    const getUserID = async () => {
      const res = await getUserInfo();
      setUserId(res.result.nickname);
    };
    getUserID();
  }, []);

  return (
    <>
      <input
        id="userId"
        name="userId"
        readOnly
        value={userId}
        className="readOnlyInput"
      />
    </>
  );
}
