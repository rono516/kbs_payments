import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Grid, Paper, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { TransferCard } from "../../../shared/components/card/TransferCard.tsx";
import RecentTransactions from "../../dashboard/components/RecentTransactions";
import AccountProfile from "../../dashboard/components/AccountProfile";

const CARD_HEIGHT = 'auto';
const CARD_WIDTH = '100%';

const baseUrl = 'http://127.0.0.1:8000/api';

export default function MyLoans() {
    const navigate = useNavigate();
    const [loanData, setLoanData] = useState([]);

    const member_id = localStorage.getItem("sacco_user_id");

    useEffect(() => {
        const fetchLoanData = async () => {
            try {
                const response = await axios.get(`${baseUrl}/show_member_loans/${member_id}`, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });

                const data = response.data.data.map(item => ({
                    id: item.id,
                    name: item.attributes.product_name,
                    subText: 'Eligible Amount',
                    amount: item.attributes.amount,
                    url: `/loans/loan-details/${member_id}/${item.id}`, // Assuming this is a placeholder; you might want to adjust based on your needs
                }));

                setLoanData(data);
            } catch (error) {
                console.error("Error fetching loan data", error);
            }
        };

        if (member_id) {
            fetchLoanData();
        } else {
            console.error("No member_id found in localStorage");
        }
    }, [member_id]);

    const handleCardClick = (url) => {
        navigate(url);
    };

    const handleRepayment = (id) => {
        navigate(`/loans/loan-repayment/${member_id}/${id}`);
    };

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Paper
            sx={{
                p: 2,
                m: 2,
                color: 'primary.main',
                height: '100%',
                // backgroundColor: 'secondary.lighter'
            }}
        >
            <Grid container spacing={3}>
                <Grid item xs={12} lg={8} sx={{ backgroundColor: 'secondary.lighter', p: 1 }}>
                    <Typography variant='h6' sx={{mb:2}}>My Loan Accounts</Typography>
                    <Grid container spacing={3}>
                        {loanData.map((loan, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <TransferCard
                                    name={loan.name}
                                    subText={loan.subText}
                                    height={CARD_HEIGHT}
                                    width={CARD_WIDTH}
                                    amount={loan.amount}
                                    currency={'KES'}
                                    showButton
                                    onClick={() => handleCardClick(loan.url)}
                                    showRepay={undefined}
                                    showDeposit={undefined}
                                    onDeposit={undefined}
                                    buttonText={undefined}
                                    buttonIcon={undefined}
                                    onRepay={() => handleRepayment(loan.id)}                               />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
                <Grid item xs={12} lg={4}>
                    <AccountProfile />
                    <Typography variant="h6" sx={{ padding: '20px 0 10px' }}>Recent Transactions</Typography>
                    <RecentTransactions />
                </Grid>
            </Grid>
        </Paper>
    )
}
