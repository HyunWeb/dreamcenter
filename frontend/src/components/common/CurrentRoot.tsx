import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

interface CurrentRootProps {
  root1: string;
  root1Url?: string;
  root2?: string;
}

const P = styled.p`
  color: #888888;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  svg {
    color: #888888;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #888888;
`;

export default function CurrentRoot({
  root1,
  root1Url,
  root2,
}: CurrentRootProps) {
  const [rootNum, setRootNum] = useState(true);

  useEffect(() => {
    if (root2) {
      setRootNum(false);
    } else {
      setRootNum(true);
    }
  }, []);

  return (
    <P>
      <Link to="/">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-house-door"
          viewBox="0 0 16 16"
        >
          <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4z" />
        </svg>
      </Link>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="10"
        height="10"
        fill="currentColor"
        className="bi bi-chevron-right"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
        />
      </svg>
      {rootNum ? (
        root1
      ) : (
        <>
          <StyledLink to={root1Url!}>{root1}</StyledLink>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="10"
            fill="currentColor"
            className="bi bi-chevron-right"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
            />
          </svg>
          {root2}
        </>
      )}
    </P>
  );
}
