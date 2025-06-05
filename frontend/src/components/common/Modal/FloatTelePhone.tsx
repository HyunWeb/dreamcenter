import React from "react";
import styled from "styled-components";
import Button from "../Button";
import { ControlModalStore } from "@/store/userStore";

const Div = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

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

  h2 {
    font-size: 24px;
    font-weight: 700;
    margin: 14px 0 20px;
  }

  p {
    font-size: 25px;
    font-weight: 500;
    color: #49b736;
    line-height: 1.5;
    margin-bottom: 15px;
  }
  span {
    font-size: 15px;
    display: inline-block;
    color: #888888;
    margin-bottom: 50px;
  }
`;

const StyleButton = styled(Button)`
  margin-top: auto;
  padding: 15px 45px;
  font-size: 16px;
  border-radius: 8px;
`;

export default function FloatTelePhone() {
  const { setViewModal } = ControlModalStore();
  const handleClose = () => {
    setViewModal(false);
  };
  return (
    <Div>
      <div className="Lockicon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-telephone"
          viewBox="0 0 16 16"
        >
          <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z" />
        </svg>
      </div>
      <h2>드림유학원 전화번호</h2>
      <p>
        1644-5161 <br />
        02-2038-3025
      </p>
      <span>전화연결은 모바일에서 가능합니다.</span>
      <StyleButton
        name="확인"
        Bgcolor="green"
        TitleColor="white"
        onClick={handleClose}
      />
    </Div>
  );
}
