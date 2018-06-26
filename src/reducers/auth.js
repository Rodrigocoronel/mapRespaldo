const initialState = {
	error              : false,
    error_message      : '',
    authenticated      : false,
    user               : undefined,
    session_token      : undefined,
    token_facebook:null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case "AUTH_SIGNIN_SUCCESS":
            return { 
                ...state, 
                ...initialState, 
                session_token: action.payload, 
                authenticated: true
            };
        
        case "AUTH_SIGNIN_FAILURE":
            return { 
                ...state, 
                ...initialState,
                error: true, 
                error_message: action.payload
            };

        case "AUTH_WHOIAM_SUCCESS":
            return {
                ...state,
                user: action.payload
            }
             case "TOKEN_FACEBOOK":
            return {
                ...state,
                token_facebook: action.payload
            }

        case "AUTH_SIGNOUT_SUCCESS":
            return initialState;

        default:
            return state;
    }
}