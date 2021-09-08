import React from "react";
import { useSelector } from 'react-redux'

import TitleMainBar from "./title/TitleMainBar";
import Posts from "./posts/Posts";
import CreatePost from "./create-post/CreatePost";

import "./MainBar.css";

export default function MainBar() {
	// If user is not logged in then hide create post Component 


    // Check if user is Authenticated
    const Authenticated = useSelector((state) => state.auth.isAuthenticated)


	return (
		<div className="main-bar">
			<TitleMainBar/>
			{Authenticated ? <CreatePost/> : null }
            <Posts/>
		</div>
	);
}
