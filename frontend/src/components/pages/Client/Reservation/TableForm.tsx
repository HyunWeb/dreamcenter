import React, { Children, useEffect, useState } from "react";
import TableListItem from "./TableListItem";
import { GetReservation } from "@/api/postApi";
import { TableFormProps } from "@/types/forms";
import styled from "styled-components";
import { ReservationMyListStore } from "@/store/userStore";

const Table = styled.table`
  width: 100%;
  /* table-layout: fixed; */

  thead {
    border-top: 1px solid #111111;
    border-bottom: 1px solid #111111;
  }
  tbody {
    border-bottom: 1px solid #111111;
    tr:first-child {
      border-top: none;
    }
  }
`;

const TableRow = styled.tr`
  font-size: 20px;
  font-weight: 600;

  th {
    padding: 20px 0;
  }
  @media (max-width: 1024px) {
    font-size: 15px;
    white-space: nowrap;
  }
`;

export default function TableForm<T>({
  headers,
  form,
  children,
}: TableFormProps<T>) {
  const { setCheckedList } = ReservationMyListStore();

  // 데이터가 들어오면 개수를 파악해서 체크상태 유동적으로 설정
  useEffect(() => {
    setCheckedList(new Array(form.length).fill(false));
  }, [form]);

  return (
    <Table>
      <thead>
        <TableRow>
          {headers!.map((head, i) => {
            return <th key={i}>{head}</th>;
          })}
        </TableRow>
      </thead>
      <tbody style={{ textAlign: "center" }}>{children}</tbody>
    </Table>
  );
}
