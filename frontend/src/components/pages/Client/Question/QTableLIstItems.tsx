import { ControlModalStore, ReservationMyListStore } from "@/store/userStore";
import { QuestionData } from "@/types/forms";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
interface TableListItemProps {
  form: QuestionData;
  orderNum: number;
}

const TableRow = styled.tr<{ $form: boolean; $private: boolean }>`
  border-top: 1px solid #dddddd;

  td {
    padding: 20px 0;
  }
  .QuestionTitle {
    width: 50%;
    color: ${(props) => (props.$private ? "#888888" : "#111111")};
    cursor: pointer;
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
  @media (max-width: 1024px) {
    td {
      font-size: 14px;
      white-space: nowrap;
      padding: 12px 10px;
      line-height: 1.6;
    }
    /* .QuestionNickname {
      display: none;
    }
    .QuestionDate {
      display: none;
    } */
  }
`;

//타 페이지 에서 쓰는 TableListItem이 이미 있지만 세부 내용이 다르므로 따로 만든다.
export default function QTableLIstItems({
  form,
  orderNum,
}: TableListItemProps) {
  const navigate = useNavigate();
  const { currentPage } = ReservationMyListStore();
  const { setViewModal, setPostId, setType } = ControlModalStore();
  const [startIndex, setStartIndex] = useState<number>(0);
  const listNumber = startIndex + orderNum;
  // 날짜 조정
  const dateObj = new Date(form.createdAt);
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const date = String(dateObj.getDate()).padStart(2, "0");

  // 목차 시작 인덱스를 현재 페이지 기반으로 재 계산
  const limit = 10;

  useEffect(() => {
    setStartIndex((currentPage - 1) * limit + 1);
  }, [currentPage]);

  const handleClick = () => {
    if (form.isPrivate) {
      setViewModal(true);
      setPostId(form.id);
      setType("privateLock");
    } else {
      navigate(`/questions/${form.id}`);
    }
  };
  return (
    <TableRow $form={form.is_confirmed} $private={form.isPrivate}>
      <td>{listNumber}</td>
      <td className="QuestionTitle" onClick={handleClick}>
        {form.isPrivate ? "[비공개 질문입니다]" : form.title}
      </td>
      <td className="QuestionNickname">{form.nickname}</td>
      <td className="QuestionDate">{`${year}.${month}.${date}`}</td>
      <td className="td_confirmed">
        {form.is_confirmed ? "답변완료" : "답변대기"}
      </td>
    </TableRow>
  );
}
