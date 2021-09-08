import axios from "axios";

import {
    USER_LOADED, 
    USER_LOADING, 
    AUTH_ERROR,
    LOGIN_SUCCESS, 
    LOGIN_FAIL,
    REGISTER_SUCCESS, 
    REGISTER_FAIL,
    LOGOUT_SUCCESS
} from './types'


// Check token and load user

export const loadUser = () => (dispatch, getState) => {
    // User loadin 
    dispatch ({ type: USER_LOADING })

    // Get token from state
    const token = getState().auth.token

    // Headers 
    const config = {
        headers : {
            "Content-Type": "application/json"
        }
    }

    // If token, add to headers config
    if(token) {
        config.headers['Authorization'] = `Token ${token}`;
    } else {
        console.log("Could not access auth token...")
    }

    axios.get('http://127.0.0.1:8000/api/auth/user', config)
        .then(res => {
            dispatch({
                type: USER_LOADED,
                payload: res.data
            });
        }).catch(err => {
            console.log("authentication error")
            dispatch({
                type: AUTH_ERROR
            })
        })
}

//LOGIN User

export const login = (username, password) => (dispatch) => {

    // Headers 
    const config = {
        headers : {
            "Content-Type": "application/json"
        }
    }

    // Request Body 
    const body = JSON.stringify({username, password})

    axios
        .post('http://127.0.0.1:8000/api/auth/login', body, config)
        .then((res) => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });
        })
        .catch((err) => {
            console.log("authentication error")
            dispatch({
                type: LOGIN_FAIL
            });
        });
    
};

// Register User

export const register = ({username, password, email}) => (dispatch) => {

    //Headers
    const config = {
        headers : {
            "Content-Type": "application/json"
        }
    }

    // Request Body
    const body = JSON.stringify({username, email, password})

    axios
        .post('http://127.0.0.1:8000/api/auth/register', body, config)
        .then((res) => {
            dispatch({
                type: REGISTER_SUCCESS, 
                payload: res.data
            });
        })
        .catch((err) => {
            console.log("registration error")
            dispatch({
                type: REGISTER_FAIL
            });
        });
};

// Logout User 

export const logout = () => (dispatch, getState) => {

    console.log("logout function called")

    // Get token from state
    const token = getState().auth.token;

    // Headers 
    const config = {
        headers : {
            "Content-Type": "application/json"
        }
    };

    // If token, add to headers config
    if (token) {
        config.headers['Authorization'] = `Token ${token}`;
    }

    axios
        .post('http://127.0.0.1:8000/api/auth/logout', null,  config)
        .then(res => {
            dispatch({
                type: LOGOUT_SUCCESS,
                payload: res.data
            });
        }).catch(err => {
            console.log("logout error")
        })
    
}

// Setup config with token - helper function

export const tokenConfig = (getState) => {

    // Get token from state
    const token = getState().auth.token;
  
    // Headers
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
  
    // If token, add to headers config
    if (token) {
      config.headers['Authorization'] = `Token ${token}`;
    }
  
    return config;
  };

// Setup config with token - helper function

export const tokenConfigHooks = (token) => {

    // Headers
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
  
    // If token, add to headers config
    if (token) {
      config.headers['Authorization'] = `Token ${token}`;
    }
  
    return config;
  };