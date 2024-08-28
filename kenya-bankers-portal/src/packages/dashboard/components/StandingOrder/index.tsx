import {Avatar, Box, Button, Card, CardContent, Grid, Paper, Stack, TextField, Typography} from "@mui/material";
import poster from "../../../../assets/images/drawable-hdpi/posters-05.png";
import poster2 from "../../../../assets/images/drawable-hdpi/posters-08.png";
import * as React from "react";
import {ArrowBack} from "@mui/icons-material";
import {formatCurrency} from "../../../../shared/utils/helper/helpers.tsx";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import EditStandingOrder from "./EditStandingOrder.tsx";

const standingOrders=[
    {
        id:1,
        name:"Rent Payment",
        amount: 1000,
        currency: "KES",
        date: "01/01/2024",
        nextPayment: "01/02/2024",
    },
    {
        id:2,
        name:"Electricity Bill",
        amount: 100,
        currency: "USD",
        date: "01/01/2024",
        nextPayment: "01/02/2024",
    },
    {
        id:3,
        name:"Water Bill",
        amount: 50,
        currency: "KES",
        date: "01/01/2024",
        nextPayment: "01/02/2024",
    },
    {
        id:4,
        name:"Internet Bill",
        amount: 30,
        currency: "USD",
        date: "01/01/2024",
        nextPayment: "01/02/2024",
    },
    {
        id:5,
        name:"Phone Bill",
        amount: 20,
        currency: "USD",
        date: "01/01/2024",
        nextPayment: "01/02/2024",
    }
]

export default function StandingOrder() {
    const [hasEditedOrder, setHasEditedOrder] = React.useState(false)
    return (
        <Paper
            sx={{
                p:2,
                m:2,
                color: 'primary.main',
                height: '100%',
                backgroundColor: 'secondary.lighter'
            }}
        >
            <Stack spacing={3} direction="row" sx={{mb:2}}>
                <Typography variant="h5" component="h2">Standing Orders</Typography>
                {/* <Typography variant="h6" component="h2">My Guarantees</Typography> */}
                <Box sx={{ flexGrow: 1 }} />
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<ArrowBack />}
                    onClick={() => window.history.back()}
                >
                    Back
                </Button>
            </Stack>
            <Card>
                <CardContent>
                    <Grid container spacing={2} columns={12}>
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                            {standingOrders.map((item) => (
                                <Paper
                                    key={item.id}
                                    elevation={3}
                                    sx={{
                                        marginBottom: 2,
                                        color:'primary.main',
                                        padding: 1,
                                        '&:hover': {
                                            boxShadow: 6,
                                            cursor: 'pointer'
                                        }
                                    }}
                                >
                                    <Stack direction="row" alignItems="center" spacing={2}>
                                        <Stack>
                                            <Typography variant="h6" component="h2">{item.name}</Typography>
                                            <Typography sx={{color:'warning.main'}} variant="h6" component="h2"> {item.currency}  {formatCurrency(item.amount)} </Typography>
                                            <Typography variant="body2" component="p">Next Payment: {item.nextPayment}</Typography>
                                        </Stack>
                                        <Box sx={{ flexGrow: 1 }} />
                                        <Stack spacing={2} direction="column">
                                            <Button variant="contained"> Upto Date <AccessTimeIcon /></Button>
                                            <Button onClick={()=>setHasEditedOrder(true)} variant="contained" aria-label="edit"> Edit Order <BorderColorIcon /></Button>
                                        </Stack>
                                    </Stack>
                                </Paper>
                            ))}
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                            {
                                hasEditedOrder && (
                                    <EditStandingOrder/>
                                )
                            }
                            {
                                !hasEditedOrder && (
                                    <Stack direction="row">
                                        <img src={poster} alt="poster" style={{width: '100%'}}/>
                                        <img src={poster2} alt="poster" style={{width: '100%'}}/>
                                    </Stack>
                                )
                            }
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Paper>
    );
}