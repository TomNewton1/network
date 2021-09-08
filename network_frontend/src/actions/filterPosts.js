import { FILTER_POSTS } from "./types";

// Filter Posts
export const filterPosts = (searchTerm) => (dispatch) => {

    console.log("filter posts function being called")
    console.log("The search term is: ", searchTerm)

    dispatch({
        type: FILTER_POSTS, 
        payload: searchTerm
    });
}


