import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Grid, Typography, Divider } from "@mui/material";
import axios from 'axios';
import CreditIcon from "../../../assets/images/drawable-hdpi/Group -28.png";
import DebitIcon from "../../../assets/images/drawable-hdpi/Group -29.png";

const baseUrl = 'http://127.0.0.1:8000/api';

const RecentTransactions = () => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const member_id = localStorage.getItem("sacco_user_id");
                const response = await axios.get(`${baseUrl}/show_member_savings_and_loans/${member_id}`);
                const { savings_id, loan_id } = response.data;

                // Use savings_id and loan_id for subsequent transaction fetching
                const savingsResponse = await axios.get(`${baseUrl}/show_saving_transactions/${savings_id}`);
                const loanResponse = await axios.get(`${baseUrl}/show_loan_transactions/${loan_id}`);

                const formatDateTime = (dateTimeString) => {
                    const date = new Date(dateTimeString);
                    const year = date.getFullYear();
                    const month = String(date.getMonth() + 1).padStart(2, '0');
                    const day = String(date.getDate()).padStart(2, '0');
                    const hours = date.getHours();
                    const minutes = String(date.getMinutes()).padStart(2, '0');
                    const ampm = hours >= 12 ? 'pm' : 'am';
                    const formattedHours = hours % 12 || 12; // Convert to 12-hour format
                    return `${year}-${month}-${day} ${formattedHours}:${minutes}${ampm}`;
                };
                
                const processTransactions = (data) => {
                    return data.map(transaction => {
                        const amount = transaction.attributes.amount;
                        return {
                            id: transaction.id,
                            description: transaction.attributes.notes,
                            type: transaction.attributes.type,
                            amount: amount !== null ? amount.toFixed(2) : '0.00',
                            date: formatDateTime(transaction.attributes.created_at),
                            transactionType: amount > 0 ? "credit" : "debit"
                        };
                    });
                };
                
                const savingsTransactions = processTransactions(savingsResponse.data.data)
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) // Sort by date, descending
                    .slice(0, 1); // Take only the most recent transactions

                const loanTransactions = processTransactions(loanResponse.data.data)
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) // Sort by date, descending
                    .slice(0, 1); // Take only the most recent transactions

                setTransactions([...savingsTransactions, ...loanTransactions]);
            } catch (error) {
                console.error("Error fetching transactions", error);
            }
        };

        fetchTransactions();
    }, []);

    const transactionsByDate = new Map();
    transactions.forEach((transaction) => {
        const date = transaction.date;
        if (!transactionsByDate.has(date)) {
            transactionsByDate.set(date, []);
        }
        transactionsByDate.get(date).push(transaction);
    });

    return (
        <Box
            sx={{
                backgroundColor: 'secondary.lighter',
                padding: '2px 2px 0 2px',
                margin: '2x 2px 0 2px',
                height: '100%',
                borderRadius: 3
            }}
        >
            {Array.from(transactionsByDate?.entries()).map(([date, transactions]) => (
                <Box key={date} sx={{ alignItems: 'flex-start' }}>
                    <Box sx={{ textAlign: 'left', color: 'secondary.light' }}>
                        <Typography variant="body1" sx={{ padding: 2 }}>{date}</Typography>
                    </Box>
                    {transactions.map((transaction) => (
                        <Card key={transaction.id}
                              sx={{
                                  color: 'primary.main',
                                  padding: 2, // Add padding here
                                  margin: 2,
                                  boxShadow: 'none',
                                  borderRadius: 2
                              }}>
                            <CardContent sx={{ padding: 0 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={2}>
                                        {transaction.transactionType === "credit" ? (
                                            <img src={CreditIcon} alt="credit icon" width="auto" height="auto" />
                                        ) : (
                                            <img src={DebitIcon} alt="debit icon" width="auto" height="auto" />
                                        )}
                                    </Grid>
                                    <Grid item xs={6} container spacing={1} sx={{ textAlign: 'left' }} alignItems="flex-start">
                                        <Grid item xs={12}>
                                            <Typography variant="subtitle2">{transaction.id}</Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="subtitle1">{transaction.description}</Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="body2">{transaction.type}</Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={4} container spacing={1} justifyContent="flex-end">
                                        <Grid item xs={12}>
                                            <Typography variant="subtitle1" color={transaction.transactionType === "debit" ? "warning.main" : "inherit"}>
                                                {transaction.amount}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="body2">{transaction.time}</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            ))}
        </Box>
    );
}

export default RecentTransactions;