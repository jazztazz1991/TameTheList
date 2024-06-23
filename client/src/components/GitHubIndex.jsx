export const initialState = {
	isLoggedIn: JSON.parse(localStorage.getItem('isLoggedIn')) || false,
	user: JSON.parse(localStorage.getItem('user')) || null,
	// client_id: 'Iv23ctWulHjOcFJ3WdDZ',
	// redirect_uri: 'http://localhost:3001/',
	// client_secret: '906bec3352064f46baec561dcdc92b7aaf814ce9',
	// proxy_url: 'http://localhost:3001/auth/test',
};

export const reducer = (state, action) => {
	switch (action.type) {
		case 'LOGIN': {
			localStorage.setItem(
				'isLoggedIn',
				JSON.stringify(action.payload.isLoggedIn)
			);
			localStorage.setItem('user', JSON.stringify(action.payload.user));
			return {
				...state,
				isLoggedIn: action.payload.isLoggedIn,
				user: action.payload.user,
			};
		}
		case 'LOGOUT': {
			localStorage.clear();
			return {
				...state,
				isLoggedIn: false,
				user: null,
			};
		}
		default:
			return state;
	}
};
