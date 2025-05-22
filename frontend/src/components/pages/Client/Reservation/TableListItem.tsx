import { ReservationMyListStore } from "@/store/userStore";
import { FormData } from "@/types/forms";
import React from "react";
import styled from "styled-components";

interface TableListItemProps {
  form: FormData;
  orderNum: number;
}

const TableRow = styled.tr<{ $form: boolean }>`
  td {
    padding: 20px 0;
    border-top: 1px solid #dddddd;
  }

  input {
    width: 16px;
    height: 16px;
  }
  .td_confirmed {
    color: ${(props) => (props.$form ? "#49B736" : "#C93E3E")};
  }
`;

export default function TableListItem({ form, orderNum }: TableListItemProps) {
  const { checkedList, setCheckedList } = ReservationMyListStore();
  const dateObj = new Date(form.createdAt);
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const date = String(dateObj.getDate()).padStart(2, "0");

  const handleChange = () => {
    const newArray = [...checkedList];
    newArray[orderNum] = !newArray[orderNum];
    setCheckedList(newArray);
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
      <td>{orderNum + 1}</td>
      <td>{form.userId}</td>
      <td>{`${year}.${month}.${date}`}</td>
      <td className="td_confirmed">
        {form.is_confirmed ? "확인완료" : "미확인"}
      </td>
    </TableRow>
  );
}
