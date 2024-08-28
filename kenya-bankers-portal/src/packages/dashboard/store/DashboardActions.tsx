import {toast} from "react-toastify";
import AuthService from "scaling-garbanzo/src/access-control/AuthService.js";
import call from "scaling-garbanzo/src/services/http/index.js";
import {DASHBOARD_API_FAILED, DASHBOARD_API_REQUEST, DASHBOARD_API_SUCCESS} from "./DashboardActionTypes.tsx";
import dashboardConstants from "./DashboardConstants.tsx";
const notifySuccess = msg => {
    toast.success(msg)
}
const notifyError = msg => {
    toast.error(msg)
}
//
export const stats = payload => async (dispatch) => {
    try {
        dispatch({
            type: DASHBOARD_API_REQUEST,
            loading: true,
            submitting: true,
        });
        const res = await call("post", dashboardConstants.STATS,payload);
        if (res.data.status) {
            dispatch({
                type: DASHBOARD_API_SUCCESS,
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
                type: DASHBOARD_API_FAILED,
                payload: res.data,
                loading: false,
            });
            notifyError(res.data.message)
        }
    } catch (err) {
        dispatch({
            type: DASHBOARD_API_FAILED,
            error: err.response.data,
            loading: false
        });
        notifyError(err.response.data.message)
    }
}