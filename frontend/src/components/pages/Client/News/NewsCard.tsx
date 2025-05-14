import React from "react";
import styled from "styled-components";

interface NewsDataProps {
  date: string;
  description: string;
  img: string;
  link: string;
  title: string;
}

const LinkBlock = styled.a<{ $imageUrl: string }>`
  display: block;
  text-decoration: none;
  color: inherit;

  padding: 40px 28px;
  border-radius: 10px;
  box-sizing: border-box;
  width: 30%;
  background-color: #f8f8f8;
  text-align: left;
  margin-bottom: 30px;

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

export default function NewsCard({
  title,
  date,
  description,
  img,
  link,
}: NewsDataProps) {
  return (
    <LinkBlock href={link} $imageUrl={img}>
      <article>
        <Source>네이버 블로그</Source>
        <h3 className="middle-title">{title}</h3>
        <Date className="description">{date}</Date>
        <p className="paragraph">{description}</p>
      </article>
    </LinkBlock>
  );
}
