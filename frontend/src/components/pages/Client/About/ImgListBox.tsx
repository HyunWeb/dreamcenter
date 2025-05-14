import React from "react";
import styled from "styled-components";
import ImgMovBtn from "./ImgMovBtn";

const Div = styled.div`
  position: relative;
`;

const ImgListView = styled.div`
  width: 100%;
  overflow: hidden;
`;

const ImageList = styled.ul`
  display: flex;
  width: calc((100% / 4) * 6);

  li {
    height: 20vh;
    width: calc(100% / 6);
    padding: 5px;
    box-sizing: border-box;
    flex-shrink: 0;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 100%;
    }
  }
`;
export default function ImgListBox() {
  return (
    <Div>
      <ImgMovBtn direction="leftSmall" />
      <ImgListView>
        <ImageList>
          <li>
            <img src="./office0.jpg" alt="" />
          </li>
          <li>
            <img src="./office0.jpg" alt="" />
          </li>
          <li>
            <img src="./office0.jpg" alt="" />
          </li>
          <li>
            <img src="./office0.jpg" alt="" />
          </li>
          <li>
            <img src="./office0.jpg" alt="" />
          </li>
          <li>
            <img src="./office0.jpg" alt="" />
          </li>
        </ImageList>
      </ImgListView>
      <ImgMovBtn direction="rightSmall" />
    </Div>
  );
}
