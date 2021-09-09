import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";

import Button from "../button/Button";

import './Login.css'

export class Login extends Component {


	state = {
		username: "",
		password: "",
        count: 0, 
	};

	static propTypes = {
		login: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool,
	};

	onSubmit = (e) => {
        e.preventDefault();
        this.props.login(this.state.username, this.state.password);
      };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

	render() {

        const { username, password } = this.state;

        if (this.props.isAuthenticated) {
            return <Redirect to="/homepage"/>
        }

		return (
            <div className="col-md-6 m-auto">
              <div className="card card-body mt-5">
                <h2 className="text-center">Login</h2>
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <label className="form-label">Username</label>
                    <input
                      type="text"
                      className="form-control"
                      name="username"
                      onChange={this.onChange}
                      value={username}
                    />
                  </div>
      
                  <div className="form-group">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      onChange={this.onChange}
                      value={password}
                    />
                  </div>
      
                  <div className="login-button">
                    <Button type="submit" ><b>Log In</b></Button>
                    
                  </div>
              
                </form>
              </div>
            </div>
          );
	}
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
	auth: state.auth
});
  
export default connect(mapStateToProps, { login })(Login);


