import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Grid, Paper, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { TransferCard } from "../../../shared/components/card/TransferCard.tsx";

const CARD_HEIGHT = 'auto';
const CARD_WIDTH = '100%';

const baseUrl = 'http://127.0.0.1:8000/api';

export default function LoanEligibility() {
    const navigate = useNavigate();
    const [eligibilityData, setEligibilityData] = useState([]);

    const member_id = localStorage.getItem("sacco_user_id");

    useEffect(() => {
        const fetchEligibilityData = async () => {
            try {
                const response = await axios.get(`${baseUrl}/loan_eligibility_by_products/${member_id}`, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });

                const data = response.data.data.map(item => {
                    const product = response.data.included.find(product => product.id === item.relationships.product.data.id);
                    return {
                        product_id: item.id,
                        eligibleAmount: item.attributes.eligible_amount,
                        multiplier: item.attributes.multiplier,
                        productName: product.attributes.name,
                        productDetails: product.attributes
                    };
                });

                setEligibilityData(data);
            } catch (error) {
                console.error("Error fetching eligibility data", error);
            }
        };

        if (member_id) {
            fetchEligibilityData();
        } else {
            console.error("No member_id found in localStorage");
        }
    }, [member_id]);

    const handleCardClick = (product_id) => {
        localStorage.setItem('product_id', product_id);
        navigate(`/loans/loan-form`);// Pass the product_id in the URL
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
                backgroundColor: 'secondary.lighter'
            }}
        >
            <Stack sx={{ margin: 3 }} direction="column">
                <Typography variant='h6'>Loan Eligibility</Typography>
            </Stack>
            <Grid container spacing={isSmallScreen ? 2 : 3}>
                {eligibilityData.map((eligibility, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <TransferCard
                            name={eligibility.productName}
                            subText={`Eligible Amount: ${eligibility.eligibleAmount}, Multiplier: ${eligibility.multiplier}`}
                            height={CARD_HEIGHT}
                            width={CARD_WIDTH}
                            amount={eligibility.eligibleAmount}
                            currency={'KES'}
                            showButton
                            buttonText="Apply"
                            buttonIcon={<ModeEditIcon />}
                            onClick={() => handleCardClick(eligibility.product_id)} // Adjust URL as needed
                            showRepay={undefined} showDeposit={undefined} onDeposit={undefined} onRepay={undefined}                        />
                    </Grid>
                ))}
            </Grid>
        </Paper>
    )
}
