import {
  GetPageCount,
  GetReservation,
  PostDeleteReservation,
  UpdateConfirm,
  UpdateUnConfirm,
} from "@/api/postApi";
import { ReservationMyListStore, useAlertStore } from "@/store/userStore";
import { FormDataTableFormProps, TableFormProps } from "@/types/forms";
import React, { useEffect } from "react";
import styled from "styled-components";

const Div = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  justify-content: space-between;

  .left-align {
    display: flex;
    gap: 8px;
  }

  .right-align {
    display: flex;
    gap: 8px;
  }
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
  font-weight: 500;
  cursor: pointer;
  @media (max-width: 1024px) {
    font-size: 13px;
    padding: 5px 8px;
    border-radius: 4px;
  }
`;
const DeleteButton = styled(Button)`
  background-color: #c93e3e;
  color: white;
`;
const ConfirmButton = styled(Button)`
  background-color: #49b736;
  color: white;
  margin-left: 20px;
`;

export default function ButtonWrap({
  form,
  setForm,
  type,
}: FormDataTableFormProps) {
  const { showAlert } = useAlertStore();
  const { checkedList, setCheckedList } = ReservationMyListStore();
  const { pageCount, setPageCount, currentPage, setCurrentPage } =
    ReservationMyListStore();

  // 페이지가 변경되면 (항목을 지워서 1로 돌아갔으면) 새로받아오기
  useEffect(() => {
    // 현재 페이지 값이 바뀐게 확인되어야만 데이터를 새로 요청한다.
    PageCount();
  }, [currentPage]);

  const PageCount = async () => {
    if (!setForm) return;
    const res = await GetPageCount("mySubmitList", currentPage);
    if (!res || !res.result) return;
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
    if (checkedList.length === 0) return;
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
      showAlert("예약 내역이 삭제되었습니다.");
      PageCount();
    }
  };

  const handleConfirm = async () => {
    if (!setForm) return;
    const updated = form.map((item, index) =>
      checkedList[index] ? { ...item, is_confirmed: true } : item
    );

    setForm(updated);

    const confirmedIds = form
      .filter((_, index) => checkedList[index])
      .map((item) => item.id);

    if (confirmedIds.length > 0) {
      const response = await UpdateConfirm(confirmedIds);
      showAlert("확인 처리 되었습니다.");
    }
  };

  const handleUnConfirm = async () => {
    if (!setForm) return;
    const updated = form.map((item, index) =>
      checkedList[index] ? { ...item, is_confirmed: false } : item
    );

    setForm(updated);

    const confirmedIds = form
      .filter((_, index) => !checkedList[index])
      .map((item) => item.id);

    if (confirmedIds.length > 0) {
      const response = await UpdateUnConfirm(confirmedIds);
      showAlert("확인 해제 되었습니다.");
    }
  };

  return (
    <Div>
      <div className="left-align">
        <Button onClick={handleChecked}>전체선택</Button>
        <Button onClick={handleUnChecked}>선택해제</Button>
      </div>
      <div className="right-align">
        {type === "AdminPage" && (
          <>
            <ConfirmButton onClick={handleConfirm}>확인완료</ConfirmButton>
            <Button onClick={handleUnConfirm}>확인해제</Button>
            <DeleteButton onClick={handleDelete}>삭제</DeleteButton>
          </>
        )}
      </div>
      {type !== "AdminPage" && (
        <DeleteButton onClick={handleDelete}>삭제</DeleteButton>
      )}
    </Div>
  );
}
