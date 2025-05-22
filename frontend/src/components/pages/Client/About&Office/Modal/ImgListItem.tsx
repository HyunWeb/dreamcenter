import DeleteButton from "@/components/common/DeleteButton";
import React from "react";

type FileItem = {
  id: string;
  file: File;
};
interface ImgListItemProps {
  file: FileItem;
  index: number;
  files: FileItem[];
  setFiles: React.Dispatch<React.SetStateAction<FileItem[]>>;
}

export default function ImgListItem({
  file,
  index,
  files,
  setFiles,
}: ImgListItemProps) {
  return (
    <li key={index} style={{ cursor: "pointer" }}>
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
      <p>{file.file.name}</p>
      <DeleteButton file={file} setFiles={setFiles} />
    </li>
  );
}
