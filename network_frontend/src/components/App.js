import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import PropTypes from "prop-types";

import {connect } from 'react-redux'
import store from '../store';
import { loadUser } from '../actions/auth';

import "./App.css";

import Landing from "./landing/Landing";
import Homepage from './homepage/Homepage';
import Navbar from './navbar/Navbar';
import Create from './create/Create';
import Profile from "./profile/Profile";


export class App extends Component {

	static propTypes = {
		auth: PropTypes.object.isRequired,
	};

	componentDidMount() {
		
		store.dispatch(loadUser());
	}

	render() {

		return (
				<Router>
					<Navbar />
					<Switch>
						<Landing exact path="/" />
						<Route exact path="/user/:id" component={Profile}/>
						<PrivateRoute exact path="/submit" component={Create}></PrivateRoute>
						<PrivateRoute exact path="/homepage" component={Homepage}></PrivateRoute>
						
					</Switch>
				</Router>
		)
	}
}

const mapStateToProps = (state) => ({
	auth: state.auth,
  });

export default connect(mapStateToProps)(App);






