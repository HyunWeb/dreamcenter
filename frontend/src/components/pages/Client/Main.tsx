import { useState } from "react";
import logo from "../../../logo.svg";
import axios from "axios";
import { postUpload } from "../../../api/postApi";

export default function Main() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // 파일 업로드 되면 상태값으로 저장
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("image", selectedFile); // 'image'는 백엔드에서 받는 key

    try {
      const response = await postUpload(formData);
      console.log("업로드 성공:", response.url);
    } catch (error) {
      console.error("업로드 실패", error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <input type="file" accept="image/*" onChange={handleChange} />
        <button onClick={handleSubmit}>업로드</button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React 도커 완료입니다 마지막 테스트입니다.
        </a>
      </header>
    </div>
  );
}
