import React, { Fragment } from "react";

import UserProfile from "./user-profile/UserProfile"

const SideBar = () => {
    return (
        <Fragment>
            <div className="side-bar-container-profile">
                <UserProfile/>
            </div>
        </Fragment>
    )
    
}

export default SideBar;

