import React, { useRef } from "react";
import UserIdInputGroup from "../Reservation/InputGroup/UserIdInputGroup";
import Button from "@/components/common/Button";
import styled from "styled-components";
import { QuestionWritePageStore, useUserStore } from "@/store/userStore";

const StyledButton = styled(Button)`
  padding: 8px 12px;
  border-radius: 3px;
  box-sizing: border-box;
`;

const Div = styled.div`
  width: 100%;
`;
export default function UserIdInput() {
  const { changeName, setChangeName } = QuestionWritePageStore();
  const { role } = useUserStore();

  const buttonRef = useRef<HTMLButtonElement>(null);

  const hancleChange = () => {
    setChangeName(!changeName);
  };

  return (
    <Div>
      {changeName ? (
        <>
          <UserIdInputGroup type="readOnly" />
          {role === "admin" && (
            <StyledButton
              name="변경"
              Bgcolor="green"
              TitleColor="white"
              onClick={hancleChange}
            />
          )}
        </>
      ) : (
        <>
          <UserIdInputGroup type="input" buttonRef={buttonRef} />
          <StyledButton
            name="확인"
            Bgcolor="green"
            TitleColor="white"
            onClick={hancleChange}
            buttonRef={buttonRef}
          />
        </>
      )}
    </Div>
  );
}
