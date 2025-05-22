import React from "react";
import styled from "styled-components";

interface PreviewImgListProps {
  file: Slide;
  existingImages: Slide[];
  setExistingImages: React.Dispatch<React.SetStateAction<Slide[]>>;
  setPrevImg: React.Dispatch<React.SetStateAction<string>>;
}
type Slide = {
  created_at: string;
  name: string;
  id: number;
  image_url: string;
  sort_order: number;
};

const List = styled.li`
  text-align: left;
  list-style: none;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 2px solid #dddddd;
  width: 100%;
  overflow: hidden;
  cursor: pointer;

  svg {
    width: 24px;
    height: 24px;
    color: #888888;
    margin: 5px;
  }

  div {
    width: 200px;
    height: 150px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 100%;
    }
  }
  p {
    padding-left: 10px;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  button {
    background-color: transparent;
    border: none;
    padding: 5px;
    cursor: pointer;
  }
`;

export default function PreviewImgList({
  file,
  existingImages,
  setExistingImages,
  setPrevImg,
}: PreviewImgListProps) {
  const handleRemove = (targetFile: Slide) => {
    // 선택한 파일과 다른 요소들만 재정리
    setExistingImages((prevFiles) =>
      prevFiles.filter((file) => file.id !== targetFile.id)
    );
  };

  const handlePrevImg = () => {
    setPrevImg(file.image_url);
  };
  return (
    <List onClick={handlePrevImg}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-list"
        viewBox="0 0 16 16"
      >
        <path
          fillRule="evenodd"
          d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
        />
      </svg>
      <p>{file.name}</p>
      <button onClick={() => handleRemove(file)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-trash"
          viewBox="0 0 16 16"
        >
          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
          <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
        </svg>
      </button>
    </List>
  );
}
