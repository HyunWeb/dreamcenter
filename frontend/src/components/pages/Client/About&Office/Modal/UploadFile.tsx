import React from "react";
import styled from "styled-components";
type FileItem = {
  id: string;
  file: File;
};
interface UploadFilesProps {
  files: FileItem[];
  setFiles: React.Dispatch<React.SetStateAction<FileItem[]>>;
}

const Label = styled.label`
  color: #888888;
  border: 3px dashed #dddddd;
  box-sizing: border-box;
  /* padding: 50px 71px; */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
  border-radius: 20px;
  width: 40%;
  height: 100%;

  svg {
    width: 45px;
    height: 40px;
  }
  p {
    margin-top: 16px;
    font-size: 16px;
  }
`;

export default function UploadFile({ files, setFiles }: UploadFilesProps) {
  const imageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files;
    if (!selectedFile) return;

    const newFiles = Array.from(selectedFile);
    const newItems = newFiles.map((file) => ({
      id: crypto.randomUUID(), // 또는 uuid(), index.toString() 등
      file,
    }));
    setFiles((prev) => [...prev, ...newItems]);
  };
  return (
    <>
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
    </>
  );
}
