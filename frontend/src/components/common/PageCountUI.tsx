import { GetPageCount } from "@/api/postApi";
import React, { SetStateAction, useEffect } from "react";
import styled from "styled-components";
import { FormData, QuestionData } from "@/types/forms";
import { ReservationMyListStore, SearchStore } from "@/store/userStore";
const Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 70px auto 0;

  .arrowButton {
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    background-color: transparent;
    color: #888888;
    width: 35px;
    height: 35px;
    cursor: pointer;
    svg {
      width: 35px;
      height: 35px;
    }

    &:hover {
      color: #49b736;
    }
  }
`;

const Ul = styled.ul`
  display: flex;
  align-items: center;
  color: #888888;
  gap: 8px;
  margin: 0 24px;

  li {
    .Countselected {
      background-color: #49b736;
      color: white;
      cursor: default;
    }
  }
`;

const PageButton = styled.button`
  background-color: transparent;
  border: none;
  color: #888888;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin: auto;
  line-height: 30px;
  cursor: pointer;
  font-size: 16px;
`;
//FormData[] | QuestionData[]
// type CommonFormSetter<T> = React.Dispatch<React.SetStateAction<T[]>>;

interface MyListSectionProps<T> {
  form: T[];
  setForm: React.Dispatch<React.SetStateAction<T[]>>;
  type: string;
}

export default function PageCountUI<T>({
  form,
  setForm,
  type,
}: MyListSectionProps<T>) {
  const { pageCount, setPageCount, currentPage, setCurrentPage } =
    ReservationMyListStore();
  const { searchList, searchData } = SearchStore();

  const PageCount = async () => {
    const res = await GetPageCount(type, currentPage);
    if (res === undefined) {
      console.error("데이터 결과 없음");
      return;
    }

    // 결과인 숫자를 바탕으로 필요한 페이지 수만큼 배열 생성
    setPageCount(Array.from({ length: res.result }, (_, i) => i + 1));
    setForm(res.TotalItems);
  };

  const SearchPageCount = async () => {
    const limit = 10;
    const NeedPage = Math.ceil(searchData.length / limit);
    const offset = (currentPage - 1) * limit;
    const sliced = searchData.slice(offset, offset + limit) as T[];
    setPageCount(Array.from({ length: NeedPage }, (_, i) => i + 1));
    setForm(sliced);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchList]);

  useEffect(() => {
    // 현재 페이지 값이 바뀐게 확인되어야만 데이터를 새로 요청한다.
    if (type === "SearchList") {
      SearchPageCount();
    } else {
      PageCount();
    }
  }, [currentPage, searchList, searchData]);

  const handleChangePage = async (index: number) => {
    setCurrentPage(index);
  };

  const handleDown = () => {
    if (currentPage === 1) return;
    setCurrentPage(currentPage - 1);
  };

  const handleUp = () => {
    const Maxlength = pageCount.length;
    if (currentPage === Maxlength) return;
    setCurrentPage(currentPage + 1);
  };

  const handleStart = () => {
    setCurrentPage(1);
  };
  const handleEnd = () => {
    const Maxlength = pageCount.length;
    setCurrentPage(Maxlength);
  };
  return (
    <Div>
      <button className="arrowButton" onClick={handleStart}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-chevron-double-left"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
          />
          <path
            fillRule="evenodd"
            d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
          />
        </svg>
      </button>
      <button className="arrowButton" onClick={handleDown}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-chevron-left"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
          />
        </svg>
      </button>
      <Ul>
        {pageCount.map((item, index) => {
          return (
            <li key={index}>
              <PageButton
                className={item === currentPage ? "Countselected" : ""}
                onClick={() => handleChangePage(item)}
              >
                {item}
              </PageButton>
            </li>
          );
        })}
      </Ul>
      <button className="arrowButton" onClick={handleUp}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-chevron-right"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
          />
        </svg>
      </button>
      <button className="arrowButton" onClick={handleEnd}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-chevron-double-right"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708"
          />
          <path
            fillRule="evenodd"
            d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708"
          />
        </svg>
      </button>
    </Div>
  );
}
