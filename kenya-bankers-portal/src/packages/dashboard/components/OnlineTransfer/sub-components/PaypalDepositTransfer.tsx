import * as React from 'react';
import Grid from '@mui/material/Grid';
import {Box, Button, Stack, TextField, Typography} from "@mui/material";
import poster from "../../../../../assets/images/drawable-hdpi/posters-05.png";
import poster2 from "../../../../../assets/images/drawable-hdpi/posters-08.png";
// const baseUrl = 'http://127.0.0.1:8000/api';
export default function PaypalDepositTransfer(){
    const [amount, setAmount] = React.useState('');
    // const baseUrl = "http://127.0.0.1:8000"
    const handleAmountChange = (event) => {
        setAmount(event.target.value);
    };
    const handleTransferClick = () => {
        // Here you would typically send a POST request to your Django API
        const requestData = {
            amount: amount
        };

        fetch('http://127.0.0.1:8000/api/checkout_paypal', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        })
        .then(response => response.json())
        .then(data => {
            // Redirect to PayPal payment URL if successful
            if (data.paypal_url) {
                window.location.href = data.paypal_url;
            } else {
                // Handle errors
                console.error('Payment initiation failed:', data.error);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };
    return (
        <Box sx={{ minWidth: '100%'}}>
            <Grid container spacing={2} sx={{ flexGrow: 1 }}>
                <Grid item xs={12} md={6}>
                    <Stack direction="column" spacing={3}>
                        <Typography variant="body1">Enter amount to transfer from your Paypal</Typography>
                        <TextField
                            id="outlined-basic"
                            label="Amount (KES)"
                            variant="outlined"
                            value={amount}
                            onChange={handleAmountChange}
                            sx={{
                                backgroundColor:'white',
                                '& input': {
                                    color: 'black',
                                } 
                            }}
                        />
                    </Stack>
                    <Box sx={{ mt: 2, textAlign: 'center' }}>
                        <Button size="large" variant="contained" onClick={handleTransferClick} color="primary">Deposit</Button>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Stack direction={"row"}>
                        {/* <img src={poster} alt="poster" style={{width: '100%'}}/> */}
                        <img src={poster2} alt="poster" style={{width: '100%'}}/>
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    )
}