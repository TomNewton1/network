import { GET_FOLLOWING_POSTS, } from "../actions/types";

const initialState = {
	followingPosts: [],
};

export default function (state = initialState, action) {
	switch (action.type) {
		case GET_FOLLOWING_POSTS:
			return {
				...state,
				followingPosts: action.payload,
			};
		
		default:
			return state;
	}
}
