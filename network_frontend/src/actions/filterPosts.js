import { FILTER_POSTS } from "./types";

// Filter Posts
export const filterPosts = (searchTerm) => (dispatch) => {
    dispatch({
        type: FILTER_POSTS, 
        payload: searchTerm
    });
}


