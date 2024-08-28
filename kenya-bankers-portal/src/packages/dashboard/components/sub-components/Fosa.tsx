import {Box, Grid, Paper, Stack} from "@mui/material";
import StatisticsCard from "../../../../shared/components/card/StatisticsCard.tsx";
import BankingTable from "../../../../shared/components/tables/bankingTable.tsx";
const columns = [
    { id: 'date', label: 'Date', minWidth: 170 },
    { id: 'name', label: 'Trans ID Name / Beneficiary', minWidth: 170 },
    { id: 'type', label: 'Type', minWidth: 170 },
    { id: 'debit', label: 'Debit (KES)', minWidth: 170,align: 'right' },
    { id: 'credit', label: 'Credit (KES)', minWidth: 170,align: 'right' },
    { id: 'balance', label: 'Balance (KES)', minWidth: 170,align: 'right'}
]
const rows = [
    { date: '05/05/2028', name: ' Mike Dubois',type: 'FOSA Current', debit: 3984, credit: 1000, balance: 74000 },
    { date: '05/05/2023', name: 'Kenneth Korir', type: 'FOSA Current', debit: 8373, credit: 1000, balance: 87474 },
    { date: '05/05/2023', name: 'Noreeen Wambani', type: 'FOSA Current', debit: 0, credit: 1000, balance: 330000 },
    { date: '05/05/2023', name: 'Robert Omondi', type: 'FOSA Current', debit: 3838, credit: 4747, balance: 400000 },
    { date: '05/05/2023', name: 'Bevon Nyamberi', type: 'FOSA Current', debit: 0, credit: 1000, balance: 620000 },
    { date: '05/05/2023', name: 'Nancy Gatii Moraa', type: 'FOSA Current', debit: 8583, credit: 7484, balance: 500000 },
    { date: '05/05/2023', name: 'Josephine wambori', type: 'FOSA Current', debit: 0, credit: 1000, balance: 3801000 },
    { date: '05/05/2023', name: 'Jane Karimi', type: 'FOSA Current', debit: 63474, credit: 3857, balance: 6200000 },
];

export default function FosaAccount() {
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
            <Box sx={{
                padding: 2
            }}>
                <Grid container spacing={2} columns={12}>
                    <Grid item xs={12} sm={6} md={4} lg={2.4}>
                        <StatisticsCard
                            image="/images/icons/transactions.png"
                            name="F.O.S.A Balance:"
                            height="100px"
                            width="100%"
                            currency={"KES"}
                            value={27283.76}
                            color="warning.main"
                            bgColor="secondary.contrastText"
                            onClick={() => console.log("Transactions")} subText={undefined} icon={undefined}                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={2.4}>
                        <StatisticsCard
                            image="/images/icons/loans.png"
                            name={"Principal Balance(" + "KES" + ")"}
                            height="100px"
                            width="100%"
                            color="primary.dark"
                            currency={"KES"}
                            value={7654.98}
                            bgColor="secondary.contrastText"
                            onClick={() => console.log("Loans")} subText={undefined} icon={undefined}                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={2.4}>
                        <StatisticsCard
                            image="/images/icons/loans.png"
                            name="Monthly Contribution"
                            height="100px"
                            width="100%"
                            currency={"KES"}
                            value={1278.00}
                            color="primary.dark"
                            bgColor="secondary.contrastText"
                            onClick={() => console.log("Loans")} subText={undefined} icon={undefined}                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={2.4}>
                        <StatisticsCard
                            image="/images/icons/loans.png"
                            name="Interest Amount"
                            height="100px"
                            width="100%"
                            currency={"KES"}
                            value={6898.00}
                            color="primary.dark"
                            bgColor="secondary.contrastText"
                            onClick={() => console.log("Loans")} subText={undefined} icon={undefined}                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={2.4}>
                        <StatisticsCard
                            image="/images/icons/loans.png"
                            name="Interest Rate"
                            height="100px"
                            value={"6%"}
                            color="primary.dark"
                            bgColor="secondary.contrastText"
                            onClick={() => console.log("Loans")} subText={undefined} currency={undefined} icon={undefined} width={undefined}                        />
                    </Grid>


                </Grid>
            </Box>
            <BankingTable
                columns={columns}
                rows={rows}
                title={"My F.O.S.A Account"}
                subTitle={"Transactions"}
                actionName="Add"

            />
        </Paper>
    );
}
