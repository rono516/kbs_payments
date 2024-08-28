
import { Box, Card, CardContent, Grid, Typography, Divider } from "@mui/material";
import CreditIcon from "../../../assets/images/drawable-hdpi/Group -28.png";
import DebitIcon from "../../../assets/images/drawable-hdpi/Group -29.png";

export default function RecentTransactions() {
    const transactions = [
        { id: "ID219383", description: 'Biashara loan repayment', type:"M-Pesa Deposit", amount: '+200,000.00',date:"2024-05-18",time:"10:00AM",transactionType: "credit" },
        { id: "ID229487", description: 'For Myself', type:"Airtime Purchase", amount: '-30,000.50',date:"2024-05-18",time:"11:00AM",transactionType:"debit" },
        { id: "ID229488", description: 'For Friend', type:"M-Pesa Transfer", amount: '-50,000.00',date:"2024-04-01",time:"12:00PM",transactionType:"debit" },
        { id: "ID229488", description: 'Advance', type:"Bank Deposit", amount: '5,000.00',date:"2024-04-01",time:"8:00PM",transactionType:"credit" },
        { id: "ID229489", description: 'Salary', type:"Bank Transfer", amount: '+100,000.00',date:"2021-10-12",time:"10:00AM",transactionType:"credit" },
    ];

    // Group transactions by date
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
                borderRadius:3
            }}
        >
            {Array.from(transactionsByDate?.entries()).map(([date, transactions]) => (
                <Box key={date} sx={{ alignItems: 'flex-start',}}>
                    <Box sx={{ textAlign:'left',color:'secondary.light'}}>
                        <Typography variant="body1" sx={{ padding: 2 }}>{date}</Typography>
                    </Box>
                    {transactions.map((transaction) => (
                        <Card key={transaction.id}
                              sx={{color: 'primary.main',
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
                                    <Grid item xs={6} container spacing={1} sx={{textAlign:'left'}} alignItems="flex-start">
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
