import DashboardLayout from "../../../shared/layouts/dashboard/index.js";
import MySavings from "../components/MySavings.js";
import Savings from "../view";
import SavingsForm from "../components/CreateSavings.js";
import SavingsDetail from "../components/SavingsDetail.js";
import SavingsDeposit from "../components/SavingsDeposit.js";
import SavingsTransfer from "../components/SavingsTransfer.js";

export const SavingRoutes =[
    {
        path: "/savings",
        element: <DashboardLayout/>,
        children: [
            {
                path: "",
                name: "Savings",
                element: <Savings/>
            },
            {
                path: "my",
                name: "MySavings",
                element: <MySavings/>
            },
            {
                path:'savings-form',
                name:'SavingsForm',
                element:<SavingsForm/>
            },
            {
                path:'savings-detail/:member_id/:savings_id',
                name:'SavingsDetail',
                element:<SavingsDetail/>
            },
            {
                path:'savings-deposit/:member_id/:savings_id',
                name:'SavingsDeposit',
                element:<SavingsDeposit/>
            },
            {
                path:'savings-transfer/:member_id/:savings_id',
                name:'SavingsTransfer',
                element:<SavingsTransfer/>
            },
        ]
    }
]