import DashboardLayout from "../../../shared/layouts/dashboard/index.js";
import Utility from "../view";

export const UtilityRoutes =[
    {
        path: "/utilities",
        element: <DashboardLayout/>,
        children: [
            {
                path: "",
                name: "Utility",
                element: <Utility/>
            },
        ]
    }
]