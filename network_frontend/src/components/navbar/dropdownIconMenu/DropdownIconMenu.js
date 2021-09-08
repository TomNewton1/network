import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { AccountCircle } from '@material-ui/icons'
import { AiFillHome, RiUserFollowFill } from 'react-icons/all'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { PropTypes } from 'prop-types';
import { connect } from "react-redux";
import { logout } from '../../../actions/auth';

import "./DropdownIconMenu.css"

export class DropdownIconMenu extends Component {

    static propTypes = {
        auth: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool,
    };

    

    render() {

        return (

            
        <div className="menu">
            <Link to={`/user/${this.props.auth.user.id}`}>
                <button type="button">
                   <span className="drop-down-menu-button"><AccountCircle style={{marginRight: "5px"}}/> Profile</span>
                </button>
            </Link>
            <Link to="/">
                <button type="button">
                    <span className="drop-down-menu-button"><AiFillHome size={20} style={{marginRight: "5px"}}/> All Posts</span>
                </button>
            </Link>
            <Link to="/homepage">
                <button  type="button">
                    <span className="drop-down-menu-button"><RiUserFollowFill size={20} style={{marginRight: "5px"}}/> Following</span>
                </button>
            </Link>
            <Link to="/">
                <button onClick={this.props.logout} type="button">
                    <span className="drop-down-menu-button"><ExitToAppIcon style={{marginRight: "5px"}}/> Log Out</span>
                </button>
            </Link>
        </div>
        
        
        )
    };
};


const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
	auth: state.auth,

});

export default connect(mapStateToProps, {logout})(DropdownIconMenu);