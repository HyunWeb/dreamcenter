import React, { useEffect, useState } from "react";
import CustomLink from "../../../common/CustomLink";
import styled from "styled-components";
import { getNews } from "@/api/postApi";
import { NewsItem } from "@/types/forms";

interface NewsDataProps {
  date: string;
  description: string;
  img: string;
  link: string;
  title: string;
}

const PrevDiv = styled.div`
  h3 {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    width: 100%;
    font-weight: 700;
  }
`;

const LinkBlog = styled.a`
  width: 130px;
  line-height: 2;

  text-decoration: none;
  display: block;
  color: #49b736;
  font-weight: 600;
  position: relative;
  svg {
    position: absolute;
    top: 50%;
    right: 0px;
    transform: translateY(-50%);
  }
`;

const Section = styled.section`
  margin-bottom: 70px;
  article {
    display: flex;
    justify-content: space-between;

    ul {
      width: 45%;
      display: flex;
      flex-direction: column;
      gap: 20px;
      .newsActive {
        background-color: #f8f8f8;
        svg {
          color: #49b736;
        }
      }
      li {
        width: 100%;
        padding: 16px 40px;
        cursor: pointer;
        border-bottom: 1px solid #dddddd;
        position: relative;
        h3 {
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          width: 80%;
        }

        svg {
          position: absolute;
          top: 50%;
          right: 10px;
          transform: translateY(-50%);
          width: 25px;
          height: 25px;
          color: #888888;
        }
      }
    }
    div {
      width: 45%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-end;
      p {
        margin-top: 20px;
        line-height: 2;
      }
    }

    img {
      width: 100%;
    }
  }
`;

const NewsUl = styled.ul`
  height: 100%;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #dddddd;

  padding: 24px 16px;
  margin-bottom: 30px;
  position: relative;
`;

export default function SectionNews() {
  const [newsList, setNewsList] = useState<NewsDataProps[]>([]);
  const [preview, setPreview] = useState<NewsItem>();

  useEffect(() => {
    const fetchNews = async () => {
      const res = await getNews();
      setNewsList(res.message.slice(0, 4));
    };
    fetchNews();
  }, []);

  useEffect(() => {
    setPreview(newsList[0]);
  }, [newsList]);

  return (
    <Section>
      <Header>
        <h2 className="Section-title">한눈에 보는 드림센터 소식</h2>
        <CustomLink to={"news"} />
      </Header>
      <article>
        <NewsUl>
          {newsList.map((item, index) => {
            return (
              <li
                onClick={() => setPreview(item)}
                key={index}
                className={preview?.date === item.date ? "newsActive" : ""}
              >
                <h3 className="Section-NewsTitle">{item.title}</h3>
                <time className="Section-NewsDate" dateTime="2000-01-01">
                  {item.date}
                </time>
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
              </li>
            );
          })}
        </NewsUl>
        <PrevDiv>
          <h3 className="Section-NewsTitle">{preview?.title}</h3>
          <p>{preview?.description}</p>
          {preview && (
            <LinkBlog href={preview?.link} target="_blank">
              블로그 바로가기
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
            </LinkBlog>
          )}
        </PrevDiv>
      </article>
    </Section>
  );
}
