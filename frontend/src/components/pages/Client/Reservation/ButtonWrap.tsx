import {
  GetPageCount,
  GetReservation,
  PostDeleteReservation,
} from "@/api/postApi";
import { ReservationMyListStore } from "@/store/userStore";
import { TableFormProps } from "@/types/forms";
import React, { useEffect } from "react";
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
  const { pageCount, setPageCount, currentPage, setCurrentPage } =
    ReservationMyListStore();

  // 페이지가 변경되면 (항목을 지워서 1로 돌아갔으면) 새로받아오기
  useEffect(() => {
    // 현재 페이지 값이 바뀐게 확인되어야만 데이터를 새로 요청한다.
    PageCount();
  }, [currentPage]);

  const PageCount = async () => {
    const res = await GetPageCount("mySubmitList", currentPage);
    setPageCount(Array.from({ length: res.result }, (_, i) => i + 1));
    setForm(res.TotalItems);
  };

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
    // const result = await GetReservation();
    // setForm(result.result);
    setCurrentPage(1); // 지웠으면 페이지 1로 돌아가기

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
