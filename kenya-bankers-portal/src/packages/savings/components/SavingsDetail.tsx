import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Box, Typography, Paper, Card, CardContent, CardHeader, Divider, Button } from '@mui/material';
import RecentTransactions from "../../dashboard/components/RecentTransactions";
import AccountProfile from "../../dashboard/components/AccountProfile";
import { useParams } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';

const baseUrl = 'http://127.0.0.1:8000/api';

const SavingsDetail: React.FC = () => {
    const { member_id, savings_id } = useParams<{ member_id: string; savings_id: string }>();
    const [savingsDetails, setSavingsDetails] = useState<any>(null);

    useEffect(() => {
        const fetchSavingsDetails = async () => {
            try {
                const response = await axios.get(`${baseUrl}/savings-detail/${member_id}/${savings_id}`, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
                setSavingsDetails(response.data.data);
            } catch (error) {
                console.error("Error fetching savings details", error);
            }
        };

        if (member_id && savings_id) {
            fetchSavingsDetails();
        } else {
            console.error("Invalid member_id or savings_id");
        }
    }, [member_id, savings_id]);

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
                <Grid item xs={12} lg={8} sx={{ backgroundColor: 'secondary.lighter', p: 1 }}>
                    {savingsDetails ? (
                        <Card>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <CardHeader
                                    sx={{ color: 'black'}}
                                    title={savingsDetails.attributes.name}
                                    subheader={`Product: ${savingsDetails.attributes.product_name}`}
                                />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    startIcon={<ArrowBack />}
                                    onClick={() => window.history.back()}
                                    sx={{ alignSelf: 'center', marginRight: 2 }}
                                >
                                    Back
                                </Button>
                            </Box>
                            <CardContent sx={{ color: 'black'}}>
                                <Typography variant="body1">
                                    <strong>Type:</strong> {savingsDetails.attributes.type}
                                </Typography>
                                <Divider sx={{ my: 1 }} />
                                <Typography variant="body1">
                                    <strong>Balance:</strong> {savingsDetails.attributes.balance} KES
                                </Typography>
                                <Divider sx={{ my: 1 }} />
                                <Typography variant="body1">
                                    <strong>Available Balance:</strong> {savingsDetails.attributes.available_balance} KES
                                </Typography>
                                <Divider sx={{ my: 1 }} />
                                <Typography variant="body1">
                                    <strong>Accrued Interest:</strong> {savingsDetails.attributes.accrued_interest} KES
                                </Typography>
                                <Divider sx={{ my: 1 }} />
                                <Typography variant="body1">
                                    <strong>State:</strong> {savingsDetails.attributes.state}
                                </Typography>
                                <Divider sx={{ my: 1 }} />
                                <Typography variant="body1">
                                    <strong>Created At:</strong> {new Date(savingsDetails.attributes.created_at).toLocaleString()}
                                </Typography>
                                <Divider sx={{ my: 1 }} />
                                <Typography variant="body1">
                                    <strong>Updated At:</strong> {new Date(savingsDetails.attributes.updated_at).toLocaleString()}
                                </Typography>
                            </CardContent>
                        </Card>
                    ) : (
                        <Typography variant="h6">Loading Savings Details...</Typography>
                    )}
                </Grid>
                <Grid item xs={12} lg={4}>
                    <AccountProfile />
                    <Typography variant="h6" sx={{ padding: '20px 0 10px' }}>Recent Transactions</Typography>
                    <RecentTransactions />
                </Grid>
            </Grid>
        </Paper>
    );
}
export default SavingsDetail;
