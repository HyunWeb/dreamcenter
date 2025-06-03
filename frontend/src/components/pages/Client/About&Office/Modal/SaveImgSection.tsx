import React from "react";
import styled from "styled-components";
import UploadFile from "./UploadFile";
import ImgListItem from "./ImgListItem";
import { ReactSortable } from "react-sortablejs";

type FileItem = {
  id: string;
  file: File;
};

interface SaveImgSectionProps {
  files: FileItem[];
  setFiles: React.Dispatch<React.SetStateAction<FileItem[]>>;
}

const Section = styled.section`
  display: flex;
  margin-top: 40px;
  justify-content: space-around;
  align-items: flex-start;
  height: 50%;
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
`;

const ImgList = styled.div`
  width: 40%;
  overflow-y: auto;
  height: 100%;
  scrollbar-width: thin;
  div {
    color: #dddddd;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      font-size: 18px;
      font-weight: 600;
    }
  }
  li {
    display: flex;
    align-items: center;
    border-bottom: 2px solid #dddddd;
    margin-bottom: 16px;
    height: 20%;
    svg {
      width: 24px;
      height: 24px;
      color: #888888;
      margin: 5px;
    }
    p {
      width: 70%;
      flex-grow: 1;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      line-height: 1.5;
    }
    button {
      background-color: transparent;
      border: none;
      padding: 5px;
      cursor: pointer;
    }
  }
`;

export default function SaveImgSection({
  files,
  setFiles,
}: SaveImgSectionProps) {
  return (
    <Section>
      <UploadFile files={files} setFiles={setFiles} />
      <ImgList>
        {files.length ? (
          <ReactSortable
            tag="ul"
            list={files}
            setList={setFiles}
            animation={150}
          >
            {files.map((file, index) => (
              <ImgListItem
                key={index}
                file={file}
                index={index}
                files={files}
                setFiles={setFiles}
              />
            ))}
          </ReactSortable>
        ) : (
          <div>
            <span>파일을 선택해주세요.</span>
          </div>
        )}
      </ImgList>
    </Section>
  );
}
