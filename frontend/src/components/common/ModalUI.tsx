import React, { useRef, useState } from "react";
import styled from "styled-components";
import ModalButtonBox from "./ModalButtonBox";

const Div = styled.div`
  width: 370px;
  height: 330px;
  position: fixed;
  z-index: 10;
  border-radius: 20px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  padding: 40px 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .Lockicon {
    position: relative;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background-color: rgba(73, 183, 54, 0.29);
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
      width: 30px;
      height: 30px;
    }

    &::before {
      content: "";
      width: 48px;
      height: 48px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: rgba(73, 183, 54, 0.29);
      border-radius: 50%;
    }
  }

  h1 {
    font-size: 24px;
    font-weight: 700;
    margin: 14px 0;
  }
  p {
    font-size: 17px;
    font-weight: 400;
    margin-bottom: 35px;
    span {
      font-weight: 700;
    }
  }
`;

const InputWrap = styled.div`
  display: flex;
  gap: 16px;
  input {
    width: 48px;
    height: 60px;
    font-size: 32px;
    text-align: center;
    border-radius: 11px;
    border: 2px solid #cecece;
  }
`;

export default function ModalUI() {
  const [password, setPassword] = useState(["", "", "", ""]);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const newPassword = [...password];
    newPassword[index] = value;
    setPassword(newPassword);

    if (value && index < 3) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && password[index] === "" && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <Div>
      <div className="Lockicon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-lock"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M8 0a4 4 0 0 1 4 4v2.05a2.5 2.5 0 0 1 2 2.45v5a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 2 13.5v-5a2.5 2.5 0 0 1 2-2.45V4a4 4 0 0 1 4-4M4.5 7A1.5 1.5 0 0 0 3 8.5v5A1.5 1.5 0 0 0 4.5 15h7a1.5 1.5 0 0 0 1.5-1.5v-5A1.5 1.5 0 0 0 11.5 7zM8 1a3 3 0 0 0-3 3v2h6V4a3 3 0 0 0-3-3"
          />
        </svg>
      </div>
      <h1>비공개 질문입니다.</h1>
      <p>
        질문 내용을 확인하려면 <span>비밀번호를 입력</span> 해주세요.
      </p>
      <InputWrap>
        {password.map((num, i) => {
          return (
            <input
              key={i}
              type="password"
              maxLength={1}
              value={password[i]}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              ref={(el) => {
                inputsRef.current[i] = el;
              }}
            />
          );
        })}
      </InputWrap>
      <ModalButtonBox />
    </Div>
  );
}
