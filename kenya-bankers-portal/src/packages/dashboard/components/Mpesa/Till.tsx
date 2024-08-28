import {Avatar, Box, Button, Card, CardContent, Paper, Stack, TextField, Typography} from "@mui/material";
import Grid from '@mui/material/Grid';
import * as React from "react";
import {useState} from "react";

const frequentTills = [
    {
        name: "Lunch Buddys",
        accountNumber: "123456789",
    },
    {
        name:"KPLC",
        accountNumber: "123456789",
    },
    {
        name:"Nairobi Water",
        accountNumber: "123456789",
    },
    {
        name:"NHIF",
        accountNumber: "123456789",
    },
    {
        name:"Zuku",
        accountNumber: "123456789",
    },
    {
        name: "KRA",
        accountNumber: "123456789",
    }

]

export default function Till() {
    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
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
            <Typography variant="h4" component="h2">Till</Typography>
            <Card sx={{ color: 'primary.main',}}>
                <CardContent>
                    <Grid container spacing={2} sx={{ flexGrow: 1 }}>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h5" component="h3">Pay M-Pesa To Till</Typography>
                            <Stack direction="column" spacing={2}>
                                <TextField
                                    fullWidth
                                    label="Till Number"
                                    variant="outlined"
                                    type="number"
                                />
                                <TextField
                                    fullWidth
                                    label="Amount (KES)"
                                    variant="outlined"
                                    type="number"
                                />
                            </Stack>
                            <Box sx={{ mt: 2, textAlign: 'center' }}>
                                <Button size="large" variant="contained" color="primary">Send</Button>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h5" component="h3">Frequent Used Tills</Typography>
                            <Stack direction="column" spacing={2}>
                                {frequentTills.map((paybill, index) => (
                                    <Stack key={index} direction="row" spacing={2}>
                                        <Avatar sx={{bgcolor:'warning.main'}}>{paybill.name[0]}</Avatar>
                                        <Stack direction="column">
                                            <Typography variant="h6" component="h4">{paybill.name}</Typography>
                                            <Typography variant="body1" component="p">Account Number: {paybill.accountNumber}</Typography>
                                        </Stack>
                                    </Stack>
                                ))}
                            </Stack>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Paper>
    )
}