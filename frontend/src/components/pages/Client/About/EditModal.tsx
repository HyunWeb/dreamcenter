import Button from "../../../common/Button";
import React, { useState } from "react";
import styled from "styled-components";
const Div = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 880px;
  height: 500px;
  border-radius: 20px;
  background-color: white;
  padding: 40px 60px;
  box-sizing: border-box;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  padding-bottom: 20px;
  border-bottom: 2px solid #dddddd;
`;

const Section = styled.section`
  display: flex;
  margin-top: 40px;
  justify-content: space-around;
  align-items: flex-start;
  height: 50%;
`;

const Label = styled.label`
  color: #888888;
  border: 3px dashed #dddddd;
  box-sizing: border-box;
  padding: 50px 71px;
  cursor: pointer;

  svg {
    width: 45px;
    height: 40px;
  }
  p {
    margin-top: 16px;
    font-size: 16px;
  }
`;

const ImgList = styled.ul`
  width: 50%;
  overflow-y: auto;
  height: 100%;
  scrollbar-width: thin;
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

const StyledButton = styled(Button)`
  padding: 12px 45px;
  box-sizing: border-box;
  border-radius: 8px;
`;

const ButtonWrap = styled.div`
  display: flex;
  gap: 24px;
  justify-content: center;
  margin-top: 60px;
`;

export default function EditModal() {
  const [files, setFiles] = useState<File[]>([]);

  const imageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files;
    if (!selectedFile) return;

    const newFiles = Array.from(selectedFile);
    setFiles((prev) => [...prev, ...newFiles]);
    console.log(files);
  };

  const handleRemove = (targetFile: File) => {
    // 선택한 파일과 다른 요소들만 재정리
    setFiles((prevFiles) => prevFiles.filter((file) => file !== targetFile));
  };
  return (
    <Div>
      <Title className="Section-title">이미지 수정</Title>
      <Section>
        <Label htmlFor="imageFile">
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
        </Label>
        <input
          type="file"
          id="imageFile"
          multiple
          style={{ display: "none" }}
          accept="image/*"
          onChange={imageChange}
        />
        <ImgList>
          {files.map((file, index) => (
            <li key={index}>
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
            </li>
          ))}
        </ImgList>
      </Section>
      <ButtonWrap>
        <StyledButton name="취소" Bgcolor="grey" TitleColor="darkGrey" />
        <StyledButton name="수정" Bgcolor="green" TitleColor="white" />
      </ButtonWrap>
    </Div>
  );
}
