import React from "react"

import Button from "../../../button/Button"

import './SideBar.css'

import { IoIosArrowUp, SiReddit } from 'react-icons/all'

const SideBar = () => {
    return (
        <div className="side-bar">
            <div className="might-like-container">
                <div className="might-like-header">
                    <div className="might-like-title">Top New Projects</div>
                </div>
                <div onClick={() => window.open("https://www.youtube.com/watch?v=Pb34L9RG5ng")} className="project-container">
                    <div className="number">
                        1
                    </div>
                    <div className="arrow-icon">
                        <IoIosArrowUp/>
                    </div>
                    <div className="project-icon">
                        <SiReddit/>
                    </div>
                    <div className="project-title">
                        CS50 Project 0 - Google
                    </div>
                </div>
                <hr/>
                <div onClick={() => window.open("https://www.youtube.com/watch?v=VryF4Niw4UU&t=74s")} className="project-container">
                    <div className="number">
                        2
                    </div>
                    <div className="arrow-icon">
                        <IoIosArrowUp/>
                    </div>
                    <div className="project-icon">
                        <SiReddit/>
                    </div>
                    <div className="project-title">
                        CS50 Project 1 - Wiki
                    </div>
                </div>
                <hr/>
                <div onClick={() => window.open("https://www.youtube.com/watch?v=xaxw24ivhcg&t=99s")} className="project-container">
                    <div className="number">
                        3
                    </div>
                    <div className="arrow-icon">
                        <IoIosArrowUp/>
                    </div>
                    <div className="project-icon">
                        <SiReddit/>
                    </div>
                    <div className="project-title">
                        CS50 Project 2 - Auction House
                    </div>
                </div>
                <hr/>
                <div onClick={() => window.open("https://www.youtube.com/watch?v=Sj5qgODQ0ro&t=16s")} className="project-container">
                    <div className="number">
                        4
                    </div>
                    <div className="arrow-icon">
                        <IoIosArrowUp/>
                    </div>
                    <div className="project-icon">
                        <SiReddit/>
                    </div>
                    <div className="project-title">
                        CS50 Project 3 - Mail
                    </div>
                </div>
                <div className="project-button">
                    <Button onClick={() => window.open("https://www.youtube.com/channel/UCaPzz6mut_3qq0FNiO5tmxg/videos")}>View All</Button>
                </div>

            </div>
        </div>
    )
}

export default SideBar;

