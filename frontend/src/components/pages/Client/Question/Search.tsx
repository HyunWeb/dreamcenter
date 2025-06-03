import { getSearch } from "@/api/postApi";
import { ReservationMyListStore, SearchStore } from "@/store/userStore";
import { QuestionData } from "@/types/forms";
import React, { useRef, useState } from "react";
import styled from "styled-components";

const Section = styled.section`
  background-color: #f8f8f8;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
  margin: 50px 0 30px;
  gap: 12px;
`;
const Select = styled.select`
  padding: 7px 8px;
  border: 1px solid #dddddd;
`;
const Input = styled.input`
  padding: 7px 16px;
  border: 1px solid #dddddd;
  width: 300px;
`;
const SearchButtton = styled.button`
  color: white;
  background-color: #49b736;
  border: none;
  width: 36px;
  height: 36px;
  cursor: pointer;
`;

interface MyListSectionProps {
  setForm: React.Dispatch<React.SetStateAction<QuestionData[]>>;
}

export default function Search({ setForm }: MyListSectionProps) {
  const [keyword, setKeyword] = useState("");
  const [searchField, setSearchField] = useState("title");
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const { setSearchList, setSearchData } = SearchStore();
  const { setCurrentPage } = ReservationMyListStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleField = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchField(e.target.value);
  };

  // 검색 수행
  const handleSearch = async () => {
    // 아무것도 입력 안했을 경우 전체 리스트 보여주기
    if (keyword === "") {
      setSearchList(false);
      return;
    }
    // 입력 키워드를 토대로 검색 수행
    const res = await getSearch(keyword, searchField);
    // 게시글 데이터가 든 배열을 변수에 담아둔다.
    const searchData = res.result;
    // 성공적으로 받아왔을 경우 수행
    if (res.success) {
      setSearchList(true); // 페이지 카운트ui를 검색 전용으로 변경
      if (res.result.length <= 10) {
        // 10개 이하인 데이터는 페이지 변경이 필요없으니 바로 렌더링
        setCurrentPage(1);
        setSearchData(res.result);
        setForm(res.result);
      } else if (res.result.length > 10) {
        // 10개 이상의 데이터는 초기 10개만 잘라서 표시한다.
        const limit = 10;
        const offset = 0;
        const sliced = searchData.slice(offset, offset + limit);
        setSearchData(res.result); // 검색 결과 담아두기
        setForm(sliced); // 실질적인 리스트 렌더링
      } else if (res.result.length === 0) {
        alert("검색 결과가 존재하지 않습니다.");
        return;
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && buttonRef) handleSearch();
  };
  return (
    <Section>
      <Select name="searchField" id="searchField" onChange={handleField}>
        <option value="title">제목</option>
        <option value="nickname">글쓴이</option>
      </Select>
      <Input
        type="text"
        placeholder="검색어를 입력하세요"
        value={keyword}
        onChange={(e) => handleChange(e)}
        onKeyDown={handleKeyDown}
      />
      <SearchButtton onClick={handleSearch} ref={buttonRef}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-search"
          viewBox="0 0 16 16"
        >
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
        </svg>
      </SearchButtton>
    </Section>
  );
}
