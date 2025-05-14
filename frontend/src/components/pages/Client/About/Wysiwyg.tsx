import React from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export default function Wysiwyg() {
  const editor = useEditor({
    extensions: [StarterKit],
    content: `<p>HelloWorld</p>`,
  });
  return <EditorContent editor={editor} />;
}
