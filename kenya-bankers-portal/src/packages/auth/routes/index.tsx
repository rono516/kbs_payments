import Login from "../components/Login.tsx";
import ForgotPassword from "../components/ForgotPassword.tsx";
import Register from "../components/Registration/Register.tsx";
import VerifyOtp from "../components/VerifyOtp.tsx";
import ResetPassword from "../components/ResetPassword.tsx";
import Referral from "../components/Referral.tsx";
import SetPassword from "../components/SetPassword.tsx";
import LoginVerifyOTP from "../components/LoginVerifyOTP.tsx";


export const AuthRoutes =[
    {
        path:"/auth/login",
        element: <Login/>
    },
    {
        path:"/auth/register",
        element: <Register/>
    },
    {
        path:"/auth/login-verify-otp/:sacco_user_id",
        element: <LoginVerifyOTP/>
    },
    {
        path:"/auth/forgot-password",
        element: <ForgotPassword/>
    },
    {
        path:"/auth/reset-password",
        element: <ResetPassword/>
    },
    {
        path:"/auth/set-password",
        element: <SetPassword/>
    },
    {
        path:"/auth/verify-otp/:sacco_user_id",
        element: <VerifyOtp/>
    },
    {
        path:"/auth/referral",
        element: <Referral/>
    }
];