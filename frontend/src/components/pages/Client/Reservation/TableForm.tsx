import React, { useEffect, useState } from "react";
import TableListItem from "./TableListItem";
import { GetReservation } from "@/api/postApi";
import { FormData } from "@/types/forms";
import styled from "styled-components";

const Table = styled.table`
  width: 100%;
`;

const TableRow = styled.tr`
  font-size: 20px;
  font-weight: 600;
  border-top: 1px solid #111111;
  border-bottom: 1px solid #111111;
  th {
    padding: 20px 0;
  }
  .select-th {
  }
  .number-th {
  }
  .name-th {
  }
  .date-th {
  }
  .comfirm-th {
  }
`;

export default function TableForm() {
  const [form, setForm] = useState<FormData[]>([]);

  useEffect(() => {
    const fetchSubmitData = async () => {
      const res = await GetReservation();
      console.log(res.result);
      setForm(res.result);
    };
    fetchSubmitData();
  }, []);
  return (
    <Table>
      <thead>
        <TableRow>
          <th className="select-th">선택</th>
          <th className="number-th">번호</th>
          <th className="name-th">신청인</th>
          <th className="date-th">등록일</th>
          <th className="comfirm-th">확인여부</th>
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
