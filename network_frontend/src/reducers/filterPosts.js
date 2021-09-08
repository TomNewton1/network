import { FILTER_POSTS, } from "../actions/types";

const initialState = {
	searchTerm: [],
};

export default function (state = initialState, action) {
	switch (action.type) {
		case FILTER_POSTS:
			return {
				...state,
				searchTerm: action.payload,
			};
		
		default:
			return state;
	}
}
