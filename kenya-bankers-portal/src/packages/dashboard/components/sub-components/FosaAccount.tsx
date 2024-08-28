import { useEffect, useState } from "react";
import { Box, Grid, Paper } from "@mui/material";
import axios from "axios";
import StatisticsCard from "../../../../shared/components/card/StatisticsCard.tsx";
import BankingTable from "../../../../shared/components/tables/bankingTable.tsx";

const baseUrl = 'http://127.0.0.1:8000/api';

const columns = [
    { id: 'date', label: 'Date', minWidth: 170 },
    { id: 'name', label: 'Trans ID Name / Beneficiary', minWidth: 170 },
    { id: 'type', label: 'Type', minWidth: 170 },
    { id: 'debit', label: 'Debit (KES)', minWidth: 170, align: 'right' },
    { id: 'credit', label: 'Credit (KES)', minWidth: 170, align: 'right' },
    { id: 'balance', label: 'Balance (KES)', minWidth: 170, align: 'right' },
];

export default function FosaAccount() {
    const [accountData, setAccountData] = useState(null);
    const [transactions, setTransactions] = useState([]);

    // Fetch FOSA account information
    useEffect(() => {
        const fetchFosaData = async () => {
            try {
                const savings_id = localStorage.getItem('fosa_account_number'); // Replace with the actual account number
                const response = await axios.get(`${baseUrl}/show_savings/${savings_id}`, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
                const { data, included } = response.data;

                // Set account data (balance, interest, etc.)
                setAccountData(data.attributes);

                // Map transactions to the desired format
                const formattedTransactions = included.map((item) => ({
                    date: new Date(item.attributes.booking_date).toLocaleDateString(),
                    name: item.attributes.notes || "N/A",
                    type: item.attributes.type,
                    debit: item.attributes.amount < 0 ? Math.abs(item.attributes.amount) : 0,
                    credit: item.attributes.amount > 0 ? item.attributes.amount : 0,
                    balance: item.attributes.balance,
                }));

                setTransactions(formattedTransactions);
            } catch (error) {
                console.error("Error fetching FOSA account data:", error);
            }
        };

        fetchFosaData();
    }, []);

    return (
        <Paper
            sx={{
                padding: '2px 2px 0 2px',
                margin: '2x 2px 0 2px',
                textAlign: "center",
                color: 'primary.main',
                height: '100%',
                backgroundColor: 'secondary.lighter',
            }}
        >
            <Box sx={{ padding: 2 }}>
                <Grid container spacing={2} columns={12}>
                    <Grid item xs={12} sm={6} md={4} lg={2.4}>
                        <StatisticsCard
                            image="/images/icons/transactions.png"
                            name="F.O.S.A Balance:"
                            height="100px"
                            width="100%"
                            currency={"KES"}
                            value={accountData ? accountData.available_balance : 0}
                            color="warning.main"
                            bgColor="secondary.contrastText"
                            onClick={() => console.log("Transactions")} subText={undefined} icon={undefined} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={2.4}>
                        <StatisticsCard
                            image="/images/icons/loans.png"
                            name="Principal Balance (KES)"
                            height="100px"
                            width="100%"
                            color="primary.dark"
                            currency={"KES"}
                            value={accountData ? accountData.balance : 0}
                            bgColor="secondary.contrastText"
                            onClick={() => console.log("Loans")} subText={undefined} icon={undefined} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={2.4}>
                        <StatisticsCard
                            image="/images/icons/loans.png"
                            name="Monthly Contribution"
                            height="100px"
                            width="100%"
                            currency={"KES"}
                            value={1278.00} // Adjust as needed based on actual data
                            color="primary.dark"
                            bgColor="secondary.contrastText"
                            onClick={() => console.log("Loans")} subText={undefined} icon={undefined} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={2.4}>
                        <StatisticsCard
                            image="/images/icons/loans.png"
                            name="Interest Amount"
                            height="100px"
                            width="100%"
                            currency={"KES"}
                            value={accountData ? accountData.accrued_interest : 0}
                            color="primary.dark"
                            bgColor="secondary.contrastText"
                            onClick={() => console.log("Loans")} subText={undefined} icon={undefined} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={2.4}>
                        <StatisticsCard
                            image="/images/icons/loans.png"
                            name="Interest Rate"
                            height="100px"
                            value="6%" // Adjust as needed based on actual data
                            color="primary.dark"
                            bgColor="secondary.contrastText"
                            onClick={() => console.log("Loans")} subText={undefined} currency={undefined} icon={undefined} width={undefined} />
                    </Grid>
                </Grid>
            </Box>
            <BankingTable
                columns={columns}
                rows={transactions}
                title={"My F.O.S.A Account"}
                subTitle={"Transactions"}
                actionName="Add"
            />
        </Paper>
    );
}
