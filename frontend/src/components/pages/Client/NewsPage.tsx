import React, { useEffect, useState } from "react";
import { getNews } from "../../../api/postApi";

import styled from "styled-components";
import NewsCard from "./News/NewsCard";
import PageHeader from "../../common/PageHeader";

interface NewsDataProps {
  date: string;
  description: string;
  img: string;
  link: string;
  title: string;
}

const Div = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  h2 {
    margin-bottom: 12px;
  }
  button {
    align-self: flex-end;
    background-color: #49b736;
    font-size: 16px;
    font-weight: 400;
    color: white;
    padding: 12px 40px;
    border: none;
    cursor: pointer;
    margin-bottom: 60px;
  }
`;
const Section = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;

  margin-bottom: 120px;
`;
export default function NewsPage() {
  const [newsList, setNewsList] = useState<NewsDataProps[]>([]);

  const fetchNews = async () => {
    const res = await getNews();
    setNewsList(res.message.slice(0, 9));
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleSyncClick = () => {
    fetchNews(); // 동일 함수 재사용
  };

  return (
    <Div>
      <PageHeader title={"소식"} root={"소식"} />

      <button onClick={handleSyncClick}>블로그 동기화</button>
      <Section>
        {newsList &&
          newsList?.map((item, index) => {
            return <NewsCard key={index} {...item} />;
          })}
      </Section>
    </Div>
  );
}
