import React from "react";

import TitleMainBar from "./title/TitleMainBar";
import Posts from "./posts/Posts";

import "./MainBar.css";


export default function MainBar() {
	return (
		<div className="main-bar-profile">
			<TitleMainBar/>
            <Posts/>
		</div>
	);
}
