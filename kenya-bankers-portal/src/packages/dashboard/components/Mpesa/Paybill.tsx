import {Avatar, Box, Button, Card, CardContent, Paper, Stack, TextField, Typography} from "@mui/material";
import Grid from '@mui/material/Grid';
import * as React from "react";
import {useState} from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const frequentPaybills = [
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

export default function Paybill() {
    const location = useLocation();
    const { name = '', description } = location.state || {};

    const [paybillNumber, setPaybillNumber] = useState('');
    const [amount, setAmount] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    // const phone = localStorage.getItem('phone');
    const [phone, setPhoneNumber] = useState('')

    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const handleChangePaybillNumber = (event) => {
        setPaybillNumber(event.target.value);
    };

    const handleChangeAmount = (event) => {
        setAmount(event.target.value);
    };
    const handleChangePhoneNumner = (e) => {
        setPhoneNumber(e.target.value);
    }

    const handleChangeAccountNumber = (event) => {
        setAccountNumber(event.target.value);
    };

    const handleSubmit = async () => {
        if (!phone || !amount || !accountNumber) {
            setErrorMsg('Please fill in all fields');
            return;
        }
    
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/customer_pay_bill', {
                phone: phone,
                amount: amount,
                // description: description,
                // code: paybillNumber,
                account_number: accountNumber,
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            if (response.status === 200) {
                setSuccessMsg('Payment initiated successfully');
                setErrorMsg('');
            } else {
                setErrorMsg('Failed to initiate payment');
                setSuccessMsg('');
            }
        } catch (error) {
            setErrorMsg(error.response?.data?.error || 'An error occurred');
            setSuccessMsg('');
        }
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
            <Typography variant="h4" component="h2">Paybill</Typography>
            <Card sx={{ color: 'primary.main',}}>
                <CardContent>
                    <Grid container spacing={2} sx={{ flexGrow: 1 }}>
                        <Grid item xs={12} md={6}>
                        <Typography variant="h5" component="h3">
                            {name ? `Pay M-Pesa To ${name} Paybill` : 'Pay M-Pesa To Paybill 4137281'}
                        </Typography>
                            <Stack direction="column" spacing={2}>
                                {/* <TextField
                                    fullWidth
                                    label="Paybill Number"
                                    variant="outlined"
                                    type="number"
                                    value={paybillNumber}
                                    onChange={handleChangePaybillNumber}
                                    sx={{
                                        backgroundColor:'white',
                                        '& input': {
                                            color: 'black',
                                        } 
                                    }}
                                /> */}
                                <TextField
                                    fullWidth
                                    label="Phone Number"
                                    variant="outlined"
                                    type="number"
                                    value={phone}
                                    onChange={handleChangePhoneNumner}
                                    sx={{
                                        backgroundColor:'white',
                                        '& input': {
                                            color: 'black',
                                        } 
                                    }}
                                />
                                <TextField
                                    fullWidth
                                    label="Amount (KES)"
                                    variant="outlined"
                                    type="number"
                                    value={amount}
                                    onChange={handleChangeAmount}
                                    sx={{
                                        backgroundColor:'white',
                                        '& input': {
                                            color: 'black',
                                        } 
                                    }}
                                />
                                <TextField
                                    fullWidth
                                    label="Account Number"
                                    variant="outlined"
                                    type="number"
                                    value={accountNumber}
                                    onChange={handleChangeAccountNumber}
                                    sx={{
                                        backgroundColor:'white',
                                        '& input': {
                                            color: 'black',
                                        } 
                                    }}
                                />
                            </Stack>
                            <Box sx={{ mt: 2, textAlign: 'center' }}>
                                <Button
                                    size="large"
                                    variant="contained"
                                    color="primary"
                                    onClick={handleSubmit}
                                >
                                    Send
                                </Button>
                            </Box>
                            {successMsg && (
                                <Typography variant="body1" sx={{ color: 'success.main', mt: 2 }}>
                                    {successMsg}
                                </Typography>
                            )}
                            {errorMsg && (
                                <Typography variant="body1" sx={{ color: 'error.main', mt: 2 }}>
                                    {errorMsg}
                                </Typography>
                            )}
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h5" component="h3">Frequent Paybills</Typography>
                            <Stack direction="column" spacing={2}>
                                {frequentPaybills.map((paybill, index) => (
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