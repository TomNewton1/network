import { GET_POSTS, GET_USER_POSTS, CREATE_POST, LIKE_POST, EDIT_POST } from "../actions/types";

const initialState = {
	posts: [],
	likedPost: [],
	userPosts: {
		username: "", 
		followers: "", 
		following: "",
		date: "", 
		posts: [],
	},
	editedPost: [],
};

export default function (state = initialState, action) {
	switch (action.type) {
		case GET_POSTS:
			return {
				...state,
				posts: action.payload,
			};
		case GET_USER_POSTS:
			return {
				...state,
				userPosts: action.payload,
			};
		case CREATE_POST:
			return {
				...state,
				posts: [...state.posts, action.payload],
			};
		case LIKE_POST:
			return {
				...state,
				likedPost: action.payload,
			};
		case EDIT_POST:
			return {
				...state,
				editedPost: action.payload,
			};
		default:
			return state;
	}
}
