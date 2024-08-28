import {Avatar, Box, Button, Card, CardContent, Grid, Paper, Stack, TextField, Typography} from "@mui/material";
import poster from "../../../../assets/images/drawable-hdpi/posters-05.png";
import poster2 from "../../../../assets/images/drawable-hdpi/posters-08.png";
import * as React from "react";
import {ArrowBack} from "@mui/icons-material";
import {formatCurrency} from "../../../shared/utils/helper/helpers.tsx";

const persons=[
    {id:1,name:'John Doe', idNumber:'123456789', phone:'0712345678'},
    {id:2,name:'Jane Doe', idNumber:'123456789', phone:'0712345678'},
    {id:3,name:'James Doe', idNumber:'123456789', phone:'0712345678'},
    {id:4,name:'Judy Doe', idNumber:'123456789', phone:'0712345678'},
    {id:5,name:'Jack Doe', idNumber:'123456789', phone:'0712345678'},
    {id:6,name:'Jill Doe', idNumber:'123456789', phone:'0712345678'},
]

export default function PendingOffers() {
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
                <Typography variant="h5" component="h2">My Loans</Typography>
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
            <Stack spacing={3} sx={{mb:2}}>
                <Typography variant="h6" component="h2">Pending Offers & Guarantees</Typography>
            </Stack>
            <Card>
                <CardContent>
                    <Grid container spacing={2} columns={12}>
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                            {persons.map((bank) => (
                                <Paper
                                    key={bank.id}
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
                                        <Avatar sx={{bgcolor:'warning.main'}}>{bank.name.charAt(0)}</Avatar>
                                        <Stack>
                                            <Typography variant="body1">{bank.name}</Typography>
                                            <Typography variant="body1">Your guarantor request is pending</Typography>
                                        </Stack>
                                        <Box sx={{ flexGrow: 1 }} />
                                        <Stack>
                                            <Typography color="warning.main" variant="h6">KES {formatCurrency(849974)}</Typography>
                                            <Typography variant="body1">Personal Loan</Typography>
                                        </Stack>
                                    </Stack>
                                </Paper>
                            ))}
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Paper>
    );
}