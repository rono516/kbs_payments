import DashboardLayout from "../../../shared/layouts/dashboard/index.js";
import Setting from "../view";
import ChangePassword from "../components/ChangePassword.js";
// import PrivateRoute from "../../../store/PrivateRoutes.js";

export const SettingRoutes =[
    {
        path: "/settings",
        element: <DashboardLayout/>,
        children: [
            {
                path: "",
                name: "Setting",
                element: <Setting/>
            },
        ]
    },
    {
        path:"/change-password",
        element: <DashboardLayout/>,
        children: [
            {
                path: "",
                name: "change-password",
                element: <ChangePassword/>
            },
        ]        
    },
]