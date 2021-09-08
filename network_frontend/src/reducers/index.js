import { combineReducers } from "redux";
import filterPosts from "./filterPosts";
import followingPosts from "./followingPosts";
import posts from "./posts";
import auth from "./auth"

export default combineReducers({
    filterPosts,
    followingPosts, 
    posts, 
    auth
});