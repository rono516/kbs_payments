import DashboardLayout from "../../../shared/layouts/dashboard/index.js";
import Dashboard from "../../dashboard/view/dashboard.js";
import Loan from "../view";
import MyLoans from "../components/MyLoans.tsx";
import PendingOffers from "../components/PendingOffers.tsx";
import LoanForm from "../components/LoanApplicationForm.tsx";
import LoanEligibility from "../components/LoanEligibility.tsx";
import LoanDetails from "../components/LoanDetail.tsx";
import LoanRepayment from "../components/LoanRepayment.tsx";

export const LoanRoutes =[
    {
        path: "/loans",
        element: <DashboardLayout/>,
        children: [
            {
                path: "",
                name: "Loan",
                element: <Loan/>
            },
            {
                path: "my",
                name: "MyLoan",
                element: <MyLoans/>
            },
            {
                path:'pending-offers',
                name:'PendingOffers',
                element:<PendingOffers/>
            },
            {
                path:'loan-form',
                name:'LoanForm',
                element:<LoanForm/>
            },
            {
                path:'loan-details/:member_id/:loan_id',
                name:'LoanDetails',
                element:<LoanDetails/>
            },
            {
                path:'loan-repayment/:member_id/:loan_id',
                name:'LoanRepayment',
                element:<LoanRepayment/>
            },
            {
                path:'loan-eligibility',
                name:'LoanEligibility',
                element:<LoanEligibility/>
            }
        ]
    }
]