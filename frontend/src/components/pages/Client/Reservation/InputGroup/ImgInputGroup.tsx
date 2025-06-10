import React, { useEffect } from "react";
import styled from "styled-components";
import DeleteButton from "@/components/common/DeleteButton";
import { ReservationInputStore } from "@/store/userStore";
import { v4 as uuidv4 } from "uuid";
import { spawn } from "child_process";

const ImgDiv = styled.div`
  display: flex;
  justify-content: space-between;
  flex-grow: 1;
  width: 100%;
  ul {
    overflow-x: hidden;
    overflow-y: auto;
    width: 40%;
    height: 300px;
    text-align: left;
    li {
      white-space: nowrap;
      text-overflow: ellipsis;
      padding: 10px;
      margin-left: 10px;
    }
  }
  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 20px;
    ul {
      width: 100%;
      .emptyFileText {
        text-align: center;
        display: block;
        color: #888888;
        font-size: 15px;
      }
    }
  }
`;

const ImgLabel = styled.label`
  color: #888888;
  border: 3px dashed #dddddd;
  box-sizing: border-box;
  padding: 50px 71px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
  border-radius: 20px;
  width: 60%;
  height: 100%;

  svg {
    width: 45px;
    height: 40px;
  }
  p {
    margin-top: 16px;
    font-size: 16px;
  }
  @media (max-width: 1024px) {
    width: 100%;
  }
`;

const ImgListItems = styled.li`
  display: flex;
  align-items: center;
  border-bottom: 2px solid #dddddd;
  margin-bottom: 16px;

  svg {
    width: 24px;
    height: 24px;
    color: #888888;
  }

  span {
    display: block;
    width: 70%;
    flex-grow: 1;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    line-height: 1.5;
    margin-left: 10px;
  }

  button {
    background-color: transparent;
    border: none;
    padding: 10px;
    cursor: pointer;
  }
`;
export default function ImgInputGroup() {
  const { file, setFiles } = ReservationInputStore();
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files;
    if (!selectedFile) return;

    const newFiles = Array.from(selectedFile);
    const newItems = newFiles.map((file) => ({
      id: uuidv4(), // 또는 uuid(), index.toString() 등
      file,
    }));
    setFiles((prev) => [...prev, ...newItems]);
  };
  return (
    <>
      <ImgDiv>
        <ImgLabel
          htmlFor="photoUpload"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const file = e.dataTransfer.files;
            const ArrayFile = Array.from(file);

            const newItems = ArrayFile.map((file, index) => ({
              id: uuidv4(),
              file,
            }));

            setFiles((prev) => [...prev, ...newItems]);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-image"
            viewBox="0 0 16 16"
          >
            <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
            <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1z" />
          </svg>
          <p>파일을 선택해주세요</p>
        </ImgLabel>
        <ul>
          {file.length ? (
            file.map((item, index) => {
              return (
                <ImgListItems key={index}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-file-earmark-text"
                    viewBox="0 0 16 16"
                  >
                    <path d="M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5" />
                    <path d="M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z" />
                  </svg>
                  <span>{item.file.name}</span>
                  <DeleteButton file={item} setFiles={setFiles} />
                </ImgListItems>
              );
            })
          ) : (
            <li className="emptyFileText">선택된 파일이 존재하지 않습니다.</li>
          )}
        </ul>
      </ImgDiv>
      <input
        type="file"
        id="photoUpload"
        name="photo"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
        multiple
      />
    </>
  );
}
