import {Grid, Paper, Stack, Typography} from "@mui/material";
import {TransferCard} from "../../../../shared/components/card/TransferCard.tsx";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import DepositForm from "./DepositForm.tsx";
import axios from 'axios';

const CARD_HEIGHT = 'auto';
const CARD_WIDTH = 'auto';

const baseUrl = 'http://127.0.0.1:8000/api';

export default function SavingSchemes(){
    
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
                width: '70vw',
                color: 'primary.main',
                padding: 3
            }}
        >
            {cardData ? (
                <Grid container spacing={3} sx={{ backgroundColor: 'secondary.lighter', p: 1 }}>
                    <Grid item xs={12} lg={8}>
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
                                        buttonIcon={undefined}
                                        onRepay={undefined}  />
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            ) : (
                <Typography variant="h6">Loading Savings Accounts...</Typography>
            )}
        </Paper>
    );
}