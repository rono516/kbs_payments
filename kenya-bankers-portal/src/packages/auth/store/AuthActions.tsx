import AuthConstants from "./AuthConstants";
import {AUTH_API_FAILED, AUTH_API_REQUEST, AUTH_API_SUCCESS} from "./AuthActionTypes";
import {toast} from "react-toastify";
import AuthService from "scaling-garbanzo/src/access-control/AuthService.js";
import call from "scaling-garbanzo/src/services/http/index.js";
const notifySuccess = msg => {
    toast.success(msg)
}
const notifyError = msg => {
    toast.error(msg)
}
//
export const login = payload => async (dispatch) => {
    try {
        dispatch({
            type: AUTH_API_REQUEST,
            loading: true,
            submitting: true,
        });
        const res = await call("post", AuthConstants.LOGIN,payload);
        if (res.data.status) {
            dispatch({
                type: AUTH_API_SUCCESS,
                payload: res.data,
                loading: false,
                message: res.data.message,
                hasSentOTP: false,
            });
            //notify
            notifySuccess(res.data.message)
            //login
            AuthService.login(res.data.access_token,res.data.profile)
            //notify
            notifySuccess(res.data.message)
            //redirect
            payload.navigate('/')
        } else {
            dispatch({
                type: AUTH_API_FAILED,
                payload: res.data,
                loading: false,
            });
            notifyError(res.data.message)
        }
    } catch (err) {
        dispatch({
            type: AUTH_API_FAILED,
            error: err.response.data,
            loading: false
        });
        notifyError(err.response.data.message)
    }
}
// Verify OTP
export const verifyOTP = payload => async (dispatch) => {
    try {
        dispatch({
            type: AUTH_API_REQUEST,
            loading: true,
            submitting: true,
            verifyingOTP:true
        });
        const res = await call("post", AuthConstants.VERIFY_OTP,payload);
        if (res.data.status) {
            dispatch({
                type: AUTH_API_SUCCESS,
                payload: res.data["customer"],
                loading: false,
                message: res.data.message,
                verifyingOTP:false,
                hasSentOTP:false,
            });
            dispatch({type: 'set', profile: {}})
            //login
            AuthService.login(res.data["access"],{})
            //notify
            notifySuccess(res.data.message)
            //redirect
            window.location.href="/"
        } else {
            dispatch({
                type: AUTH_API_FAILED,
                payload: res.data,
                loading: false,
                verifyingOTP: false
            });
            notifyError(res.data.message)
        }
    } catch (err) {
        dispatch({
            type: AUTH_API_FAILED,
            error: err.response.data,
            loading: false,
            verifyingOTP: false,
        });
        notifyError(err.response.data.message)
    }
}

//reset password
export const resetPassword = payload => async (dispatch) => {
    try {
        dispatch({
            type: AUTH_API_REQUEST,
            loading: true,
            submitting: true
        });
        const res = await call("post", AuthConstants.RESET_PASSWORD,payload);
        if (res.data.status) {
            dispatch({
                type: AUTH_API_SUCCESS,
                payload: res.data,
                loading: false,
                hasSentOTP: true
            });
            //notify
            notifySuccess(res.data.message)
        } else {
            dispatch({
                type: AUTH_API_FAILED,
                payload: res.data,
                loading: false
            });
            notifyError(res.data.message)
        }
    } catch (err) {
        dispatch({
            type: AUTH_API_FAILED,
            error: err.response.data,
            loading: false
        });
        notifyError(err.response.data.message)
    }
}
//reset password
export const setNewPassword = payload => async (dispatch) => {
    try {
        dispatch({
            type: AUTH_API_REQUEST,
            loading: true,
            submitting: true,
            set_password_page: true
        });
        const res = await call("post", AuthConstants.SET_PASSWORD,payload);
        if (res.data.status) {
            dispatch({
                type: AUTH_API_SUCCESS,
                payload: res.data,
                loading: false,
                message: res.data.message,
                hasSentOTP: false,
                set_password_page: true,
                submitting:false
            });
            //notify
            notifySuccess(res.data.message)
            //redirect to login
            setTimeout(()=>{
                window.location.href="/"
            },1500)
        } else {
            dispatch({
                type: AUTH_API_FAILED,
                payload: res.data,
                loading: false
            });
            notifyError(res.data.message)
        }
    } catch (err) {
        dispatch({
            type: AUTH_API_FAILED,
            error: err.response.data,
            loading: false
        });
        notifyError(err.response.data.message)
    }
}
//verify otp
export const verifyResetOTP = payload => async (dispatch) => {
    try {
        dispatch({
            type: AUTH_API_REQUEST,
            loading: true,
            submitting: true,
            verifyingOTP:true
        });
        const res = await call("post", AuthConstants.VERIFY_RESET_OTP,payload);
        if (res.data.status) {
            dispatch({
                type: AUTH_API_SUCCESS,
                payload: res.data,
                loading: false,
                message: res.data.message,
                verifyingOTP:false,
                verified: true
            });
            //notify
            notifySuccess(res.data.message)
            //redirect
        } else {
            dispatch({
                type: AUTH_API_FAILED,
                payload: res.data,
                loading: false,
                verifyingOTP: false
            });
            notifyError(res.data.message)
        }
    } catch (err) {
        dispatch({
            type: AUTH_API_FAILED,
            error: err.response.data,
            loading: false,
            verifyingOTP: false,
        });
        notifyError(err.response.data.message)
    }
}
