import * as React from 'react';
import Grid from '@mui/material/Grid';
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import poster from "../../../../../assets/images/drawable-hdpi/posters-05.png";
import poster2 from "../../../../../assets/images/drawable-hdpi/posters-08.png";
// const baseUrl = 'http://127.0.0.1:8000/api';
export default function PaypalWithdrawTransfer() {
    const [amount, setAmount] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [responseMessage, setResponseMessage] = React.useState('');
    const [buttonText, setButtonText] = React.useState('Withdraw');
    const [isProcessing, setIsProcessing] = React.useState(false);
    // const baseUrl = "http://127.0.0.1:8000"
    const handleAmountChange = (event) => {
        setAmount(event.target.value);
    };
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }
    const handleTransferClick = () => {
        setIsProcessing(true);
        setButtonText('Processing...');
        // Here you would typically send a POST request to your Django API
        const requestData = {
            amount: amount,
            email: email
        };

        fetch('http://127.0.0.1:8000/api/payout_paypal', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                setButtonText('Withdrawal Successful!');
                setAmount('');
                setEmail('');
            } else {
                console.log(data.error)
                setButtonText("Failed: Try Again Later");
            }
        })
        .catch(error => {
            console.error('Error:', error);
            setButtonText('An error occurred');
        }).finally(() => {
            setIsProcessing(false);
            // Optionally reset the button text after a few seconds
            setTimeout(() => setButtonText('Withdraw'), 3000);
        });


    };
    return (
        <Box sx={{ minWidth: '100%' }}>
            <Grid container spacing={2} sx={{ flexGrow: 1 }}>
                <Grid item xs={12} md={6}>
                    <Stack direction="column" spacing={3}>
                        <Typography variant="body1">Enter amount to send to your Paypal</Typography>
                        <TextField id="outlined-basic" label="Paypal Email" variant='outlined' onChange={handleEmailChange} sx={{
                            backgroundColor: 'white',
                            '& input': {
                                color: 'black',
                            }
                        }} />
                        <TextField
                            id="outlined-basic"
                            label="Amount (KES)"
                            variant="outlined"
                            value={amount}
                            onChange={handleAmountChange}
                            sx={{
                                backgroundColor: 'white',
                                '& input': {
                                    color: 'black',
                                }
                            }}
                        />

                    </Stack>
                    <Box sx={{ mt: 2, textAlign: 'center' }}>
                        <Button size="large" variant="contained" onClick={handleTransferClick} color="primary">
                            {buttonText}
                        </Button>
                        
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Stack direction={"row"}>
                        {/* <img src={poster} alt="poster" style={{width: '100%'}}/> */}
                        <img src={poster2} alt="poster" style={{ width: '100%' }} />
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    )
}