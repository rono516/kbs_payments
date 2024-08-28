import {DASHBOARD_API_FAILED, DASHBOARD_API_REQUEST, DASHBOARD_API_SUCCESS} from "./DashboardActionTypes.tsx";

const initialState={
    loading: false,
    submitting: false,
    error: {},
}

const DashboardReducer = (state = initialState, action) => {
    switch (action.type) {
        case DASHBOARD_API_REQUEST:
            return {
                ...state,
                loading: true,
                submitting: true,
                error: {},
            };
        case DASHBOARD_API_SUCCESS:
            return {
                ...state,
                loading: false,
                submitting: false,
                error: {},
            };
        case DASHBOARD_API_FAILED:
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
export default DashboardReducer;