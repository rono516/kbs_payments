import Dashboard from "../view/dashboard.tsx";
import DashboardLayout from "../../../shared/layouts/dashboard";
import FosaAccount from "../components/sub-components/FosaAccount.tsx";
import Transfer from "../components/Transfer";
import Mpesa from "../components/Mpesa";
import SendMoney from "../components/Mpesa/SendMoney.tsx";
import Paybill from "../components/Mpesa/Paybill.tsx";
import Till from "../components/Mpesa/Till.tsx";
import Deposit from "../components/Deposit";
import DepositForm from "../components/Deposit/DepositForm.tsx";
import Statement from "../components/Statement";
import Guarantees from "../components/Statement/Guarantees.tsx";
import Guarantors from "../components/Statement/Guarantors.tsx";
import AccountStatement from "../components/Statement/AccountStatement.tsx";
import LoanStatement from "../components/Statement/LoanStatement.tsx";
import StandingOrder from "../components/StandingOrder";
import InternalTransfer from "../components/Transfer/InternalTransfer.tsx";
import BankTransfer from "../components/Transfer/BankTranfer.tsx";
import OnlineTransfer from "../components/OnlineTransfer/index.tsx";
import CreditCardTransfer from "../components/OnlineTransfer/CreditCardTransfer.tsx";
import PaypalTransfer from "../components/OnlineTransfer/PaypalTransfer.tsx";
// import PaypalDepositTransfer from "../components/OnlineTransfer/sub-components/PaypalDepositTransfer.tsx";
// import PaypalWithdrawTransfer from "../components/OnlineTransfer/sub-components/PaypalWithdrawTransfer.tsx";

export const DashboardRoutes =[
    {
        path:"/dashboard",
        element: <DashboardLayout/>,
        children:[
            {
                path: "",
                name: "Dashboard",
                element: <Dashboard/>
            },
            {
                path: "fosa-account",
                name: "FosaAccount",
                element: <FosaAccount/>
            },
            
            // Transfer
            {
                path: "transfers",
                name: "Transfer",
                element: <Transfer/>
            },
            {
                path:"internal-transfer",
                name: "InternalTransfer",
                element:<InternalTransfer/>
            },
            {
                path:"bank-transfer",
                name: "BankTransfer",
                element:<BankTransfer/>
            },

            // Online Transfer
            {
                path: "online-transfer",
                name: "OnlineTransfer",
                element: <OnlineTransfer/>
            },
            {
                path: "paypal-transfer",
                name: "PaypalTransfer",
                element: <PaypalTransfer />
            },
            {
                path: "credit-transfer",
                name: "CreditCardTransfer",
                element: <CreditCardTransfer/>
            },

            // M-Pesa
            {
                path: "m-pesa",
                name: "Mpesa",
                element: <Mpesa/>
            },
            {
                path: "m-pesa/send-money",
                name: "SendMoney",
                element: <SendMoney/>
            },
            {
                path: "m-pesa/paybill",
                name: "Paybill",
                element: <Paybill/>
            },
            {
                path: "m-pesa/till",
                name: "Till",
                element: <Till/>
            },

            //deposit
            {
                path: "deposit",
                name: "Deposit",
                element: <Deposit/>
            },
            {
                path: "deposit/scheme",
                name: "Deposit",
                element: <DepositForm/>
            },

            //statements
            {
                path: "statements",
                name: "Statements",
                element: <Statement/>
            },
            {
                path: "statements/guarantors",
                name: "Guarantor Statement",
                element: <Guarantors/>
            },
            {
                path: "statements/guarantees",
                name: "GuaranteesStatement",
                element: <Guarantees/>
            },
            {
                path: "statements/account",
                name: "AccountStatement",
                element: <AccountStatement/>
            },
            {
                path: "statements/loans",
                name: "LoanStatement",
                element: <LoanStatement/>
            },

            //standing order
            {
                path:"standing-orders",
                name: "StandingOrder",
                element:<StandingOrder/>
            },
        ]
    },
];