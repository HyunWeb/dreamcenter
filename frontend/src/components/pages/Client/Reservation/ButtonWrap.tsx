import { GetReservation, PostDeleteReservation } from "@/api/postApi";
import { ReservationMyListStore } from "@/store/userStore";
import { TableFormProps } from "@/types/forms";
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

export default function ButtonWrap({ form, setForm }: TableFormProps) {
  const { checkedList, setCheckedList } = ReservationMyListStore();
  const handleChecked = () => {
    const newArr = new Array(checkedList.length).fill(true);
    setCheckedList(newArr);
  };

  const handleUnChecked = () => {
    const newArr = new Array(checkedList.length).fill(false);
    setCheckedList(newArr);
  };

  const handleDelete = async () => {
    // 삭제할 데이터의 id 값을 배열로 모은다.
    const deleteArray: number[] = [];
    checkedList.forEach((item, index) => {
      if (item === false) return;
      deleteArray.push(form[index].id);
    });

    const res = await PostDeleteReservation(deleteArray);
    const result = await GetReservation();
    setForm(result.result);

    if (res.message === "삭제 성공") {
      alert("삭제 성공");
    }
  };

  return (
    <Div>
      <Button onClick={handleChecked}>전체선택</Button>
      <Button onClick={handleUnChecked}>선택해제</Button>
      <DeleteButton onClick={handleDelete}>삭제</DeleteButton>
    </Div>
  );
}
