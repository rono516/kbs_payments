import {Box, Grid, Stack, Typography, useMediaQuery, useTheme} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {TransferCard} from "../../../../../shared/components/card/TransferCard.tsx";
import { useEffect, useState } from "react";
import axios from "axios";

const CARD_HEIGHT = 'auto';
const CARD_WIDTH = 'auto';
const baseUrl = 'http://127.0.0.1:8000/api';

export default function MyOtherAccountsInternalTransfer(){
    const navigate = useNavigate();
    const [cardData, setCardData] = useState([]);
    const [loanData, setLoanData] = useState([]);

    const member_id = localStorage.getItem("sacco_user_id");

    useEffect(() => {
        const fetchSavingsData = async () => {
            try {
                const response = await axios.get(`${baseUrl}/show_member_savings/${member_id}`, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });

                const data = response.data.data.map(item => ({
                    id: item.id,
                    name: item.attributes.name,
                    subText: item.attributes.product_name,
                    // subText: 'Account Balance',
                    amount: item.attributes.balance,
                    url: `/savings/savings-detail/${member_id}/${item.id}`, 
                }));

                setCardData(data);
            } catch (error) {
                console.error("Error fetching savings data", error);
            }
        };

        if (member_id) {
            fetchSavingsData();
        } else {
            console.error("No member_id found in localStorage");
        }
    }, [member_id]);

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

    const handleDeposit = (id) => {
        navigate(`/savings/savings-transfer/${member_id}/${id}`);
    };
    
    const handleRepayment = (id) => {
        navigate(`/loans/loan-repayment/${member_id}/${id}`);
    };

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box>
            <Stack sx={{ margin:3, color:"blue" }}>
                <Typography variant='h6'>My Savings Account</Typography>
            </Stack>
            <Grid container spacing={isSmallScreen ? 2 : 3}>
                {cardData ? (
                    <Grid item xs={12}>
                        <Grid container spacing={3}>
                            {cardData.map((card, index) => (
                                <Grid item xs={12} sm={6} md={4} key={index}>
                                    <TransferCard
                                        name={card.name}
                                        subText={card.subText}
                                        amount={card.amount}
                                        height="auto"
                                        currency={'KES'}
                                        width="auto"
                                        onClick={() => handleCardClick(card.url)}
                                        showDeposit={true}
                                        onDeposit={() => handleDeposit(card.id)}
                                        showButton={undefined}
                                        showRepay={undefined}
                                        buttonText="Transfer"
                                        buttonIcon={undefined}
                                        onRepay={undefined}  />
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                ) : (
                    <Typography variant="h6">Loading Savings Accounts...</Typography>
                )}
            </Grid>
            <Stack sx={{ margin:3, color:"blue" }}>
                <Typography variant='h6' sx={{ mt:4 }}>My Loan Accounts</Typography>
            </Stack>
            <Grid container spacing={isSmallScreen ? 2 : 3}>
                <Grid item xs={12}>
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
            </Grid>
        </Box>
    )
}