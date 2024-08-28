import { Grid, Paper, Typography, useTheme, useMediaQuery } from "@mui/material";
import { ClickableCard } from "../../../shared/components/card/ClickableCard.tsx";
import { AccountBalance, MoveDown, CurrencyExchange, Payments, AccountBalanceWallet } from "@mui/icons-material";
import LoanIcon from "../../../assets/images/drawable-hdpi/myloans-1.png";
import LoanRepaymentIcon from "../../../assets/images/drawable-hdpi/loanrepayment-1.png";
import ApplyLoanIcon from "../../../assets/images/drawable-hdpi/Group 216.png";
import LoanEligibilityIcon from "../../../assets/images/drawable-hdpi/balinquiry-1.png";
import GuarantorIcon from "../../../assets/images/drawable-hdpi/Mask Group 1.png";
import { useNavigate } from "react-router-dom";
import RecentTransactions from "../../dashboard/components/RecentTransactions.tsx";
import AccountProfile from "../../dashboard/components/AccountProfile.tsx";

export default function Loan() {
    const navigate = useNavigate();
    const handleCardClick = (url) => {
        navigate(url);
    };

    const cardData = [
        { image: LoanIcon, icon: <AccountBalance fontSize="large" />, name: "MY LOANS", url: "/loans/my" },
        { image: ApplyLoanIcon, icon: <MoveDown fontSize="large" />, name: "APPLY LOAN", url: "/loans/loan-form" },
        { image: LoanEligibilityIcon, icon: <CurrencyExchange fontSize="large" />, name: "LOAN ELIGIBILITY", url: "/loans/loan-eligibility" },
        { image: LoanRepaymentIcon, icon: <Payments fontSize="large" />, name: "LOAN REPAYMENT", url: "/loans/my" },
        { image: GuarantorIcon, icon: <AccountBalanceWallet fontSize="large" />, name: "PENDING OFFERS & GUARANTEES", url: "pending-offers" },
    ];

    return (
        <Paper sx={{ padding: '2x 2px 0 2px', margin: '2x 2px 0 2px', height: '100%' }}>
            <Grid container spacing={3}>
                <Grid item xs={12} lg={8} sx={{ backgroundColor: 'secondary.lighter' }}>
                    <Grid container spacing={3}>
                        {cardData.map((card, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <ClickableCard
                                    image={card.image}
                                    icon={card.icon}
                                    name={card.name}
                                    height="250"
                                    width="auto"
                                    onClick={() => handleCardClick(card.url)}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
                <Grid item xs={12} lg={4}>
                    <AccountProfile />
                    <Typography variant="h6" sx={{ padding: '20px 0 10px', color:"primary.main" }}>Recent Transactions</Typography>
                    <RecentTransactions />
                </Grid>
            </Grid>
        </Paper>
    );
}