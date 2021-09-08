import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, connect } from 'react-redux'

import LoginModal from "../loginModal/LoginModal";

import "./Navbar.css";

import { FaRedditSquare, FaReddit } from "react-icons/fa";
import SearchIcon from "@material-ui/icons/Search";
import Button from "../button/Button";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import DropdownIconMenu from "./dropdownIconMenu/DropdownIconMenu";

import Reddit_logo from "../../assets/reddit_logo_red.png"

import { filterPosts } from "../../actions/filterPosts";

export function Navbar({ state, isAuthenticated }) {

	// Sets drop down menu state to open or closed
	const [dropDownState, setdropDownState] = useState({
		showMenu: false,
	});

	
	const handleMenu = () => {
		setdropDownState({
			showMenu: !dropDownState.showMenu,
		});
	};

	// Get Posts via getPosts function and redux dispathcer
	const dispatch = useDispatch();

	// Search term to filer posts. 
	const [searchTerm, setSearchTerm] = useState('')

	console.log(searchTerm)

	useEffect(() => {
		console.log("use effect being called")
		dispatch(filterPosts(searchTerm))
	},[searchTerm]);


	// Check if click was inside dropdown menu

	const onClickOutsideListener = () => {
		setdropDownState({
			showMenu: false,
		});
		document.removeEventListener("click", onClickOutsideListener);
	};

	// Handle State for Modal (checks if user clicked on login or logout)

	const [signInState, setsignInState] = useState({
		open: false,
		signInType: "",
	});

	// setSignInState to closed if the user is authenticated

	useEffect(() => {
		setsignInState({ open: false });
	}, [isAuthenticated]);

	const handleLogin = () => {
		setsignInState({
			open: true,
			signInType: "login",
		});
	};

	const handleRegister = () => {
		setsignInState({
			open: true,
			signInType: "register",
		});
	};

	if (isAuthenticated) {
		return (
			<div>
				<div
					onMouseLeave={() => {
						document.addEventListener("click", onClickOutsideListener);
					}}
				>
					<div className="navbar">
						<div className="logo hoverable">
							<Link to="/">
								<FaReddit size={35} className="navbar-fa-icon"/>
							</Link>
							<span>reddit</span>
						</div>
						

						<div className="searchBar">
							<label htmlFor="searchBar">
								<SearchIcon />
							</label>
							<input id="searchBar" placeholder="Search Reddit" onChange={event => {setSearchTerm(event.target.value)}}></input>
						</div>

						<div onClick={handleMenu} className="actions">
							<div>
								<div
									className={
										dropDownState.showMenu
											? "logged-in-profile-open"
											: "logged-in-profile"
									}
								>
									<FaRedditSquare />
									<div className="username">{state.auth.user.username}</div>
									<ArrowDropDownIcon className="hoverable logged-in-arrow" />
								</div>
								<div className="logged-in-dropdown-icon-menu">
									{dropDownState.showMenu ? <DropdownIconMenu /> : null}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	} else {
		return (
			<div>
				<div className="navbar">
					<div className="logo hoverable">
						<Link to="/">
							<FaReddit size={35} className="navbar-fa-icon"/>
						</Link>
						<span>reddit</span>
					</div>

					<div onClick={handleRegister} className="searchBar">
						<label htmlFor="searchBar">
							<SearchIcon />
						</label>
						<input id="searchBar" placeholder="Search Reddit"></input>
					</div>

					<div className="actions">
						<Button
							onClick={handleLogin}
							type="button"
							buttonStyle="btn--secondary"
							buttonSize="btn--small"
						>
							Log In
						</Button>
						<Button
							onClick={handleRegister}
							type="button"
							buttonStyle="btn--primary"
							buttonSize="btn--small"
						>
							Sign Up
						</Button>
					</div>
				</div>

				<LoginModal
					open={signInState.open}
					action={signInState.signInType}
					onClose={() => setsignInState({ open: false })}
					signInState={signInState} 
					setsignInState={setsignInState}
				></LoginModal>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		state,
		isAuthenticated: state.auth.isAuthenticated,
	};
}

export default connect(mapStateToProps)(Navbar);
