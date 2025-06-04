import { ReservationMyListStore } from "@/store/userStore";
import { FormData } from "@/types/forms";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

interface TableListItemProps {
  form: FormData;
  orderNum: number;
}

const TableRow = styled.tr<{ $form: boolean }>`
  border-top: 1px solid #dddddd;

  td {
    padding: 20px 0;
  }

  input {
    width: 16px;
    height: 16px;
  }
  .td_confirmed {
    color: ${(props) => (props.$form ? "#49B736" : "#C93E3E")};
  }

  .ClickPoint {
    cursor: pointer;
    border-bottom: 1px solid #111111;
    padding-bottom: 4px;
    display: inline-block;
  }
`;

export default function TableListItem({ form, orderNum }: TableListItemProps) {
  const { checkedList, setCheckedList, currentPage, setViewMode } =
    ReservationMyListStore();
  const [startIndex, setStartIndex] = useState<number>(0);
  const dateObj = new Date(form.createdAt);
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const date = String(dateObj.getDate()).padStart(2, "0");
  const listNumber = startIndex + orderNum;

  // 목차 시작 인덱스를 현재 페이지 기반으로 재 계산
  const limit = 10;
  useEffect(() => {
    setStartIndex((currentPage - 1) * limit + 1);
  }, [currentPage]);

  const handleChange = () => {
    const newArray = [...checkedList];
    newArray[orderNum] = !newArray[orderNum];
    setCheckedList(newArray);
  };

  const hancleClick = () => {
    setViewMode(["detail", form.id]);
  };
  return (
    <TableRow $form={form.is_confirmed}>
      <td>
        <input
          type="checkbox"
          checked={checkedList[orderNum] || false}
          onChange={handleChange}
        />
      </td>
      <td>{listNumber}</td>
      <td className="ClickPoint" onClick={hancleClick}>
        {form.name}
      </td>
      <td>{`${year}.${month}.${date}`}</td>
      <td className="td_confirmed">
        {form.is_confirmed ? "확인완료" : "미확인"}
      </td>
    </TableRow>
  );
}
