import {combineReducers} from "redux";
import AuthReducer from "../../packages/auth/store/AuthReducer";
import DashboardReducer from "../../packages/dashboard/store/DashboardReducer.tsx";

const rootReducer = combineReducers({
    AuthReducer,
    DashboardReducer
});

export default rootReducer;