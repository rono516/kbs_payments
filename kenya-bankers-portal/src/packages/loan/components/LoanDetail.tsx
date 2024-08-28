import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Box, Typography, Paper, Card, CardContent, CardHeader, Divider, Button } from '@mui/material';
import RecentTransactions from "../../dashboard/components/RecentTransactions";
import AccountProfile from "../../dashboard/components/AccountProfile";
import { useParams } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';

const baseUrl = 'http://127.0.0.1:8000/api';

const LoanDetails: React.FC = () => {
    const { member_id, loan_id } = useParams<{ member_id: string; loan_id: string }>();
    const [loanDetails, setLoanDetails] = useState<any>(null);

    useEffect(() => {
        const fetchLoanDetails = async () => {
            try {
                const response = await axios.get(`${baseUrl}/loan-details/${member_id}/${loan_id}`, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
                setLoanDetails(response.data.data);
            } catch (error) {
                console.error("Error fetching loan details", error);
            }
        };

        if (member_id && loan_id) {
            fetchLoanDetails();
        } else {
            console.error("Invalid member_id or loan_id");
        }
    }, [member_id, loan_id]);

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
                    {loanDetails ? (
                        <Card>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <CardHeader
                                    sx={{ color: 'black' }}
                                    title={loanDetails.attributes.product_name}
                                    subheader={`State: ${loanDetails.attributes.state}`}
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
                                    <strong>Amount:</strong> {loanDetails.attributes.amount} KES
                                </Typography>
                                <Divider sx={{ my: 1 }} />
                                <Typography variant="body1">
                                    <strong>Total Due:</strong> {loanDetails.attributes.total_due} KES
                                </Typography>
                                <Divider sx={{ my: 1 }} />
                                <Typography variant="body1">
                                    <strong>Total Paid:</strong> {loanDetails.attributes.total_paid} KES
                                </Typography>
                                <Divider sx={{ my: 1 }} />
                                <Typography variant="body1">
                                    <strong>Total Balance:</strong> {loanDetails.attributes.total_balance} KES
                                </Typography>
                                <Divider sx={{ my: 1 }} />
                                <Typography variant="body1">
                                    <strong>Accrued Interest:</strong> {loanDetails.attributes.accrued_interest} KES
                                </Typography>
                                <Divider sx={{ my: 1 }} />
                                <Typography variant="body1">
                                    <strong>Next Repayment Due Date:</strong> {new Date(loanDetails.attributes.next_repayment_due_date).toLocaleDateString()}
                                </Typography>
                                <Divider sx={{ my: 1 }} />
                                <Typography variant="body1">
                                    <strong>FOSA Deposit Account:</strong> {loanDetails.attributes.fosa_deposit_account.product_name} ({loanDetails.attributes.fosa_deposit_account.savings_id})
                                </Typography>
                                <Divider sx={{ my: 1 }} />
                                <Typography variant="body1">
                                    <strong>Created At:</strong> {new Date(loanDetails.attributes.created_at).toLocaleString()}
                                </Typography>
                                <Divider sx={{ my: 1 }} />
                                <Typography variant="body1">
                                    <strong>Updated At:</strong> {new Date(loanDetails.attributes.updated_at).toLocaleString()}
                                </Typography>
                            </CardContent>
                        </Card>
                    ) : (
                        <Typography variant="h6">Loading Loan Details...</Typography>
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
export default LoanDetails;
