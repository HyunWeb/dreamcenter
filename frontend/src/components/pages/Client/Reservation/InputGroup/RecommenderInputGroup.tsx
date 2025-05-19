import React from "react";
import styled from "styled-components";

const SingleInput = styled.input`
  height: 40px;
  width: 100%;
  border: 1px solid #dddddd;
  padding-left: 10px;
  font-size: 16px;
`;

export default function RecommenderInputGroup() {
  return (
    <>
      <SingleInput type="text" id="recommender" name="recommender" />
    </>
  );
}
