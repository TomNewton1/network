import React from "react";
import "./Content.css";

import MainBar from "./main-bar/MainBar";
import SideBar from "./side-bar/SideBar";


const Content = () => {
	return (
		<div className="content">
            <div className="bars-wrapper">
                <MainBar />
			    <SideBar />
            </div>
		</div>
	);
};

export default Content;
