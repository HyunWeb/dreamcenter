import React from "react";
import styled from "styled-components";

const Div = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
`;
const Button = styled.button`
  background-color: #eaeaea;
  color: #111111;
  padding: 6px 20px;
  border-radius: 3px;
  border: none;
  font-size: 16px;
  box-sizing: border-box;
  line-height: 1.5;
  cursor: pointer;
`;
const DeleteButton = styled(Button)`
  background-color: #c93e3e;
  color: white;
`;

export default function ButtonWrap() {
  return (
    <Div>
      <Button>전체선택</Button>
      <Button>선택해제</Button>
      <DeleteButton>삭제</DeleteButton>
    </Div>
  );
}
