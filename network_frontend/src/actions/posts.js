import axios from "axios";
import { GET_POSTS, CREATE_POST, LIKE_POST, GET_FOLLOWING_POSTS, GET_USER_POSTS, EDIT_POST } from "./types";
import { tokenConfig } from './auth';

//Get All Posts
export const getPosts = () => (dispatch, getState) => {

    axios
        .get('http://127.0.0.1:8000/api/post-list/', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_POSTS,
                payload: res.data
            });
        }).catch(err => console.log(err));
       
}


//Get All Posts form users the user follows
export const getFollowerPosts = (user_id) => (dispatch, getState) => {

    axios
        .get(`http://127.0.0.1:8000/api/post-list-followers/${user_id}`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_FOLLOWING_POSTS,
                payload: res.data
            });
        }).catch(err => console.log(err));
       
}

//Get All Posts form the user clicked on
export const getUserPosts = (user_id) => (dispatch, getState) => {

    axios
        .get(`http://127.0.0.1:8000/api/post-list-user/${user_id}`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_USER_POSTS,
                payload: res.data
            });
        }) 
        .catch(err => console.log(err));
       
}


// Create Post
export const createPost = (user, username, title, body) => (dispatch, getState) => {
    
    // Request Body
	const requestBody = JSON.stringify({ user, username, title, body });


    axios
      .post('http://127.0.0.1:8000/api/post-submit/', requestBody, tokenConfig(getState))
      .then((res) => {
        dispatch({
          type: CREATE_POST,
          payload: res.data,
        });
      }).catch(err => console.log(err));
    
  };


// Vote Post
export const votePost = (user, post, type) => (dispatch, getState) => {

    // Request Body
	const requestBody = JSON.stringify({user, post, type});

    axios
        .put('http://127.0.0.1:8000/api/post-vote/', requestBody, tokenConfig(getState) )
        .then((res) => {
            dispatch({
                type: LIKE_POST,
                payload: res.data,
            });
        })
        .catch(err => console.log(err));

};

// Edit Post

export const editPost = (post_id, title, body) => (dispatch, getState) => {

    // Request Body
	const requestBody = JSON.stringify({ post_id, title, body });

    console.log("editPost submitted")

    axios
        .put(`http://127.0.0.1:8000/api/post-edit/${post_id}`, requestBody, tokenConfig(getState))
        .then((res) => {
            dispatch({
              type: EDIT_POST,
              payload: res.data,
            });
          }).catch(err => console.log(err));
        
      };


