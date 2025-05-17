import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import "../../../../style/EditorStyle.css";

interface WsiwygProps {
  content: string;
  setContent: (newContent: string) => void;
}

export default function Wysiwyg({ content, setContent }: WsiwygProps) {
  return (
    <div>
      <Editor
        apiKey="r4k2cp86dc5ivry6htx1uzqvdgqaqjv3nbyf8im58pp8x9lj"
        value={content}
        onEditorChange={(newContent) => setContent(newContent)}
        init={{
          height: 400,
          menubar: true,
          plugins: [
            "lists",
            "link",
            "image",
            "code",
            "table",
            "autolink",
            "preview",
            "visualblocks",
            "searchreplace",
            "wordcount",
          ],
          toolbar:
            "undo redo | h1 h2 h3 h4 | fontsize | bold italic | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent",
          fontsize_formats: "10pt 12pt 14pt 16pt 18pt 24pt 36pt",
          toolbar_mode: "wrap",
          branding: false, // 하단 TinyMCE 로고 숨김 (단, 완전 제거는 유료)
          licenseKey: "gpl",
        }}
      />
    </div>
  );
}
