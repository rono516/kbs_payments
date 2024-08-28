import {AUTH_API_FAILED, AUTH_API_REQUEST, AUTH_API_SUCCESS} from "./AuthActionTypes";

const initialState={
    loading: false,
    submitting: false,
    error: {},
    hasSentOTP:false,
    verifyingOTP:false,
    set_password_page: false,
    verified:false,
}

const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_API_REQUEST:
            return {
                ...state,
                loading: true,
                submitting: true,
                error: {},
            };
        case AUTH_API_SUCCESS:
            return {
                ...state,
                loading: false,
                submitting: false,
                error: {},
                hasSentOTP: action.payload.hasSentOTP,
                verifyingOTP: action.payload.verifyingOTP,
                set_password_page: action.payload.set_password_page,
                verified: action.payload.verified,
            };
        case AUTH_API_FAILED:
            return {
                ...state,
                loading: false,
                submitting: false,
                error: action.payload,
            };
        default:
            return state;
    }
}
export default AuthReducer;