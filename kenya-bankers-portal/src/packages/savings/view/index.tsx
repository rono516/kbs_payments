import { Grid, Paper, Typography, useTheme, useMediaQuery } from "@mui/material";
import { ClickableCard } from "../../../shared/components/card/ClickableCard.tsx";
import { AccountBalance, MoveDown, CurrencyExchange, Payments, AccountBalanceWallet } from "@mui/icons-material";
import savingIcon from "../../../assets/images/drawable-hdpi/mysavings.png";
import ApplyLoanIcon from "../../../assets/images/drawable-hdpi/Group 216.png";
import { useNavigate } from "react-router-dom";
import RecentTransactions from "../../dashboard/components/RecentTransactions.tsx";
import AccountProfile from "../../dashboard/components/AccountProfile.tsx";

export default function Savings() {
    const navigate = useNavigate();
    const handleCardClick = (url) => {
        navigate(url);
    };

    const cardData = [
        { image: savingIcon, icon: <AccountBalance fontSize="large" />, name: "MY SAVINGS", url: "/savings/my" },
        { image: ApplyLoanIcon, icon: <MoveDown fontSize="large" />, name: "CREATE SAVINGS", url: "/savings/savings-form" },
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