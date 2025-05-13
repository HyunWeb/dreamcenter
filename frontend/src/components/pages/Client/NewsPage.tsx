import React, { useEffect, useState } from "react";
import { getNews } from "../../../api/postApi";
import CurrentRoot from "../../common/CurrentRoot";
import styled from "styled-components";

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

const LinkBlock = styled.a<{ $imageUrl: string }>`
  display: block;
  text-decoration: none;
  color: inherit;

  padding: 40px 28px;
  border-radius: 10px;
  width: 30%;
  background-color: #f8f8f8;
  text-align: left;

  h3 {
    margin-bottom: 8px;
    line-height: 1.4;
  }
  p {
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 5; /* 최대 4줄까지만 보이게 */
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;
const Source = styled.span`
  color: #49b736;
  display: block;
  margin-bottom: 16px;
`;
const Date = styled.span`
  display: block;
  margin-bottom: 16px;
`;
export default function NewsPage() {
  const [newsList, setNewsList] = useState<NewsDataProps[]>([]);

  useEffect(() => {
    const axiosData = async () => {
      const res = await getNews();
      console.log(res.message);
      setNewsList(res.message);
    };
    axiosData();
  }, []);

  return (
    <Div>
      <h2 className="Section-title">오시는 길</h2>
      <CurrentRoot root1={"소식"} />
      <button>블로그 동기화</button>
      <section>
        <LinkBlock href={newsList[0]?.link} $imageUrl={newsList[0]?.img}>
          <article>
            <Source>네이버 블로그</Source>
            <h3 className="middle-title">{newsList[0]?.title}</h3>
            <Date className="description">{newsList[0]?.date}</Date>
            <p className="paragraph">{newsList[0]?.description}</p>
          </article>
        </LinkBlock>
      </section>
    </Div>
  );
}
