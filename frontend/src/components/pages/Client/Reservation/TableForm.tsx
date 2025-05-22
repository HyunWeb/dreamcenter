import React, { useEffect, useState } from "react";
import TableListItem from "./TableListItem";
import { GetReservation } from "@/api/postApi";
import { TableFormProps } from "@/types/forms";
import styled from "styled-components";
import { ReservationMyListStore } from "@/store/userStore";

const Table = styled.table`
  width: 100%;

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
`;

export default function TableForm({ form, setForm }: TableFormProps) {
  const { setCheckedList } = ReservationMyListStore();

  // 데이터가 들어오면 개수를 파악해서 체크상태 유동적으로 설정
  useEffect(() => {
    setCheckedList(new Array(form.length).fill(false));
  }, [form]);

  // useEffect(() => {
  //   const fetchSubmitData = async () => {
  //     const res = await GetReservation();
  //     setForm(res.result);
  //   };
  //   fetchSubmitData();
  // }, []);
  return (
    <Table>
      <thead>
        <TableRow>
          <th>선택</th>
          <th>번호</th>
          <th>신청인</th>
          <th>등록일</th>
          <th>확인여부</th>
        </TableRow>
      </thead>
      <tbody>
        {form.map((form, index) => {
          return <TableListItem form={form} key={index} orderNum={index} />;
        })}
      </tbody>
    </Table>
  );
}
