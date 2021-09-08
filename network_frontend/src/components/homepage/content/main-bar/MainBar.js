import React from "react";

import TitleMainBar from "./title/TitleMainBar";
import Posts from "./posts/Posts";
import CreatePost from "./create-post/CreatePost";

import "./MainBar.css";




export default function MainBar() {
	return (
		<div className="main-bar">
			<TitleMainBar/>
			<CreatePost/>
            <Posts/>
		</div>
	);
}
