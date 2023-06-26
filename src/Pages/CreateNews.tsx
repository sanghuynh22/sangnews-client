import React, { useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ReactMarkdown from "react-markdown";
import parse from "html-react-parser";
import { useDispatch, useSelector } from "react-redux";
import { createNews } from "../actions/news/createNews";
import { Link } from "react-router-dom";

export default function CreateNews() {
	const dispatch = useDispatch();
	const fileRef = useRef<HTMLInputElement>(null);
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
			[{ background: ["red", "#785412"] }],
		],
	};
	const [title, setTitle] = useState<string>("");
	const [content, setContent] = useState<string>("");
	const [image, setImage] = useState<string>("");
	const { currentUser } = useSelector((state: any) => state.user.currentUser);

	const handleClickImage = () => {
		if (fileRef.current !== null) {
			fileRef.current.click();
		}
	};
	const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = (event: ProgressEvent<FileReader>) => {
			const imageUrl = event.target?.result as string;
			setImage(imageUrl);
			console.log("image: ", image);
		};
	};
	const handleClickCreate = () => {
		dispatch(
			createNews({ title, image, content, id_user: currentUser.userId })
		).then(() => {
			setImage("");
			setContent("");
			setTitle("");
			alert(`Tạo thành công news : ${title}`);
		});
	};

	return (
		<div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
			<Link to="/create" className="back">
				<p className="back_p">&lt; Back</p>
			</Link>
			<h2 style={{ margin: "20px auto" }}>Create News</h2>
			<ReactQuill
				value={content}
				onChange={setContent}
				style={{ height: "300px", marginBottom: "100px" }}
				modules={modules}
			/>
			<div className="createnews">
				<input
					type="file"
					style={{ display: "none" }}
					ref={fileRef}
					onChange={handleUploadImage}
				/>
				<div className="createnews_image" onClick={handleClickImage}>
					<p className="createnews_image_p">Hình đại diện</p>
				</div>
				{image && <img src={image} className="createnews_img" />}

				<div className="createnews_title">
					<textarea
						className="createnews_textarea"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
				</div>
			</div>
			<button onClick={handleClickCreate} style={{ marginTop: "60px" }}>
				Create
			</button>
		</div>
	);
}
