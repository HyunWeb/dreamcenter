import { getUserInfo } from "@/api/postApi";
import {
  QuestionWritePageStore,
  ReservationInputStore,
  useUserStore,
} from "@/store/userStore";
import React, { useEffect } from "react";
import styled from "styled-components";

const ReadOnly = styled.input`
  font-weight: 600;
  font-size: 15px;
  margin-right: 20px;
`;
const Input = styled.input`
  border: 1px solid #dddddd;
  cursor: auto;
  font-size: 16px;
  margin-right: 20px;
  box-sizing: border-box;
  height: 40px;
  padding-left: 10px;
  @media (max-width: 1024px) {
    margin-right: 0;
  }
`;

type Props = {
  type: "readOnly" | "input";
  buttonRef?: React.RefObject<HTMLButtonElement | null>;
};

export default function UserIdInputGroup({ type, buttonRef }: Props) {
  const { userId, setUserId } = ReservationInputStore();
  // const { QustionUserId, setQustionUserId } = QuestionWritePageStore();
  const { isLogin } = useUserStore();

  // 질문 페이지에서 사용하기 위해 예약페이지의 유저 Id가 들어오면 옮겨 담는다.

  // useEffect(() => {
  //   setQustionUserId(userId);
  // }, [userId]);

  useEffect(() => {
    if (!isLogin) return;
    const getUserID = async () => {
      const res = await getUserInfo();
      if (!res) return;
      setUserId(res.result.nickname);
    };
    getUserID();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && buttonRef) {
      e.preventDefault();
      buttonRef.current?.click();
    }
  };

  return (
    <>
      {type === "readOnly" ? (
        <ReadOnly
          id="userId"
          name="userId"
          readOnly
          value={userId}
          className="readOnlyInput"
        />
      ) : (
        <Input
          type="text"
          id="userId"
          name="userId"
          value={userId}
          className="readOnlyInput"
          onChange={(e) => handleChange(e)}
          onKeyDown={handleKeyDown}
        />
      )}
    </>
  );
}
