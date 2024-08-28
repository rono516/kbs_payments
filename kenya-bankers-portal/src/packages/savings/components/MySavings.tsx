import { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import RecentTransactions from "../../dashboard/components/RecentTransactions";
import AccountProfile from "../../dashboard/components/AccountProfile";
import { TransferCard } from "../../../shared/components/card/TransferCard";

const baseUrl = 'http://127.0.0.1:8000/api';

export default function MySavings() {
    const navigate = useNavigate();
    const [cardData, setCardData] = useState([]);

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

    const handleCardClick = (url) => {
        navigate(url);
    };

    const handleDeposit = (id) => {
        navigate(`/savings/savings-deposit/${member_id}/${id}`);
    };

    return (
        <Paper
            sx={{
                padding: 2,
                margin: 2,
                color: 'primary.main',
                height: '100%',
            }}
        >
            <Grid container spacing={3}>
                {cardData ? (
                    <Grid item xs={12} lg={8} sx={{ backgroundColor: 'secondary.lighter', p: 1 }}>
                        <Typography variant='h6' sx={{ mb:2 }}>My Savings Accounts</Typography>
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
                                        buttonText={undefined}
                                        buttonIcon={undefined} onRepay={undefined}  />
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                ) : (
                    <Typography variant="h6">Loading Savings Accounts...</Typography>
                )}
                <Grid item xs={12} lg={4}>
                    <AccountProfile />
                    <Typography variant="h6" sx={{ padding: '20px 0 10px' }}>Recent Transactions</Typography>
                    <RecentTransactions />
                </Grid>
            </Grid>
        </Paper>
    );
}
