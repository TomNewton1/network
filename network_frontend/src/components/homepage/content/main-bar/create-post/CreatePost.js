import React from "react";
import { Link } from "react-router-dom";
import { FaReddit } from "react-icons/fa";
import {IoImageOutline, BsLink45Deg} from "react-icons/all";

import "./CreatePost.css"

export default function CreatePost() {
    return (
        <div>

            <div className="post-container">
                <FaReddit size={40} className="fa-icon"/>
                <Link to="/submit" className="link-container">
                    <input type="text" defaultValue="Create Post" className="create-post"></input>
                    <div className="image-link">
                        <IoImageOutline size={25} className="fa-icon" />
                        <BsLink45Deg size={25} className="fa-icon" />
                    </div>
                </Link>
            </div>
            
        </div>
    )
}
