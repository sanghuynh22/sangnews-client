import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ReactMarkdown from 'react-markdown';
import parse from 'html-react-parser';



export default function Test() {
    const modules = {
        toolbar: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ size: [] }],
          [{ font: [] }],
          [{ align: ["justify", "center", "right"] }],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link", "image"],
          [{ color: ["red", "#785412"] }],
          [{ background: ["red", "#785412"] }]
        ]
      };
      const [content, setContent] = useState<string>('');
      const htmlString = '<h1>Hello world</h1><p>This is some text</p>';
      const jsx = parse(htmlString);
  function handleInsertImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event: ProgressEvent<FileReader>) => {
      const imageUrl = event.target?.result as string;
      setContent((prevContent) => prevContent + `\n![image]( ${imageUrl} ){.my-image}\n`);
    };
  }

  return (
    <div style={{height: '100vh', display: 'flex', flexDirection:"column"}}>
      <ReactQuill value={content} onChange={setContent} style={{height: '300px'}} modules={modules}/>
      
      <button onClick={() => console.log(content)} style={{marginTop:"200px"}}>Save</button>
      <ReactMarkdown>{content}</ReactMarkdown>
    <div>{parse(content)}</div>
    </div>
  );
}